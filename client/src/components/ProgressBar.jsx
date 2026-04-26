function ProgressBar({ percentage }) {
  return (
    <div className="progress-shell">
      <div className="progress-bar">
        <div
          className={`progress-bar-fill${percentage === 100 ? " complete" : ""}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <small className="mini-note">{percentage}% completed</small>
    </div>
  );
}

export default ProgressBar;
