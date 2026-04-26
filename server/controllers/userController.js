const User = require("../models/User");
const Skill = require("../models/Skill");

// 1. SELECT CAREER
exports.selectCareer = async (req, res) => {
  try {
    // SAFE ID CHECK: Try .id, then ._id, then fail if neither exists
    const userId = req.user.id || req.user._id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No User ID found in request" });
    }

    const { careerId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

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
    res.json({ message: "Career added successfully", learningTracks: user.learningTracks });

  } catch (error) {
    console.error("Select Career Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 2. UPDATE SKILL STATUS (The one causing the error)
exports.updateSkillProgress = async (req, res) => {
  try {
    const { careerId, skillId, status } = req.body;
    
    // SAFE ID CHECK
    const userId = req.user.id || req.user._id;
    
    console.log("🔹 START UPDATE:");
    console.log(`   User ID: ${userId}`);
    console.log(`   Career ID: ${careerId}`);
    console.log(`   Skill ID: ${skillId}`);
    console.log(`   New Status: ${status}`);

    if (!userId) {
      console.error("❌ Error: User ID is missing from req.user");
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1. Find User
    const user = await User.findById(userId);
    if (!user) {
      console.error("❌ Error: User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Find Track
    // We filter carefully to ensure we don't crash if career is null
    const track = user.learningTracks.find(t => t.career && t.career.toString() === careerId);
    
    if (!track) {
      console.error("❌ Error: Track not found. Available tracks:", user.learningTracks.map(t => t.career));
      return res.status(404).json({ message: "Track not found" });
    }

    // 3. Find Skill
    const skillEntry = track.skills.find(s => 
      (s.skill && s.skill.toString() === skillId) || 
      (s._id && s._id.toString() === skillId)
    );

    if (!skillEntry) {
      console.error("❌ Error: Skill not found in track.");
      return res.status(404).json({ message: "Skill not found in track" });
    }

    // 4. Update
    skillEntry.status = status;
    await user.save();
    
    console.log("✅ Update Successful!");
    res.json(user);

  } catch (error) {
    console.error("🔥 CRITICAL SERVER ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 3. DASHBOARD
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId)
      .select("-password")
      .populate("learningTracks.career", "title description")
      .populate("learningTracks.skills.skill", "title level order");

    if (!user) return res.status(404).json({ message: "User not found" });

    let totalSkills = 0;
    let completedSkills = 0;

    user.learningTracks.forEach((track) => {
      totalSkills += track.skills.length;
      completedSkills += track.skills.filter((s) => s.status === "Completed").length;
    });

    const progressPercentage = totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

    res.json({
      learningTracks: user.learningTracks,
      progress: {
        total: totalSkills,
        completed: completedSkills,
        percentage: progressPercentage,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
};