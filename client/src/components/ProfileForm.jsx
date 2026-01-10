import { useState } from "react";

function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({
    fullName: profile?.fullName || "",
    headline: profile?.headline || "",
    education: profile?.education || "",
    experienceLevel: profile?.experienceLevel || "Beginner",
    goals: profile?.goals || "",
    availability: profile?.availability || "",
    targetRoles: profile?.targetRoles || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Full Name</label>
      <input name="fullName" value={form.fullName} onChange={handleChange} />

      <label>Headline</label>
      <input name="headline" value={form.headline} onChange={handleChange} />

      <label>Education</label>
      <input name="education" value={form.education} onChange={handleChange} />

      <label>Experience Level</label>
      <select
        name="experienceLevel"
        value={form.experienceLevel}
        onChange={handleChange}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <label>Goals</label>
      <textarea name="goals" value={form.goals} onChange={handleChange} />

      <label>Availability (hours/week)</label>
      <input
        name="availability"
        value={form.availability}
        onChange={handleChange}
      />

      <label>Target Roles</label>
      <input
        name="targetRoles"
        value={form.targetRoles}
        onChange={handleChange}
      />

      <button type="submit" style={{ marginTop: "12px" }}>
        Save Profile
      </button>
    </form>
  );
}

export default ProfileForm;
