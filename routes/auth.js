const express = require("express");
const router = express.Router();
const User = require("../models/User");
const admin = require("firebase-admin");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const { userId, fullName, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ userId, fullName, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Initialize Firebase Admin SDK
const serviceAccount = require("../firebase-adminsdk.json"); // Download from Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firebase Login Verification
router.post("/login", async (req, res) => {
  try {
      const { email, password, idToken } = req.body;

      if (!idToken) {
          return res.status(400).json({ error: "Missing ID Token" });
      }

      // Verify the Firebase ID Token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log("Decoded Token:", decodedToken);

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      res.json({ fullName: user.fullName });
  } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
