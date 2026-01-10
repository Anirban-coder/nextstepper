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
      const saved = await updateProfile(updatedProfile);
      setProfile(saved);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to save profile");
    }
  };

  if (loading) return <h2>Loading profile...</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Student Profile</h1>
      <p>This information will be used for AI recommendations later.</p>

      <ProfileForm profile={profile} onSave={handleSave} />
    </div>
  );
}

export default Profile;
