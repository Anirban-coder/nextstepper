const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
// Import the functions we just fixed
const { getResume, updateResumeSkills, updateSkillStatus } = require("../controllers/resumeController");

// Get Resume
router.get("/", protect, getResume);

// Update All Skills
router.post("/", protect, updateResumeSkills);

// 👇 THIS IS THE KEY LINE FOR THE BUTTON
// It links the "Complete" button request to the function we just wrote
router.put("/skill", protect, updateSkillStatus);

module.exports = router;