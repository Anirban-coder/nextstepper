import { useEffect, useState } from "react";
import { getCareers, getDashboardData, selectCareer } from "../services/api";
import { useNavigate } from "react-router-dom";

function Careers() {
  const [careers, setCareers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const allCareers = await getCareers();
        const dashboard = await getDashboardData();

        const alreadySelected = dashboard.learningTracks.map(
          (track) => track.career._id
        );

        setCareers(allCareers);
        setSelectedIds(alreadySelected);
      } catch (err) {
        console.error("Career load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddCareer = async (careerId) => {
    try {
      await selectCareer(careerId);
      setSelectedIds((prev) => [...prev, careerId]);
    } catch (err) {
      alert("Career already added or error occurred");
    }
  };

  if (loading) return <h2>Loading careers...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Choose Your Careers</h1>
      <p>You can select more than one career</p>

      {careers.map((career) => {
        const isSelected = selectedIds.includes(career._id);

        return (
          <div
            key={career._id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              opacity: isSelected ? 0.6 : 1,
            }}
          >
            <h3>{career.title}</h3>
            <p>{career.description}</p>

            {isSelected ? (
              <button disabled>Already Added</button>
            ) : (
              <button onClick={() => handleAddCareer(career._id)}>
                Add Career
              </button>
            )}
          </div>
        );
      })}

      <hr />

      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard →
      </button>
    </div>
  );
}

export default Careers;
