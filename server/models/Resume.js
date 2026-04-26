const mongoose = require("mongoose");

// ... (Keep your projectSchema, experienceSchema, educationSchema as they are) ...
// I will just show the main Resume Schema update:

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    // 🆕 NEW FIELD: Path to the uploaded file
    fileUrl: { type: String }, 

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
    },
    
    summary: { type: String, default: "" },
    
    // ... Keep the rest of your schema (skills, projects, etc.) same as before ...
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    completionPercentage: { type: Number, default: 0 },
    lastGeneratedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);