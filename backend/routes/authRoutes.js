// routes/authRoutes.js
const express = require("express");
const router = express.Router();

// Sample authentication route
router.get("/test", (req, res) => {
    res.json({ message: "Auth route is working!" });
});

module.exports = router;
