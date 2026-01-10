function CareerHeader({ career, skills }) {
  const total = skills.length;
  const completed = skills.filter(
    (s) => s.status === "Completed"
  ).length;

  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ marginBottom: "15px" }}>
      <h2>{career.title}</h2>
      <p>{career.description}</p>

      <progress value={percent} max="100" />
      <p>{percent}% completed</p>
    </div>
  );
}

export default CareerHeader;
