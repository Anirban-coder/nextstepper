const mongoose = require("mongoose");

const skillProgressSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
});

const learningTrackSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Career",
    required: true,
  },
  skills: [skillProgressSchema],
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,

    learningTracks: [learningTrackSchema],
  
  resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
