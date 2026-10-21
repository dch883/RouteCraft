/**
 * RouteCraft - Comprehensive Administrative Management Controller
*/

const bcrypt = require('bcryptjs');
const db = require('../config/db');

/**
 * POST /api/admin/login
 * Authenticates admin using bcrypt (REQ-NF-07)
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
      return res.status(401).json({ success: false, message: 'Invalid admin username or password.' });
    }

    const admin = admins[0];
    const passwordMatches = await bcrypt.compare(password, admin.PasswordHash);

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: 'Invalid admin username or password.' });
    }

    await db.query(`UPDATE ADMIN SET LastLogin = NOW() WHERE AdminID = ?`, [admin.AdminID]);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      admin: {
        adminId: admin.AdminID,
        username: admin.Username,
        fullName: admin.FullName,
        email: admin.Email
      }
    });
  } catch (error) {
    console.error('[adminController.adminLogin] Error:', error);
    return res.status(500).json({ success: false, message: 'Authentication server error.' });
  }
}

/**
 * GET /api/admin/places
 * Lists all places with full details for management
 */
async function adminListPlaces(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.PlaceID, p.CategoryID, p.Name, p.Description, p.DistanceFromCenter,
        p.Latitude, p.Longitude, p.EstVisitDurationMins, p.OpeningHours,
        p.EntranceFee, p.ParkingAvailable, p.ContactInfo, p.GoogleMapsUrl,
        p.ImageUrl, p.IsDeleted, c.CategoryName
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
 * Creates a new attraction record
 */
async function createPlace(req, res) {
  try {
    const {
      name, categoryId, description, distanceFromCenter,
      latitude, longitude, estVisitDurationMins,
      openingHours, entranceFee, parkingAvailable, contactInfo, googleMapsUrl, imageUrl
    } = req.body;

    if (!name || !categoryId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Name, Category, Latitude and Longitude are mandatory.' });
    }

    const dist = parseFloat(distanceFromCenter) || 0;
    if (dist > 25.0) {
      return res.status(400).json({
        success: false,
        message: 'Scope Violation: Only destinations within 25 km of Kiniyama can be registered (Rule-01).'
      });
    }

    const [result] = await db.query(
      `INSERT INTO PLACE 
        (CategoryID, Name, Description, DistanceFromCenter, Latitude, Longitude, EstVisitDurationMins, OpeningHours, EntranceFee, ParkingAvailable, ContactInfo, GoogleMapsUrl, ImageUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        googleMapsUrl || `https://maps.google.com/?q=${latitude},${longitude}`,
        imageUrl || 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600&auto=format&fit=crop&q=80'
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Place created successfully.',
      placeId: result.insertId
    });
  } catch (error) {
    console.error('[adminController.createPlace] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create destination record.' });
  }
}

/**
 * PUT /api/admin/places/:id
 * Updates an existing place's metadata
 */
async function updatePlace(req, res) {
  try {
    const { id } = req.params;
    const {
      name, categoryId, description, distanceFromCenter,
      latitude, longitude, estVisitDurationMins,
      openingHours, entranceFee, parkingAvailable, contactInfo, imageUrl
    } = req.body;

    const dist = parseFloat(distanceFromCenter) || 0;
    if (dist > 25.0) {
      return res.status(400).json({ success: false, message: 'Scope Violation: Maximum distance is 25.0 km.' });
    }

    const [result] = await db.query(
      `UPDATE PLACE SET 
        Name = ?, CategoryID = ?, Description = ?, DistanceFromCenter = ?,
        Latitude = ?, Longitude = ?, EstVisitDurationMins = ?,
        OpeningHours = ?, EntranceFee = ?, ParkingAvailable = ?,
        ContactInfo = ?, ImageUrl = ?,
        GoogleMapsUrl = ?
       WHERE PlaceID = ?`,
      [
        name.trim(),
        categoryId,
        description,
        dist,
        latitude,
        longitude,
        estVisitDurationMins || 60,
        openingHours || '08:00 AM - 05:00 PM',
        entranceFee || 'Free Admission',
        parkingAvailable ? 1 : 0,
        contactInfo || 'Not Available',
        imageUrl || '',
        `https://maps.google.com/?q=${latitude},${longitude}`,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    return res.status(200).json({ success: true, message: 'Destination updated successfully.' });
  } catch (error) {
    console.error('[adminController.updatePlace] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update destination.' });
  }
}

/**
 * PUT /api/admin/places/:id/toggle-status
 * Toggles Soft-Delete status (Active <-> Soft-Deleted)
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
      message: newStatus === 1 ? 'Record soft-deleted.' : 'Record restored to active catalog.',
      isDeleted: newStatus
    });
  } catch (error) {
    console.error('[adminController.toggleSoftDelete] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update record status.' });
  }
}

/**
 * DELETE /api/admin/places/:id
 * Permanently removes a destination record and its tag associations
 */
async function deletePlacePermanent(req, res) {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM PLACE WHERE PlaceID = ?`, [id]);
    return res.status(200).json({ success: true, message: 'Destination record permanently deleted.' });
  } catch (error) {
    console.error('[adminController.deletePlacePermanent] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to permanently delete record.' });
  }
}

/**
 * GET /api/admin/list
 * Returns all registered administrator accounts
 */
async function listAdmins(req, res) {
  try {
    const [admins] = await db.query(
      `SELECT AdminID, Username, FullName, Email, LastLogin, CreatedAt FROM ADMIN ORDER BY AdminID ASC`
    );
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.error('[adminController.listAdmins] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve administrators.' });
  }
}

/**
 * POST /api/admin/create-admin
 * Enables an existing admin to create another administrator
 */
async function createAdmin(req, res) {
  try {
    const { username, password, fullName, email } = req.body;

    if (!username || !password || !fullName || !email) {
      return res.status(400).json({ success: false, message: 'All admin fields are required.' });
    }

    // Check unique username or email
    const [existing] = await db.query(
      `SELECT AdminID FROM ADMIN WHERE Username = ? OR Email = ?`,
      [username.trim(), email.trim()]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Admin username or email already exists.' });
    }

    // Hash password with bcrypt (REQ-NF-07)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      `INSERT INTO ADMIN (Username, PasswordHash, FullName, Email) VALUES (?, ?, ?, ?)`,
      [username.trim(), passwordHash, fullName.trim(), email.trim()]
    );

    return res.status(201).json({
      success: true,
      message: `Admin account '${username}' created successfully!`,
      adminId: result.insertId
    });
  } catch (error) {
    console.error('[adminController.createAdmin] Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create new administrator.' });
  }
}

module.exports = {
  adminLogin,
  adminListPlaces,
  createPlace,
  updatePlace,
  toggleSoftDelete,
  deletePlacePermanent,
  listAdmins,
  createAdmin
};