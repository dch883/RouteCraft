/**
 * RouteCraft - Geolocation & Itinerary Computation Engine
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
 * Calculates straight-line spherical distance between two coordinates using Haversine formula
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
 * Helper: Extracts numeric LKR entrance fee from description string (Idea 3)
 * e.g. "LKR 250 (Domestic)" -> 250, "Free Admission" -> 0
 */
function parseEntranceFee(feeString) {
  if (!feeString || typeof feeString !== 'string') return 0;
  const match = feeString.match(/LKR\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Evaluates an entire ordered itinerary sequence.
 * Includes distance, dwell time, transit time, budget tally, and 8-hour alert.
 */
function processItineraryMetrics(orderedPlaces) {
  if (!orderedPlaces || orderedPlaces.length === 0) {
    return {
      totalStops: 0,
      totalDistanceKm: 0,
      totalVisitMinutes: 0,
      totalTransitMinutes: 0,
      totalDurationMinutes: 0,
      totalDurationFormatted: '0h 0m',
      totalBudgetLKR: 0,
      totalBudgetFormatted: 'Free Admission',
      isOverScheduled: false,
      warningBanner: null,
      segments: []
    };
  }

  let totalDistanceKm = 0;
  let totalVisitMinutes = 0;
  let totalTransitMinutes = 0;
  let totalBudgetLKR = 0;
  const segments = [];

  // Sum visit durations and entrance fees
  for (let i = 0; i < orderedPlaces.length; i++) {
    const dwell = Number(orderedPlaces[i].EstVisitDurationMins) || 60;
    totalVisitMinutes += dwell;
    totalBudgetLKR += parseEntranceFee(orderedPlaces[i].EntranceFee);
  }

  // Compute inter-stop distance and transit
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

  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const totalDurationFormatted = `${hours}h ${minutes}m`;

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
    totalBudgetLKR,
    totalBudgetFormatted: totalBudgetLKR > 0 ? `LKR ${totalBudgetLKR}` : 'Free Admission',
    isOverScheduled,
    warningBanner,
    segments
  };
}

/**
 * Optimizes visiting order using Nearest-Neighbor heuristic (Idea 2)
 * Keeps the starting point selected by the user and orders remaining stops by minimum distance.
 */
function optimizeVisitingOrder(places) {
  if (!places || places.length <= 2) return places;

  const unvisited = [...places];
  const optimized = [];

  // Start with the first place selected by the tourist
  let current = unvisited.shift();
  optimized.push(current);

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateHaversineDistance(
        Number(current.Latitude),
        Number(current.Longitude),
        Number(unvisited[i].Latitude),
        Number(unvisited[i].Longitude)
      );

      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }

    current = unvisited.splice(nearestIdx, 1)[0];
    optimized.push(current);
  }

  return optimized;
}

module.exports = {
  calculateHaversineDistance,
  estimateTransitDuration,
  processItineraryMetrics,
  optimizeVisitingOrder
};