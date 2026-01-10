const calculateResumeCompletion = (resume) => {
  let score = 0;

  // 1️⃣ Personal Info (20%)
  const personal = resume.personalInfo || {};
  const personalFields = [
    personal.fullName,
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
  ].filter(Boolean);

  if (personalFields.length >= 3) score += 20;

  // 2️⃣ Summary (10%)
  if (resume.summary && resume.summary.length > 30) {
    score += 10;
  }

  // 3️⃣ Skills (25%)
  if (resume.skills && resume.skills.length > 0) {
    score += Math.min(25, resume.skills.length * 5);
  }

  // 4️⃣ Projects (25%)
  if (resume.projects && resume.projects.length > 0) {
    score += Math.min(25, resume.projects.length * 10);
  }

  // 5️⃣ Experience (10%)
  if (resume.experience && resume.experience.length > 0) {
    score += 10;
  }

  // 6️⃣ Education (10%)
  if (resume.education && resume.education.length > 0) {
    score += 10;
  }

  return Math.min(score, 100);
};

module.exports = calculateResumeCompletion;
