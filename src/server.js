/**
 * RouteCraft: An Interactive Web Application for Regional Day-Trip Planning
 * Main Server & RESTful API Routing Engine
 * 
 * Student: H.M.D.C. Herath
 * Registration Number: E2410120
 * Institution: University of Moratuwa
 * Version: 1.1 (Approved)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import controllers
const placeController = require('./controllers/placeController');
const itineraryController = require('./controllers/itineraryController');
const adminController = require('./controllers/adminController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files from /public directory (REQ-NF-01)
app.use(express.static(path.join(__dirname, '../public')));

// -----------------------------------------------------------------------------
// PUBLIC API ROUTES
// -----------------------------------------------------------------------------

// Destination exploration & taxonomy endpoints (Feature 1)
app.get('/api/places', placeController.getAllPlaces);
app.get('/api/places/:id', placeController.getPlaceById);
app.get('/api/taxonomies', placeController.getTaxonomies);

// Interactive itinerary planning engine (Feature 2 & Feature 3)
app.post('/api/itinerary/calculate', itineraryController.calculateItinerary);

// -----------------------------------------------------------------------------
// ADMINISTRATIVE API ROUTES (Feature 4)
// -----------------------------------------------------------------------------
app.post('/api/admin/login', adminController.adminLogin);
app.get('/api/admin/places', adminController.adminListPlaces);
app.post('/api/admin/places', adminController.createPlace);
app.put('/api/admin/places/:id/toggle-status', adminController.toggleSoftDelete);

// Default fallback for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[RouteCraft Server Exception]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.'
  });
});

// Start HTTP Server
app.listen(PORT, () => {
  console.log('================================================================');
  console.log(` RouteCraft Backend Running on: http://localhost:${PORT}`);
  console.log(` Target Region: Kiniyama, Sri Lanka (25 km radius)`);
  console.log(` Developer: H.M.D.C. Herath | Reg: E2410120 | Univ. of Moratuwa`);
  console.log('================================================================');
});