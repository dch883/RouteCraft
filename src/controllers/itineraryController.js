/**
 * RouteCraft - Interactive Itinerary Calculation Controller
 */

const db = require('../config/db');
const { processItineraryMetrics } = require('../utils/haversine');

/**
 * POST /api/itinerary/calculate
 * Accepts ordered array of place IDs: { placeIds: [1, 6, 4] }
 * Returns sequenced metrics, inter-stop distances, total duration, and 8-hour alert banner
 */
async function calculateItinerary(req, res) {
  try {
    const { placeIds } = req.body;

    if (!Array.isArray(placeIds) || placeIds.length === 0) {
      return res.status(200).json({
        success: true,
        metrics: processItineraryMetrics([])
      });
    }

    // Fetch place details for provided IDs using parameterized IN clause (REQ-NF-08)
    const placeholders = placeIds.map(() => '?').join(',');
    const [rows] = await db.query(
      `SELECT PlaceID, Name, DistanceFromCenter, Latitude, Longitude, EstVisitDurationMins, OpeningHours, GoogleMapsUrl
       FROM PLACE
       WHERE PlaceID IN (${placeholders}) AND IsDeleted = 0`,
      placeIds
    );

    // Map rows by ID to restore exact user-customized sequence (REQ-FUNC-07)
    const placeMap = new Map();
    rows.forEach((p) => placeMap.set(Number(p.PlaceID), p));

    const orderedPlaces = [];
    for (const id of placeIds) {
      const match = placeMap.get(Number(id));
      if (match) {
        orderedPlaces.push(match);
      }
    }

    // Execute Haversine & Viability Engine
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

module.exports = {
  calculateItinerary
};