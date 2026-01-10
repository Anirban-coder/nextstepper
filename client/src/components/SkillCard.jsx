function SkillCard({ careerId, skillProgress, onUpdate }) {
  const { skill, status } = skillProgress;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <strong>{skill.title}</strong>
        <div style={{ fontSize: "12px", color: "#666" }}>
          Status: {status}
        </div>
      </div>

      <div>
        {status !== "In Progress" && (
          <button
            onClick={() =>
              onUpdate(careerId, skill._id, "In Progress")
            }
            style={{ marginRight: "8px" }}
          >
            Start
          </button>
        )}

        {status !== "Completed" && (
          <button
            onClick={() =>
              onUpdate(careerId, skill._id, "Completed")
            }
            style={{ background: "#4caf50", color: "#fff" }}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
