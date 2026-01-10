import { useEffect, useState } from "react";
import { getCareers, selectCareer, getDashboardData } from "../services/api";
import { useNavigate } from "react-router-dom";

function SelectCareer() {
  const [careers, setCareers] = useState([]);
  const [addedCareers, setAddedCareers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const careerData = await getCareers();
      const dashboard = await getDashboardData();

      setCareers(careerData);
      setAddedCareers(
        dashboard.learningTracks.map((t) => t.career._id)
      );
    };

    load();
  }, []);

  const handleSelect = async (careerId) => {
    try {
      await selectCareer(careerId);
      navigate("/dashboard");
    } catch (err) {
      alert("Career already added or error occurred");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Choose Your Career</h1>
      <p>Select a career path to start your journey</p>

      {careers.length === 0 && <p>No careers available.</p>}

      {careers.map((career) => {
        const alreadyAdded = addedCareers.includes(career._id);

        return (
          <div
            key={career._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              opacity: alreadyAdded ? 0.6 : 1,
            }}
          >
            <h3>{career.title}</h3>
            <p>{career.description}</p>

            <button
              disabled={alreadyAdded}
              onClick={() => handleSelect(career._id)}
            >
              {alreadyAdded ? "Already Added" : "Add Career"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SelectCareer;
