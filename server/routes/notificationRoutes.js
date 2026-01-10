const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

// GET user notifications
router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(notifications);
});

// MARK as read
router.patch("/:id/read", protect, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: "Notification marked as read" });
});

module.exports = router;
