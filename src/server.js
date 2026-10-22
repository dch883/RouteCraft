/**
 * RouteCraft: An Interactive Web Application for Regional Day-Trip Planning
 * Main Server & RESTful API Routing Engine
*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = require('./config/db');

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
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// -----------------------------------------------------------------------------
// PUBLIC & CLIENT API ROUTES
// -----------------------------------------------------------------------------
app.get('/api/places', placeController.getAllPlaces);
app.get('/api/places/:id', placeController.getPlaceById);
app.get('/api/taxonomies', placeController.getTaxonomies);

// Itinerary Engine, Route Optimization & Persistence (Ideas 1, 2, 3)
app.post('/api/itinerary/calculate', itineraryController.calculateItinerary);
app.post('/api/itinerary/optimize', itineraryController.optimizeItinerary);
app.post('/api/itinerary/save', itineraryController.saveItinerary);
app.get('/api/itinerary/user/:userId', itineraryController.getUserItineraries);
app.delete('/api/itinerary/:id', itineraryController.deleteItinerary);

// User Authentication (Register & Login)
app.post('/api/auth/register', authController.registerUser);
app.post('/api/auth/login', authController.loginUser);

// -----------------------------------------------------------------------------
// ADMINISTRATIVE API ROUTES
// -----------------------------------------------------------------------------
app.post('/api/admin/login', adminController.adminLogin);
app.get('/api/admin/places', adminController.adminListPlaces);
app.post('/api/admin/places', adminController.createPlace);
app.put('/api/admin/places/:id', adminController.updatePlace);
app.put('/api/admin/places/:id/toggle-status', adminController.toggleSoftDelete);
app.delete('/api/admin/places/:id', adminController.deletePlacePermanent);

// Admin Management
app.get('/api/admin/list', adminController.listAdmins);
app.post('/api/admin/create-admin', adminController.createAdmin);
app.delete('/api/admin/admins/:id', adminController.deleteAdmin);

// User Management
app.get('/api/admin/users', adminController.listUsers);
app.put('/api/admin/users/:id/change-password', adminController.changeUserPassword);
app.delete('/api/admin/users/:id', adminController.deleteUser);

// Default fallback for client-side SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[RouteCraft Server Exception]:', err.stack);
  res.status(500).json({ success: false, message: 'An internal server error occurred.' });
});

// Startup: Verify Default Admin
async function verifyDefaultAdmin() {
  try {
    const defaultUsername = 'admin';
    const defaultPassword = 'Admin@RouteCraft2026';
    const [rows] = await db.query('SELECT AdminID, PasswordHash FROM ADMIN WHERE Username = ?', [defaultUsername]);

    if (rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(defaultPassword, salt);
      await db.query(
        'INSERT INTO ADMIN (Username, PasswordHash, FullName, Email) VALUES (?, ?, ?, ?)',
        [defaultUsername, hash, 'RouteCraft System Administrator', 'admin@routecraft.lk']
      );
      console.log('[RouteCraft Boot] Created default administrator account: admin');
    }
  } catch (err) {
    console.warn('[RouteCraft Boot Warning] Could not auto-verify admin credentials:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log('================================================================');
  console.log(` RouteCraft Backend Running on: http://localhost:${PORT}`);
  console.log(` Target Region: Kiniyama, Sri Lanka (25 km radius)`);
  console.log(` Developer: H.M.D.C. Herath | Reg: E2410120 | Univ. of Moratuwa`);
  console.log('================================================================');
  await verifyDefaultAdmin();
});