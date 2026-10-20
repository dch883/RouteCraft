/**
 * RouteCraft - Geolocation & Itinerary Computation Engine
 * Author: H.M.D.C. Herath (E2410120)
 * References: SRS Section 4.2 & Analysis Diagram 3 / Diagram 4
 */

// Earth's mean radius in kilometers
const EARTH_RADIUS_KM = 6371.0;

// Average regional road speed in Sri Lanka (semi-urban / rural roads: ~35 km/h)
const AVG_TRANSIT_SPEED_KMH = 35.0;

// Winding factor for real road networks vs straight-line flight distance
const ROAD_DETOUR_FACTOR = 1.25;

// Maximum daily viable exploration threshold in minutes (8 active hours = 480 mins)
const MAX_DAILY_TIME_THRESHOLD_MINUTES = 480;

/**
 * Converts degrees to radians.
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Calculates straight-line spherical distance between two coordinate pairs using Haversine formula.
 * Formula: a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
 *          c = 2 * atan2(√a, √(1-a))
 *          d = R * c
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLineDistance = EARTH_RADIUS_KM * c;

  // Multiply by road detour factor for realistic regional transit distance
  const estimatedRoadDistance = straightLineDistance * ROAD_DETOUR_FACTOR;
  return Number(estimatedRoadDistance.toFixed(2));
}

/**
 * Estimates driving transit time in minutes given distance in kilometers.
 */
function estimateTransitDuration(distanceKm) {
  const durationHours = distanceKm / AVG_TRANSIT_SPEED_KMH;
  return Math.round(durationHours * 60);
}

/**
 * Evaluates an entire ordered itinerary sequence.
 * Aggregates visit times, calculates segment-by-segment travel times, and validates 8-hour limit.
 * 
 * @param {Array} orderedPlaces - Ordered array of place objects with { Latitude, Longitude, EstVisitDurationMins }
 */
function processItineraryMetrics(orderedPlaces) {
  if (!orderedPlaces || orderedPlaces.length === 0) {
    return {
      totalDistanceKm: 0,
      totalVisitMinutes: 0,
      totalTransitMinutes: 0,
      totalDurationMinutes: 0,
      totalDurationFormatted: '0h 0m',
      isOverScheduled: false,
      warningBanner: null,
      segments: []
    };
  }

  let totalDistanceKm = 0;
  let totalVisitMinutes = 0;
  let totalTransitMinutes = 0;
  const segments = [];

  // 1. Sum visit durations for all selected stops
  for (let i = 0; i < orderedPlaces.length; i++) {
    const dwell = Number(orderedPlaces[i].EstVisitDurationMins) || 60;
    totalVisitMinutes += dwell;
  }

  // 2. Compute inter-stop distance and travel time for consecutive places
  for (let i = 0; i < orderedPlaces.length - 1; i++) {
    const fromPlace = orderedPlaces[i];
    const toPlace = orderedPlaces[i + 1];

    const segmentDistance = calculateHaversineDistance(
      Number(fromPlace.Latitude),
      Number(fromPlace.Longitude),
      Number(toPlace.Latitude),
      Number(toPlace.Longitude)
    );

    const segmentTransitTime = estimateTransitDuration(segmentDistance);

    totalDistanceKm += segmentDistance;
    totalTransitMinutes += segmentTransitTime;

    segments.push({
      fromPlaceId: fromPlace.PlaceID,
      fromPlaceName: fromPlace.Name,
      toPlaceId: toPlace.PlaceID,
      toPlaceName: toPlace.Name,
      distanceKm: segmentDistance,
      transitDurationMinutes: segmentTransitTime
    });
  }

  totalDistanceKm = Number(totalDistanceKm.toFixed(2));
  const totalDurationMinutes = totalVisitMinutes + totalTransitMinutes;

  // Format into hours and minutes
  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const totalDurationFormatted = `${hours}h ${minutes}m`;

  // Check 8-Hour Rule (REQ-FUNC-10 & Diagram 2)
  const isOverScheduled = totalDurationMinutes > MAX_DAILY_TIME_THRESHOLD_MINUTES;
  let warningBanner = null;

  if (isOverScheduled) {
    const excessMinutes = totalDurationMinutes - MAX_DAILY_TIME_THRESHOLD_MINUTES;
    const excessHours = (excessMinutes / 60).toFixed(1);
    warningBanner = `Warning: Plan exceeds realistic single-day limit (8.0 hours). Current estimated total is ${totalDurationFormatted} (${excessHours}h over budget). Consider removing stops or reordering.`;
  }

  return {
    totalStops: orderedPlaces.length,
    totalDistanceKm,
    totalVisitMinutes,
    totalTransitMinutes,
    totalDurationMinutes,
    totalDurationFormatted,
    isOverScheduled,
    warningBanner,
    segments
  };
}

module.exports = {
  calculateHaversineDistance,
  estimateTransitDuration,
  processItineraryMetrics
};