const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  link: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  startYear: Number,
  endYear: Number,
});

const resumeSchema = new mongoose.Schema(
  {
    // 🔗 Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 👤 Basic Info
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
    },

    // ✍️ Summary (AI will improve later)
    summary: {
      type: String,
      default: "",
    },

    // 🧠 Skills (linked to Skill model)
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    // 🛠 Projects
    projects: [projectSchema],

    // 💼 Experience
    experience: [experienceSchema],

    // 🎓 Education
    education: [educationSchema],

    // 📊 Metadata
    completionPercentage: {
      type: Number,
      default: 0,
    },

    lastGeneratedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
