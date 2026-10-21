/**
 * RouteCraft - Administrative Management Controller
 */

const bcrypt = require('bcryptjs');
const db = require('../config/db');

/**
 * POST /api/admin/login
 * Validates admin credentials using secure bcrypt password verification
 */
async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const [admins] = await db.query(
      `SELECT AdminID, Username, PasswordHash, FullName, Email FROM ADMIN WHERE Username = ?`,
      [username.trim()]
    );

    if (admins.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const admin = admins[0];
    const passwordMatches = await bcrypt.compare(password, admin.PasswordHash);

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Update last login timestamp
    await db.query(`UPDATE ADMIN SET LastLogin = NOW() WHERE AdminID = ?`, [admin.AdminID]);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      admin: {
        adminId: admin.AdminID,
        username: admin.Username,
        fullName: admin.FullName
      }
    });
  } catch (error) {
    console.error('[adminController.adminLogin] Error:', error);
    return res.status(500).json({ success: false, message: 'Authentication server error.' });
  }
}

/**
 * GET /api/admin/places
 * Lists all places including soft-deleted entries for administrative audit (Figure 5)
 */
async function adminListPlaces(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT p.PlaceID, p.Name, p.DistanceFromCenter, p.IsDeleted, c.CategoryName
      FROM PLACE p
      JOIN CATEGORY c ON p.CategoryID = c.CategoryID
      ORDER BY p.PlaceID DESC
    `);

    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('[adminController.adminListPlaces] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve administrative records.' });
  }
}

/**
 * POST /api/admin/places
 * Creates a new attraction record with strict validation (REQ-FUNC-17 & Scope Rule-01)
 */
async function createPlace(req, res) {
  try {
    const {
      name, categoryId, description, distanceFromCenter,
      latitude, longitude, estVisitDurationMins,
      openingHours, entranceFee, parkingAvailable, contactInfo, googleMapsUrl, tagIds
    } = req.body;

    // Validation (REQ-FUNC-17)
    if (!name || !categoryId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Name, Category, Latitude and Longitude are mandatory.' });
    }

    // 25km Scope Validation (Rule-01)
    const dist = parseFloat(distanceFromCenter) || 0;
    if (dist > 25.0) {
      return res.status(400).json({
        success: false,
        message: 'Scope Violation: Only attractions within 25 km of Kiniyama can be registered.'
      });
    }

    const [result] = await db.query(
      `INSERT INTO PLACE 
        (CategoryID, Name, Description, DistanceFromCenter, Latitude, Longitude, EstVisitDurationMins, OpeningHours, EntranceFee, ParkingAvailable, ContactInfo, GoogleMapsUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        categoryId,
        name.trim(),
        description || '',
        dist,
        latitude,
        longitude,
        estVisitDurationMins || 60,
        openingHours || '08:00 AM - 05:00 PM',
        entranceFee || 'Free Admission',
        parkingAvailable ? 1 : 0,
        contactInfo || 'Not Available',
        googleMapsUrl || `https://maps.google.com/?q=${latitude},${longitude}`
      ]
    );

    const newPlaceId = result.insertId;

    // Assign tags if provided (REQ-FUNC-18)
    if (Array.isArray(tagIds) && tagIds.length > 0) {
      const tagInserts = tagIds.map((tagId) => [newPlaceId, tagId]);
      await db.query(`INSERT INTO PLACE_TAG (PlaceID, TagID) VALUES ?`, [tagInserts]);
    }

    return res.status(201).json({
      success: true,
      message: 'Place created successfully.',
      placeId: newPlaceId
    });
  } catch (error) {
    console.error('[adminController.createPlace] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create destination record.' });
  }
}

/**
 * PUT /api/admin/places/:id/toggle-status
 * Toggles soft-delete flag (0 = Active, 1 = Soft-Deleted) without destroying relational links
 */
async function toggleSoftDelete(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`SELECT PlaceID, IsDeleted FROM PLACE WHERE PlaceID = ?`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Place record not found.' });
    }

    const currentStatus = rows[0].IsDeleted;
    const newStatus = currentStatus === 1 ? 0 : 1;

    await db.query(`UPDATE PLACE SET IsDeleted = ? WHERE PlaceID = ?`, [newStatus, id]);

    return res.status(200).json({
      success: true,
      message: newStatus === 1 ? 'Record soft-deleted.' : 'Record restored.',
      isDeleted: newStatus
    });
  } catch (error) {
    console.error('[adminController.toggleSoftDelete] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update record status.' });
  }
}

module.exports = {
  adminLogin,
  adminListPlaces,
  createPlace,
  toggleSoftDelete
};