/**
 * RouteCraft - Interactive Itinerary Calculation & Persistence Controller
 */

const db = require('../config/db');
const { processItineraryMetrics, optimizeVisitingOrder } = require('../utils/haversine');

/**
 * POST /api/itinerary/calculate
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
 * POST /api/itinerary/optimize
 * Nearest-neighbor sequence optimization (Idea 2)
 */
async function optimizeItinerary(req, res) {
  try {
    const { placeIds } = req.body;

    if (!Array.isArray(placeIds) || placeIds.length <= 2) {
      return res.status(200).json({ success: true, optimizedPlaceIds: placeIds });
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
    const currentOrder = placeIds.map((id) => placeMap.get(Number(id))).filter(Boolean);

    // Initial metrics
    const initialMetrics = processItineraryMetrics(currentOrder);

    // Optimized order
    const optimizedPlaces = optimizeVisitingOrder(currentOrder);
    const optimizedMetrics = processItineraryMetrics(optimizedPlaces);
    const optimizedPlaceIds = optimizedPlaces.map((p) => p.PlaceID);

    const distanceSaved = Number((initialMetrics.totalDistanceKm - optimizedMetrics.totalDistanceKm).toFixed(2));

    return res.status(200).json({
      success: true,
      optimizedPlaceIds,
      initialDistanceKm: initialMetrics.totalDistanceKm,
      optimizedDistanceKm: optimizedMetrics.totalDistanceKm,
      distanceSavedKm: Math.max(0, distanceSaved),
      orderedPlaces: optimizedPlaces,
      metrics: optimizedMetrics
    });
  } catch (error) {
    console.error('[itineraryController.optimizeItinerary] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to optimize itinerary order.' });
  }
}

/**
 * POST /api/itinerary/save
 */
async function saveItinerary(req, res) {
  try {
    const { userId, title, placeIds } = req.body;

    if (!Array.isArray(placeIds) || placeIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Itinerary must include at least one destination.' });
    }

    const placeholders = placeIds.map(() => '?').join(',');
    const [rows] = await db.query(
      `SELECT PlaceID, Name, DistanceFromCenter, Latitude, Longitude, EstVisitDurationMins, EntranceFee FROM PLACE WHERE PlaceID IN (${placeholders})`,
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
  optimizeItinerary,
  saveItinerary,
  getUserItineraries,
  deleteItinerary
};