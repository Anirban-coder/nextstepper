import { useEffect, useState } from "react";
import { getDashboardData, updateSkillProgress } from "../services/api";
import { useNavigate } from "react-router-dom";
import CareerCard from "../components/CareerCard";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  const loadDashboard = async () => {
    const data = await getDashboardData();
    setDashboard(data);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSkillUpdate = async (careerId, skillId, status) => {
    await updateSkillProgress(careerId, skillId, status);
    loadDashboard();
  };

  if (!dashboard) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>Dashboard</h1>

      {dashboard.learningTracks.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>You haven’t selected any careers yet.</p>
          <button onClick={() => navigate("/careers")}>
            Choose Careers
          </button>
        </div>
      )}

      {dashboard.learningTracks.map((track) => (
        <CareerCard
          key={track._id}
          track={track}
          onSkillUpdate={handleSkillUpdate}
        />
      ))}
    </div>
  );
}

export default Dashboard;
