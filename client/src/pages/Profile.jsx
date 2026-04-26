import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { getProfile, updateProfile } from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async (updatedProfile) => {
    try {
      const data = new FormData();
      data.append("fullName", updatedProfile.fullName);
      data.append("headline", updatedProfile.headline);
      data.append("education", updatedProfile.education);
      data.append("experienceLevel", updatedProfile.experienceLevel);
      data.append("goals", updatedProfile.goals);
      data.append("availability", updatedProfile.availability);
      data.append("targetRoles", updatedProfile.targetRoles);
      if (updatedProfile.resume) {
        data.append("resume", updatedProfile.resume);
      }

      const saved = await updateProfile(data);
      setProfile(saved);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Profile save error:", err);
      alert(err.response?.data?.message || "Failed to save profile");
    }
  };

  if (loading) {
    return (
      <div className="loading-shell">
        <h2>Loading profile...</h2>
        <p className="muted-copy">Pulling your goals, resume status, and personal details.</p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="profile-layout">
        <aside className="profile-side-panel">
          <span className="section-kicker" style={{ background: "rgba(255,255,255,0.14)", color: "#fff3e8" }}>
            Personal brand
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", margin: "18px 0 14px" }}>Shape the profile your AI coach reads.</h1>
          <p className="muted-copy">
            Add your goals, upload the right resume, and give the system enough signal to personalize your next steps beautifully.
          </p>
          <div className="profile-highlights">
            <div className="profile-highlight-card">
              <p className="mini-note">Current resume</p>
              <strong>{profile?.resumeFileName || "No resume uploaded yet"}</strong>
            </div>
            <div className="profile-highlight-card">
              <p className="mini-note">Best result</p>
              <strong>Upload a clean PDF or DOCX with recent projects and skills.</strong>
            </div>
          </div>
        </aside>

        <section className="profile-form-card">
          <span className="section-kicker">Student profile</span>
          <h2 style={{ fontSize: "2rem", margin: "18px 0 10px" }}>Make your profile useful, not generic.</h2>
          <p className="muted-copy">
            Everything here feeds better course suggestions, cleaner AI insights, and a sharper learning plan.
          </p>
          <ProfileForm profile={profile} onSave={handleSave} />
        </section>
      </div>
    </div>
  );
}

export default Profile;
