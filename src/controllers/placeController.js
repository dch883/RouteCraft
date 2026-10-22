/**
 * RouteCraft - Destination Catalog & Filter Controller with Dynamic Photo Discovery
 */

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600&auto=format&fit=crop&q=80';

/**
 * Discovers all existing photo files on disk for a given place.
 */
function discoverPhotosForPlace(imageUrl) {
  if (!imageUrl || imageUrl.startsWith('http')) {
    return [imageUrl || FALLBACK_IMAGE];
  }

  const fileName = path.basename(imageUrl);
  const baseName = fileName.replace(/\.[^/.]+$/, '').replace(/\d+$/, '');

  const searchDirs = [
    path.join(process.cwd(), 'public/assets/places'),
    path.join(process.cwd(), 'assets/places')
  ];

  let foundFiles = [];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        const matches = files.filter(f => {
          const lower = f.toLowerCase();
          const target = baseName.toLowerCase();
          return lower.startsWith(target) && /\.(jpe?g|png|webp)$/i.test(f);
        });

        if (matches.length > 0) {
          matches.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
          foundFiles = matches.map(f => `assets/places/${f}`);
          break;
        }
      } catch (err) {
        console.warn('[placeController] Folder read warning:', err.message);
      }
    }
  }

  return foundFiles.length > 0 ? foundFiles : [imageUrl];
}

/**
 * GET /api/places
 * Retrieves catalog destinations including TravelTips
 */
async function getAllPlaces(req, res) {
  try {
    const { category, search, tag } = req.query;

    let sql = `
      SELECT DISTINCT 
        p.PlaceID,
        p.Name,
        p.Description,
        p.TravelTips,
        p.DistanceFromCenter,
        p.Latitude,
        p.Longitude,
        p.EstVisitDurationMins,
        p.OpeningHours,
        p.EntranceFee,
        p.ParkingAvailable,
        p.ContactInfo,
        p.GoogleMapsUrl,
        p.ImageUrl,
        c.CategoryID,
        c.CategoryName
      FROM PLACE p
      JOIN CATEGORY c ON p.CategoryID = c.CategoryID
      LEFT JOIN PLACE_TAG pt ON p.PlaceID = pt.PlaceID
      LEFT JOIN TAG t ON pt.TagID = t.TagID
      WHERE p.IsDeleted = 0
    `;

    const params = [];

    if (category && category !== 'All') {
      sql += ` AND (c.CategoryName = ? OR c.CategoryID = ?)`;
      params.push(category, category);
    }

    if (search && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      sql += ` AND (p.Name LIKE ? OR p.Description LIKE ?)`;
      params.push(searchTerm, searchTerm);
    }

    if (tag && tag.trim() !== '') {
      sql += ` AND t.TagName = ?`;
      params.push(tag.trim());
    }

    sql += ` ORDER BY p.DistanceFromCenter ASC`;

    const [rows] = await db.query(sql, params);

    for (let place of rows) {
      const [tags] = await db.query(
        `SELECT t.TagID, t.TagName, t.TagType 
         FROM TAG t 
         JOIN PLACE_TAG pt ON t.TagID = pt.TagID 
         WHERE pt.PlaceID = ?`,
        [place.PlaceID]
      );
      place.tags = tags;
      place.photos = discoverPhotosForPlace(place.ImageUrl);
    }

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('[placeController.getAllPlaces] Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving destinations.' });
  }
}

/**
 * GET /api/places/:id
 */
async function getPlaceById(req, res) {
  try {
    const { id } = req.params;

    const [places] = await db.query(
      `SELECT 
        p.*, 
        c.CategoryName 
       FROM PLACE p
       JOIN CATEGORY c ON p.CategoryID = c.CategoryID
       WHERE p.PlaceID = ? AND p.IsDeleted = 0`,
      [id]
    );

    if (places.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    const place = places[0];

    const [tags] = await db.query(
      `SELECT t.TagID, t.TagName, t.TagType 
       FROM TAG t 
       JOIN PLACE_TAG pt ON t.TagID = pt.TagID 
       WHERE pt.PlaceID = ?`,
      [place.PlaceID]
    );
    place.tags = tags;
    place.photos = discoverPhotosForPlace(place.ImageUrl);

    return res.status(200).json({ success: true, data: place });
  } catch (error) {
    console.error('[placeController.getPlaceById] Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving destination details.' });
  }
}

/**
 * GET /api/taxonomies
 */
async function getTaxonomies(req, res) {
  try {
    const [categories] = await db.query(`SELECT CategoryID, CategoryName, Description FROM CATEGORY ORDER BY CategoryName ASC`);
    const [vibes] = await db.query(`SELECT TagID, TagName FROM TAG WHERE TagType = 'Vibe' ORDER BY TagName ASC`);
    const [activities] = await db.query(`SELECT TagID, TagName FROM TAG WHERE TagType = 'Activity' ORDER BY TagName ASC`);

    return res.status(200).json({
      success: true,
      categories,
      vibes,
      activities
    });
  } catch (error) {
    console.error('[placeController.getTaxonomies] Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving taxonomies.' });
  }
}

module.exports = {
  getAllPlaces,
  getPlaceById,
  getTaxonomies
};