import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";
import StatCard from "../components/StatCard";
import CareerAnalytics from "../components/CareerAnalytics";

function Analytics() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardData();
      setDashboard(data);
    };
    load();
  }, []);

  if (!dashboard) return <h2>Loading analytics...</h2>;

  let totalSkills = 0;
  let completedSkills = 0;
  let inProgressSkills = 0;

  dashboard.learningTracks.forEach((track) => {
    totalSkills += track.skills.length;
    completedSkills += track.skills.filter(s => s.status === "Completed").length;
    inProgressSkills += track.skills.filter(s => s.status === "In Progress").length;
  });

  const overallPercent = totalSkills === 0
    ? 0
    : Math.round((completedSkills / totalSkills) * 100);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Learning Analytics</h1>

      <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
        <StatCard title="Overall Completion" value={`${overallPercent}%`} />
        <StatCard title="Completed Skills" value={completedSkills} />
        <StatCard title="Skills In Progress" value={inProgressSkills} />
      </div>

      <h2>Career Breakdown</h2>

      {dashboard.learningTracks.map((track) => (
        <CareerAnalytics key={track._id} track={track} />
      ))}
    </div>
  );
}

export default Analytics;
