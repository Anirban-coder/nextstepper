const mongoose = require("mongoose");

const learningTrackSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Career",
    required: true,
  },
  skills: [
    {
      skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
      status: { 
        type: String, 
        enum: ["Not Started", "In Progress", "Completed"], 
        default: "Not Started" 
      },
    }
  ],
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    // 🆕 NEW FIELDS
    role: { 
      type: String, 
      enum: ["student", "teacher"], 
      default: "student" 
    },
    
    // For Students
    gender: { 
      type: String, 
      enum: ["male", "female", "other", "select"],
      default: "select"
    },
    headline: { type: String, default: "" },
    education: { type: String, default: "" },
    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    goals: { type: String, default: "" },
    availability: { type: String, default: "" },
    targetRoles: { type: String, default: "" },

    // For Teachers
    expertise: { type: String }, // e.g., "Web Development"
    experience: { type: Number }, // e.g., 5 (years)

    learningTracks: [learningTrackSchema],
  
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
