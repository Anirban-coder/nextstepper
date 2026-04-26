const express = require("express");
const router = express.Router();
// 1. IMPORT with curly braces (This is correct ✅)
const { protect } = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

// 2. USE without curly braces (This was the error ❌)
router.get("/", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 3. USE without curly braces here too
router.patch("/:id/read", protect, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;