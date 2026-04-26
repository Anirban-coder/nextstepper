import { useCallback, useEffect, useState } from "react";
import { getDashboardData, updateSkillProgress } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import TrackProgressCard from "../components/TrackProgressCard";
import AIInsights from "../components/AIInsights";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardData();
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      if (err.response?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      setError("Failed to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleSkillUpdate = async (careerId, skillId, status) => {
    await updateSkillProgress(careerId, skillId, status);
    loadDashboard();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h3>Loading your progress...</h3>
        <p className="muted-copy">We are pulling your active tracks, progress, and AI guidance.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-loading">
        <h3 style={{ color: "#b33131" }}>{error}</h3>
      </div>
    );
  }

  if (!dashboard || !Array.isArray(dashboard.learningTracks) || dashboard.learningTracks.length === 0) {
    return (
      <div className="dashboard-empty">
        <div className="dashboard-empty-card">
          <span className="section-kicker">Fresh start</span>
          <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)", margin: "18px 0 12px" }}>
            You are one track away from momentum.
          </h1>
          <p className="muted-copy" style={{ maxWidth: "56ch", margin: "0 auto 26px" }}>
            Browse the catalog, pick a path that feels ambitious, and let your dashboard transform into a focused roadmap.
          </p>
          <button onClick={() => navigate("/careers")} className="primary-btn">
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const allSkills = dashboard.learningTracks.flatMap((track) => track.skills);
  const completedCount = allSkills.filter((skill) => skill.status === "Completed").length;
  const totalCount = allSkills.length;
  const pendingCount = totalCount - completedCount;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const chartData = [
    { name: "Completed", value: completedCount },
    { name: "Remaining", value: pendingCount },
  ];

  return (
    <div className="page-shell">
      <div className="dashboard-grid">
        <section className="dashboard-hero">
          <div className="dashboard-panel">
            <span className="section-kicker">Progress cockpit</span>
            <h1 className="dashboard-hero-title">Your learning system looks alive now.</h1>
            <p className="muted-copy" style={{ maxWidth: "58ch", fontSize: "1.04rem" }}>
              Keep your tracks moving, check your AI guidance, and turn every completed skill into visible momentum.
            </p>
            <div className="dashboard-actions" style={{ marginTop: "24px" }}>
              <Link to="/careers" className="primary-btn">
                Add Another Track
              </Link>
              <Link to="/profile" className="secondary-btn">
                Update Profile
              </Link>
            </div>
          </div>

          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <p className="mini-note">Overall completion</p>
              <div className="dashboard-stat-value">{progressPercentage}%</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                A clean read on how far your current roadmap has moved.
              </p>
            </div>
            <div className="dashboard-stat-card">
              <p className="mini-note">Active tracks</p>
              <div className="dashboard-stat-value">{dashboard.learningTracks.length}</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                Focused paths you are actively pushing forward.
              </p>
            </div>
          </div>
        </section>

        <section className="dashboard-panel dashboard-summary">
          <div>
            <p className="mini-note">Skills mastered</p>
            <h2 style={{ fontSize: "2rem", margin: "8px 0" }}>{completedCount} of {totalCount}</h2>
            <p className="muted-copy" style={{ marginBottom: 0 }}>
              Every completed skill sharpens your profile and feeds stronger AI advice.
            </p>
          </div>
          <div className="dashboard-summary-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={58}
                  outerRadius={84}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#c65d2e" : "#eadfd3"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="dashboard-summary-center">
              {progressPercentage}%
            </div>
          </div>
        </section>

        <AIInsights />

        <section className="dashboard-list-card">
          <div className="track-card-header">
            <div>
              <span className="section-kicker">Active tracks</span>
              <h2 style={{ margin: "14px 0 0" }}>What you are building right now</h2>
            </div>
          </div>

          <div style={{ display: "grid", gap: "18px" }}>
            {dashboard.learningTracks.map((track) => (
              <TrackProgressCard
                key={track._id}
                track={track}
                onSkillUpdate={handleSkillUpdate}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
