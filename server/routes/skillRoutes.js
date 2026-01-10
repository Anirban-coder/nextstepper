const express = require("express");
const Skill = require("../models/Skill");
const { getSkillsByCareer } = require("../controllers/skillController");

const router = express.Router();

// CREATE SKILL
router.post("/", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET SKILLS BY CAREER (ROADMAP)
router.get("/career/:careerId", getSkillsByCareer);

module.exports = router;
