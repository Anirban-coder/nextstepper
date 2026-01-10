const User = require("../models/User");
const Skill = require("../models/Skill");
const syncResumeSkills = require("../utils/syncResumeSkills");
// SELECT CAREER (creates a new learning track)
exports.selectCareer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { careerId } = req.body;

    const user = await User.findById(userId);

    // Prevent duplicate career
    const alreadyExists = user.learningTracks.some(
      (track) => track.career.toString() === careerId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Career already added" });
    }

    const skills = await Skill.find({ career: careerId });

    const skillsProgress = skills.map((skill) => ({
      skill: skill._id,
      status: "Not Started",
    }));

    user.learningTracks.push({
      career: careerId,
      skills: skillsProgress,
    });

    await user.save();
    await syncResumeSkills(user._id, user.learningTracks);
    res.json({
      message: "Career added successfully",
      learningTracks: user.learningTracks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE SKILL STATUS
exports.updateSkillProgress = async (req, res) => {
  try {
    const { careerId, skillId, status } = req.body;
    const user = await User.findById(req.user._id);

    const track = user.learningTracks.find(
      (t) => t.career.toString() === careerId
    );

    if (!track) {
      return res.status(404).json({ message: "Career not found" });
    }

    const skill = track.skills.find(
      (s) => s.skill.toString() === skillId
    );

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.status = status;
    await user.save();
    if (status === "Completed") {
      await createNotification({
        userId: req.user._id,
        title: "Skill Completed 🎉",
        message: "Great job! You completed a new skill.",
        type: "skill",
      });
    }
    await syncResumeSkills(user._id, user.learningTracks);
    res.json({ message: "Skill updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD DATA
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("learningTracks.career", "title description")
      .populate("learningTracks.skills.skill", "title level order");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let totalSkills = 0;
    let completedSkills = 0;

    user.learningTracks.forEach((track) => {
      totalSkills += track.skills.length;
      completedSkills += track.skills.filter(
        (s) => s.status === "Completed"
      ).length;
    });

    const progressPercentage =
      totalSkills === 0
        ? 0
        : Math.round((completedSkills / totalSkills) * 100);

    res.json({
      learningTracks: user.learningTracks,
      progress: {
        total: totalSkills,
        completed: completedSkills,
        percentage: progressPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
