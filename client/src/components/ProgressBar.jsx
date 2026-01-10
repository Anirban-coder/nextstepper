function ProgressBar({ percentage }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          height: "10px",
          background: "#e0e0e0",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: percentage === 100 ? "#2e7d32" : "#1976d2",
            transition: "width 0.9s ease",
          }}
        />
      </div>
      <small style={{ color: "#555" }}>{percentage}% completed</small>
    </div>
  );
}

export default ProgressBar;
