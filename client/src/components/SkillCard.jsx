function SkillCard({ careerId, skillProgress, onUpdate }) {
  const { skill, status } = skillProgress;
  const statusClass =
    status === "Completed" ? "done" : status === "In Progress" ? "progress" : "todo";

  return (
    <div className="skill-card">
      <div className="skill-card-copy">
        <strong>{skill.title}</strong>
        <div className={`skill-status-badge ${statusClass}`}>{status}</div>
      </div>

      <div className="skill-card-actions">
        {status !== "In Progress" && (
          <button
            onClick={() => onUpdate(careerId, skill._id, "In Progress")}
            className="skill-action-btn progress"
          >
            Start
          </button>
        )}

        {status !== "Completed" && (
          <button
            onClick={() => onUpdate(careerId, skill._id, "Completed")}
            className="skill-action-btn complete"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
