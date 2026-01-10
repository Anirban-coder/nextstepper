const Resume = require("../models/Resume");

const syncResumeSkills = async (userId, learningTracks) => {
  const resume = await Resume.findOne({ user: userId });
const calculateResumeCompletion = require("./calculateResumeCompletion");

resume.completionPercentage = calculateResumeCompletion(resume);
await resume.save();
  if (!resume) return;

  // collect completed skills
  const completedSkillIds = [];

  learningTracks.forEach(track => {
    track.skills.forEach(skillProgress => {
      if (skillProgress.status === "Completed") {
        completedSkillIds.push(skillProgress.skill.toString());
      }
    });
  });

  // remove duplicates
  resume.skills = [...new Set(completedSkillIds)];

  await resume.save();
};

module.exports = syncResumeSkills;
