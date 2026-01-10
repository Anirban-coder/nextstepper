const Skill = require("../models/Skill");

// GET skills by career ID
exports.getSkillsByCareer = async (req, res) => {
  try {
    const { careerId } = req.params;

    const skills = await Skill.find({ career: careerId })
      .populate("career", "title")
      .sort({ createdAt: 1 });

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
