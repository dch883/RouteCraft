/**
 * RouteCraft - Interactive Itinerary Calculation & Persistence Controller
 */

const db = require('../config/db');
const { processItineraryMetrics } = require('../utils/haversine');

/**
 * POST /api/itinerary/calculate
 * Accepts ordered array of place IDs: { placeIds: [1, 6, 4] }
 */
async function calculateItinerary(req, res) {
  try {
    const { placeIds } = req.body;

    if (!Array.isArray(placeIds) || placeIds.length === 0) {
      return res.status(200).json({
        success: true,
        orderedPlaces: [],
        metrics: processItineraryMetrics([])
      });
    }

    const placeholders = placeIds.map(() => '?').join(',');
    const [rows] = await db.query(
      `SELECT PlaceID, Name, DistanceFromCenter, Latitude, Longitude, EstVisitDurationMins, OpeningHours, EntranceFee, GoogleMapsUrl, ImageUrl
       FROM PLACE
       WHERE PlaceID IN (${placeholders}) AND IsDeleted = 0`,
      placeIds
    );

    const placeMap = new Map();
    rows.forEach((p) => placeMap.set(Number(p.PlaceID), p));

    const orderedPlaces = [];
    for (const id of placeIds) {
      const match = placeMap.get(Number(id));
      if (match) {
        orderedPlaces.push(match);
      }
    }

    const metrics = processItineraryMetrics(orderedPlaces);

    return res.status(200).json({
      success: true,
      orderedPlaces,
      metrics
    });
  } catch (error) {
    console.error('[itineraryController.calculateItinerary] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing itinerary calculations.'
    });
  }
}

/**
 * POST /api/itinerary/save
 * Persists an assembled itinerary into the database
 */
async function saveItinerary(req, res) {
  try {
    const { userId, title, placeIds } = req.body;

    if (!Array.isArray(placeIds) || placeIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Itinerary must include at least one destination.' });
    }

    // Calculate metrics before saving
    const placeholders = placeIds.map(() => '?').join(',');
    const [rows] = await db.query(
      `SELECT PlaceID, Name, DistanceFromCenter, Latitude, Longitude, EstVisitDurationMins FROM PLACE WHERE PlaceID IN (${placeholders})`,
      placeIds
    );

    const placeMap = new Map();
    rows.forEach((p) => placeMap.set(Number(p.PlaceID), p));
    const ordered = placeIds.map((id) => placeMap.get(Number(id))).filter(Boolean);

    const metrics = processItineraryMetrics(ordered);

    const [result] = await db.query(
      `INSERT INTO ITINERARY (UserID, Title, PlaceIDs, TotalDistanceKm, TotalDurationMinutes, IsOverScheduled)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId || null,
        title || 'My Kiniyama Day Trip',
        JSON.stringify(placeIds),
        metrics.totalDistanceKm,
        metrics.totalDurationMinutes,
        metrics.isOverScheduled ? 1 : 0
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Itinerary saved successfully!',
      itineraryId: result.insertId,
      metrics
    });
  } catch (error) {
    console.error('[itineraryController.saveItinerary] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to save itinerary.' });
  }
}

/**
 * GET /api/itinerary/user/:userId
 * Retrieves past saved itineraries for a registered tourist
 */
async function getUserItineraries(req, res) {
  try {
    const { userId } = req.params;
    const [rows] = await db.query(
      `SELECT ItineraryID, UserID, Title, PlaceIDs, TotalDistanceKm, TotalDurationMinutes, IsOverScheduled, CreatedAt 
       FROM ITINERARY 
       WHERE UserID = ? 
       ORDER BY CreatedAt DESC`,
      [userId]
    );

    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error('[itineraryController.getUserItineraries] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve saved itineraries.' });
  }
}

/**
 * DELETE /api/itinerary/:id
 * Deletes a saved itinerary
 */
async function deleteItinerary(req, res) {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM ITINERARY WHERE ItineraryID = ?', [id]);
    return res.status(200).json({ success: true, message: 'Itinerary removed.' });
  } catch (error) {
    console.error('[itineraryController.deleteItinerary] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete itinerary.' });
  }
}

module.exports = {
  calculateItinerary,
  saveItinerary,
  getUserItineraries,
  deleteItinerary
};