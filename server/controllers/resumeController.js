const Resume = require("../models/Resume");
const calculateResumeCompletion = require("../utils/calculateResumeCompletion");
const createNotification = require("../utils/createNotification");

// ================= GET MY RESUME =================
exports.getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id })
      .populate("skills");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE MY RESUME =================
exports.updateMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Allow partial updates
    Object.assign(resume, req.body);
    resume.completionPercentage = calculateResumeCompletion(resume);

    await resume.save();
    if (resume.completionPercentage >= 50) {
  await createNotification({
    userId: req.user._id,
    title: "Resume Progress 🚀",
    message: `Your resume is now ${resume.completionPercentage}% complete`,
    type: "resume",
  });
}
 
    res.json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
