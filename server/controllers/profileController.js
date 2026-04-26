const path = require("path");
const User = require("../models/User");
const Resume = require("../models/Resume");

const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select(
      "name headline education experienceLevel goals availability targetRoles resume"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resume = user.resume ? await Resume.findById(user.resume).select("fileUrl") : null;

    res.json({
      fullName: user.name || "",
      headline: user.headline || "",
      education: user.education || "",
      experienceLevel: user.experienceLevel || "Beginner",
      goals: user.goals || "",
      availability: user.availability || "",
      targetRoles: user.targetRoles || "",
      resumeFileName: resume?.fileUrl ? path.basename(resume.fileUrl) : "",
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.fullName ?? user.name;
    user.headline = req.body.headline ?? user.headline;
    user.education = req.body.education ?? user.education;
    user.experienceLevel = req.body.experienceLevel ?? user.experienceLevel;
    user.goals = req.body.goals ?? user.goals;
    user.availability = req.body.availability ?? user.availability;
    user.targetRoles = req.body.targetRoles ?? user.targetRoles;

    await user.save();

    let resume = user.resume ? await Resume.findById(user.resume) : null;

    if (!resume) {
      resume = await Resume.create({ user: user._id });
      user.resume = resume._id;
      await user.save();
    }

    if (req.file?.path) {
      resume.fileUrl = req.file.path;
      await resume.save();
    }

    res.json({
      fullName: user.name || "",
      headline: user.headline || "",
      education: user.education || "",
      experienceLevel: user.experienceLevel || "Beginner",
      goals: user.goals || "",
      availability: user.availability || "",
      targetRoles: user.targetRoles || "",
      resumeFileName: resume?.fileUrl ? path.basename(resume.fileUrl) : "",
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

module.exports = { getProfile, updateProfile };
