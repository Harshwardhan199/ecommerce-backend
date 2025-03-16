require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));

// MongoDB Connection (Fix: Ensure it reads from .env file)
mongoose
  .connect(process.env.MONGO_URI, { tls: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Simple Route to Test Server
app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
