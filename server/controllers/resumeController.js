const Resume = require("../models/Resume");
// const User = require("../models/User"); // Not currently needed, but fine to keep

// Function 1: Get Resume
const getResume = async (req, res) => {
  try {
    // We use findOne because a user only has ONE resume
    const resume = await Resume.findOne({ user: req.user.id });
    if (!resume) {
      // If no resume exists, return an empty structure so frontend doesn't break
      return res.json({ skills: [], user: req.user.id });
    }
    res.json(resume);
  } catch (err) {
    console.error("Get Resume Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// Function 2: Update Resume (Bulk)
const updateResumeSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    let resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      resume = new Resume({
        user: req.user.id,
        skills: skills,
        completionPercentage: 0 
      });
    } else {
      resume.skills = skills;
    }

    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error("Update Resume Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// 👇 Function 3: The Missing Logic for "Complete" Button
const updateSkillStatus = async (req, res) => {
  try {
    // Frontend sends: { skillId: "HTML", status: "Completed" }
    const { skillId, status } = req.body; 

    let resume = await Resume.findOne({ user: req.user.id });

    if (!resume) {
      // Create new resume if it doesn't exist yet
      resume = new Resume({ user: req.user.id, skills: [] });
    }

    // Check if skill already exists in the resume
    const skillIndex = resume.skills.findIndex((s) => s.skillId === skillId);

    if (skillIndex > -1) {
      // Update existing skill
      resume.skills[skillIndex].status = status;
    } else {
      // Add new skill
      resume.skills.push({ skillId, status });
    }

    await resume.save();
    res.json(resume);
    
  } catch (err) {
    console.error("Skill Update Error:", err.message);
    res.status(500).send("Server Error");
  }
};

// ✅ EXPORT ALL 3 FUNCTIONS
module.exports = {
  getResume,
  updateResumeSkills,
  updateSkillStatus // <--- Don't forget this!
};