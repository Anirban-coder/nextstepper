const User = require("../models/User");
const Resume = require("../models/Resume");

const getAIInsights = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId)
      .select("name role learningTracks goals experienceLevel")
      .populate("learningTracks.career", "title")
      .populate("learningTracks.skills.skill", "title");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resume = await Resume.findOne({ user: userId }).select("completionPercentage");
    const tracks = Array.isArray(user.learningTracks) ? user.learningTracks : [];
    const totalSkills = tracks.reduce((count, track) => count + (track.skills?.length || 0), 0);
    const completedSkills = tracks.reduce(
      (count, track) =>
        count + (track.skills || []).filter((skill) => skill.status === "Completed").length,
      0
    );
    const inProgressSkills = tracks.reduce(
      (count, track) =>
        count + (track.skills || []).filter((skill) => skill.status === "In Progress").length,
      0
    );

    const activeTrack = tracks.find((track) =>
      (track.skills || []).some((skill) => skill.status !== "Completed")
    );

    const insightParts = [];

    if (tracks.length === 0) {
      insightParts.push("You have not started a learning track yet.");
      insightParts.push("Pick one course from the careers page to unlock a focused roadmap.");
    } else {
      insightParts.push(
        `You are working across ${tracks.length} track${tracks.length === 1 ? "" : "s"} with ${completedSkills} of ${totalSkills} skills completed.`
      );

      if (activeTrack?.career?.title) {
        insightParts.push(`Your best next move is to keep pushing "${activeTrack.career.title}" until the next milestone is complete.`);
      }

      if (inProgressSkills > 0) {
        insightParts.push(`${inProgressSkills} skill${inProgressSkills === 1 ? "" : "s"} already have momentum, so finishing one of those first will create the fastest visible progress.`);
      } else if (totalSkills > completedSkills) {
        insightParts.push("Start one not-yet-begun skill now to turn the roadmap back into active momentum.");
      }
    }

    if (typeof resume?.completionPercentage === "number") {
      if (resume.completionPercentage < 60) {
        insightParts.push("Your resume still has room to grow, so tightening that profile will improve recommendations and career readiness.");
      } else {
        insightParts.push("Your resume foundation looks solid enough to support stronger career guidance.");
      }
    }

    if (user.goals) {
      insightParts.push(`Keep your stated goal in view: ${user.goals}.`);
    }

    res.json({
      insight: insightParts.join(" "),
      stats: {
        tracks: tracks.length,
        totalSkills,
        completedSkills,
        inProgressSkills,
        resumeCompletion: resume?.completionPercentage ?? null,
      },
    });
  } catch (error) {
    console.error("AI Insight Error:", error);
    res.status(500).json({ message: "Failed to generate AI insights", error: error.message });
  }
};

module.exports = { getAIInsights };
