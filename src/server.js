/**
 * RouteCraft: An Interactive Web Application for Regional Day-Trip Planning
 * Main Server & RESTful API Routing Engine
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Controllers
const placeController = require('./controllers/placeController');
const itineraryController = require('./controllers/itineraryController');
const adminController = require('./controllers/adminController');
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../public')));

// -----------------------------------------------------------------------------
// PUBLIC & CLIENT API ROUTES
// -----------------------------------------------------------------------------
app.get('/api/places', placeController.getAllPlaces);
app.get('/api/places/:id', placeController.getPlaceById);
app.get('/api/taxonomies', placeController.getTaxonomies);
app.post('/api/itinerary/calculate', itineraryController.calculateItinerary);

// User Authentication (Register & Login)
app.post('/api/auth/register', authController.registerUser);
app.post('/api/auth/login', authController.loginUser);

// -----------------------------------------------------------------------------
// ADMINISTRATIVE API ROUTES (Complete CRUD & Admin Management)
// -----------------------------------------------------------------------------
app.post('/api/admin/login', adminController.adminLogin);
app.get('/api/admin/places', adminController.adminListPlaces);
app.post('/api/admin/places', adminController.createPlace);
app.put('/api/admin/places/:id', adminController.updatePlace);
app.put('/api/admin/places/:id/toggle-status', adminController.toggleSoftDelete);
app.delete('/api/admin/places/:id', adminController.deletePlacePermanent);

// Create another admin & list admins
app.get('/api/admin/list', adminController.listAdmins);
app.post('/api/admin/create-admin', adminController.createAdmin);

// Default fallback for client-side SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[RouteCraft Server Exception]:', err.stack);
  res.status(500).json({ success: false, message: 'An internal server error occurred.' });
});

app.listen(PORT, () => {
  console.log('================================================================');
  console.log(` RouteCraft Backend Running on: http://localhost:${PORT}`);
  console.log(` Target Region: Kiniyama, Sri Lanka (25 km radius)`);
  console.log(` Developer: H.M.D.C. Herath | Reg: E2410120 | Univ. of Moratuwa`);
  console.log('================================================================');
});