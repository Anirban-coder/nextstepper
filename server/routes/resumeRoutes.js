const express = require("express");
const router = express.Router();

const {
  getMyResume,
  updateMyResume,
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");

// GET resume
router.get("/me", protect, getMyResume);

// UPDATE resume
router.put("/me", protect, updateMyResume);

module.exports = router;
