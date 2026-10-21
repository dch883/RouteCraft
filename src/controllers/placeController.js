/**
 * RouteCraft - Destination Catalog & Filter Controller
 */

const db = require('../config/db');

/**
 * GET /api/places
 * Retrieves catalog destinations with optional filtering (category, search keyword, vibe/activity tag)
 */
async function getAllPlaces(req, res) {
  try {
    const { category, search, tag } = req.query;

    let sql = `
      SELECT DISTINCT 
        p.PlaceID,
        p.Name,
        p.Description,
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

    // Category Filter (REQ-FUNC-04)
    if (category && category !== 'All') {
      sql += ` AND (c.CategoryName = ? OR c.CategoryID = ?)`;
      params.push(category, category);
    }

    // Keyword Search across title and description (REQ-FUNC-03)
    if (search && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      sql += ` AND (p.Name LIKE ? OR p.Description LIKE ?)`;
      params.push(searchTerm, searchTerm);
    }

    // Tag Filter by Vibe or Activity (REQ-FUNC-05)
    if (tag && tag.trim() !== '') {
      sql += ` AND t.TagName = ?`;
      params.push(tag.trim());
    }

    sql += ` ORDER BY p.DistanceFromCenter ASC`;

    const [rows] = await db.query(sql, params);

    // Fetch associated tags for each place
    for (let place of rows) {
      const [tags] = await db.query(
        `SELECT t.TagID, t.TagName, t.TagType 
         FROM TAG t 
         JOIN PLACE_TAG pt ON t.TagID = pt.TagID 
         WHERE pt.PlaceID = ?`,
        [place.PlaceID]
      );
      place.tags = tags;
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
 * Retrieves full single-destination profile for Place Detail Modal (REQ-FUNC-02, Figure 4)
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

    // Fetch tags
    const [tags] = await db.query(
      `SELECT t.TagID, t.TagName, t.TagType 
       FROM TAG t 
       JOIN PLACE_TAG pt ON t.TagID = pt.TagID 
       WHERE pt.PlaceID = ?`,
      [place.PlaceID]
    );
    place.tags = tags;

    return res.status(200).json({ success: true, data: place });
  } catch (error) {
    console.error('[placeController.getPlaceById] Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving destination details.' });
  }
}

/**
 * GET /api/taxonomies
 * Retrieves list of categories and tags for filtering widgets
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