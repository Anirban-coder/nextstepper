import SkillCard from "./SkillCard";
import ProgressBar from "./ProgressBar";

function CareerCard({ track, onSkillUpdate }) {
  const completed = track.skills.filter(
    (s) => s.status === "Completed"
  ).length;

  const total = track.skills.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "16px" }}>
        <h2>{track.career.title}</h2>
        <p style={{ color: "#666" }}>{track.career.description}</p>
      </div>

      {/* PROGRESS */}
      <ProgressBar percentage={percent} />
      <p style={{ marginBottom: "16px" }}>
        {completed} of {total} skills completed ({percent}%)
      </p>

      {/* SKILLS */}
      <div>
        {track.skills.map((skillProgress) => (
          <SkillCard
            key={skillProgress._id}
            careerId={track.career._id}
            skillProgress={skillProgress}
            onUpdate={onSkillUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default CareerCard;
