import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

function LearningSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadSummary = async () => {
      const data = await getDashboardData();

      let totalSkills = 0;
      let completedSkills = 0;
      let inProgressSkills = 0;

      data.learningTracks.forEach((track) => {
        track.skills.forEach((s) => {
          totalSkills++;
          if (s.status === "Completed") completedSkills++;
          if (s.status === "In Progress") inProgressSkills++;
        });
      });

      setSummary({
        careersCount: data.learningTracks.length,
        totalSkills,
        completedSkills,
        inProgressSkills,
      });
    };

    loadSummary();
  }, []);

  if (!summary) return <p>Loading learning summary...</p>;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        background: "#fff",
      }}
    >
      <h3>Learning Summary</h3>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <SummaryItem label="Careers Selected" value={summary.careersCount} />
        <SummaryItem label="Total Skills" value={summary.totalSkills} />
        <SummaryItem label="In Progress" value={summary.inProgressSkills} />
        <SummaryItem label="Completed" value={summary.completedSkills} />
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div
      style={{
        minWidth: "150px",
        padding: "12px",
        borderRadius: "8px",
        background: "#f5f5f5",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</div>
      <div style={{ fontSize: "13px", color: "#555" }}>{label}</div>
    </div>
  );
}

export default LearningSummary;
