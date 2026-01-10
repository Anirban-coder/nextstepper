const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
      required: true,
    },
    resources: [
      {
        title: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
