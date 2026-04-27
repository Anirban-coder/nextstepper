import { useEffect, useState } from "react";

function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({
    fullName: "",
    headline: "",
    education: "",
    experienceLevel: "Beginner",
    goals: "",
    availability: "",
    targetRoles: "",
  });
  const [resume, setResume] = useState(null);

  useEffect(() => {
    setForm({
      fullName: profile?.fullName || "",
      headline: profile?.headline || "",
      education: profile?.education || "",
      experienceLevel: profile?.experienceLevel || "Beginner",
      goals: profile?.goals || "",
      availability: profile?.availability || "",
      targetRoles: profile?.targetRoles || "",
    });
    setResume(null);
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, resume });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-form-grid">
        <div className="profile-field">
          <label className="profile-label" htmlFor="profile-full-name">Full Name</label>
          <input
            id="profile-full-name"
            className="profile-input"
            name="fullName"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="profile-headline">Headline</label>
          <input
            id="profile-headline"
            className="profile-input"
            name="headline"
            value={form.headline}
            onChange={handleChange}
            placeholder="Aspiring frontend developer, data analyst, ..."
          />
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="profile-education">Education</label>
          <input
            id="profile-education"
            className="profile-input"
            name="education"
            autoComplete="organization"
            value={form.education}
            onChange={handleChange}
            placeholder="B.Tech CSE, self-taught, bootcamp, ..."
          />
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="profile-experience-level">Experience Level</label>
          <select
            id="profile-experience-level"
            className="profile-select"
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="profile-field full">
          <label className="profile-label" htmlFor="profile-goals">Goals</label>
          <textarea
            id="profile-goals"
            className="profile-textarea"
            name="goals"
            value={form.goals}
            onChange={handleChange}
            placeholder="Describe the role you want, the skills you want to build, and the timeline you are aiming for."
          />
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="profile-availability">Availability (hours/week)</label>
          <input
            id="profile-availability"
            className="profile-input"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="8-12"
          />
        </div>

        <div className="profile-field">
          <label className="profile-label" htmlFor="profile-target-roles">Target Roles</label>
          <input
            id="profile-target-roles"
            className="profile-input"
            name="targetRoles"
            value={form.targetRoles}
            onChange={handleChange}
            placeholder="Frontend Developer, Product Designer"
          />
        </div>

        <div className="profile-field full">
          <label className="profile-label" htmlFor="profile-resume">Resume</label>
          <div className="profile-resume-box">
            {profile?.resumeFileName ? (
              <p className="mini-note">Current file: {profile.resumeFileName}</p>
            ) : (
              <p className="mini-note">No resume uploaded yet.</p>
            )}
            <input
              id="profile-resume"
              className="profile-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </div>

      <div className="profile-save-row">
        <p className="mini-note">Save text updates alone, or replace the resume in the same step.</p>
        <button type="submit" className="primary-btn">
          Save Profile
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
