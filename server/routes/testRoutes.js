const express = require("express");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.user.id,
  });
});

module.exports = router;
