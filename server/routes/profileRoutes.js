const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { getProfile, updateProfile } = require("../controllers/profileController");

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, (req, res, next) => {
  upload.single("resume")(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
}, updateProfile);

module.exports = router;
