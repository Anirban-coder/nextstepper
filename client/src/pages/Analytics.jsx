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

  if (!dashboard) {
    return (
      <div className="dashboard-loading">
        <h2>Loading analytics...</h2>
        <p className="muted-copy">Summarizing your completed, active, and in-progress skills.</p>
      </div>
    );
  }

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
    <div className="page-shell">
      <div className="analytics-grid">
        <section className="analytics-card hero">
          <span className="section-kicker">Learning analytics</span>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", margin: "18px 0 12px" }}>
            See your progress as a pattern, not a pile of tasks.
          </h1>
          <p className="muted-copy" style={{ maxWidth: "62ch", marginBottom: 0 }}>
            This view turns all your tracks into a clean snapshot so you can spot momentum, unfinished work, and where to focus next.
          </p>
        </section>

        <section className="analytics-card wide">
          <div className="analytics-cards-row">
            <StatCard title="Overall Completion" value={`${overallPercent}%`} />
            <StatCard title="Completed Skills" value={completedSkills} />
            <StatCard title="Skills In Progress" value={inProgressSkills} />
          </div>
        </section>

        <section className="analytics-card wide">
          <span className="section-kicker">Career breakdown</span>
          <h2 style={{ margin: "14px 0 0" }}>Progress across every active track</h2>
          <div className="career-analytics-grid" style={{ marginTop: "20px" }}>
            {dashboard.learningTracks.map((track) => (
              <CareerAnalytics key={track._id} track={track} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Analytics;
