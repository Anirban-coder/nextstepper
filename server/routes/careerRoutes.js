const express = require("express");
const Career = require("../models/Career");

const router = express.Router();

// Create Career
router.post("/", async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json(career);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Careers
router.get("/", async (req, res) => {
  const careers = await Career.find();
  res.json(careers);
});

module.exports = router;
   