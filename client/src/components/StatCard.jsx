function StatCard({ title, value }) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        minWidth: "160px",
        background: "#fafafa",
      }}
    >
      <h4>{title}</h4>
      <strong style={{ fontSize: "24px" }}>{value}</strong>
    </div>
  );
}

export default StatCard;
