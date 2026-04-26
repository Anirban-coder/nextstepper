function CareerAnalytics({ track }) {
  const title = track?.career?.title || "Untitled Track";
  const skills = track?.skills || [];
  const totalSkills = skills.length;
  const completedSkills = skills.filter((skill) => skill.status === "Completed").length;
  const inProgressSkills = skills.filter((skill) => skill.status === "In Progress").length;
  const percent = totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

  return (
    <div className="career-analytics-card">
      <div className="career-analytics-header">
        <div>
          <h3 style={{ marginBottom: "8px" }}>{title}</h3>
          <p className="mini-note">
            {completedSkills} of {totalSkills} skills completed
          </p>
        </div>
        <strong style={{ fontSize: "1.4rem", color: "var(--accent)" }}>{percent}%</strong>
      </div>

      <div className="career-analytics-progress">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <p className="career-analytics-meta">
        {inProgressSkills} skill{inProgressSkills === 1 ? "" : "s"} in progress
      </p>
    </div>
  );
}

export default CareerAnalytics;
