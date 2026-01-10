function StudentOverview() {
  // Later this will come from backend
  const student = {
    name: "Student",
    primaryGoal: "Full Stack Developer",
    level: "Beginner → Intermediate",
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "20px",
        background: "#fafafa",
      }}
    >
      <h2>Welcome, {student.name} 👋</h2>
      <p>
        Goal: <strong>{student.primaryGoal}</strong>
      </p>
      <p>Current Level: {student.level}</p>
    </div>
  );
}

export default StudentOverview;
