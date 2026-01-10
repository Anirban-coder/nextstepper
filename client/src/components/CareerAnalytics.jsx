import ProgressBar from "./ProgressBar";

function CareerAnalytics({ track }) {
  const completed = track.skills.filter(s => s.status === "Completed").length;
  const total = track.skills.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginBottom: "12px",
        borderRadius: "8px",
      }}
    >
      <h3>{track.career.title}</h3>
      <ProgressBar percentage={percent} />
      <p>{completed} / {total} skills completed</p>
    </div>
  );
}

export default CareerAnalytics;
