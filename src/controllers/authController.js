/**
 * RouteCraft - Authentication & User Registration Controller
 * Author: H.M.D.C. Herath (E2410120) - University of Moratuwa
 */

const bcrypt = require('bcryptjs');
const db = require('../config/db');

/**
 * POST /api/auth/register
 * Tourist / Visitor Registration (SRS Table 1)
 */
async function registerUser(req, res) {
  try {
    const { fullName, email, password, userType } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    // Check if email already registered
    const [existing] = await db.query('SELECT UserID FROM USER WHERE Email = ?', [email.trim().toLowerCase()]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Hash password with bcrypt (salt rounds >= 10, REQ-NF-07)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const validUserTypes = ['Domestic Tourist', 'Foreign Visitor', 'Educational Group', 'Travel Enthusiast'];
    const chosenType = validUserTypes.includes(userType) ? userType : 'Domestic Tourist';

    const [result] = await db.query(
      `INSERT INTO USER (FullName, Email, PasswordHash, UserType) VALUES (?, ?, ?, ?)`,
      [fullName.trim(), email.trim().toLowerCase(), passwordHash, chosenType]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful! You can now log in.',
      user: {
        userId: result.insertId,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        userType: chosenType
      }
    });
  } catch (error) {
    console.error('[authController.registerUser] Error:', error);
    return res.status(500).json({ success: false, message: 'Registration failed due to a server error.' });
  }
}

/**
 * POST /api/auth/login
 * User (Tourist/Visitor) Login
 */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const [users] = await db.query(
      'SELECT UserID, FullName, Email, PasswordHash, UserType FROM USER WHERE Email = ?',
      [email.trim().toLowerCase()]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        userId: user.UserID,
        fullName: user.FullName,
        email: user.Email,
        userType: user.UserType
      }
    });
  } catch (error) {
    console.error('[authController.loginUser] Error:', error);
    return res.status(500).json({ success: false, message: 'Login failed due to a server error.' });
  }
}

module.exports = {
  registerUser,
  loginUser
};