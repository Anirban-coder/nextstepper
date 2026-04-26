const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  selectCareer,
  updateSkillProgress,
  getDashboard,
} = require("../controllers/userController");

const router = express.Router();

// Select a career (this initializes skills)
router.post("/select-career", protect, selectCareer);

// Update skill status
router.put("/skill-progress", protect, updateSkillProgress);

// Get dashboard
router.get("/dashboard", protect, getDashboard);

module.exports = router;
