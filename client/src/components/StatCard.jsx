function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h4 className="stat-card-title">{title}</h4>
      <strong className="stat-card-value">{value}</strong>
    </div>
  );
}

export default StatCard;
