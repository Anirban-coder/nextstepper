import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "select",
    expertise: "",
    experience: "",
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataPayload = new FormData();
      dataPayload.append("name", formData.name);
      dataPayload.append("email", formData.email);
      dataPayload.append("password", formData.password);
      dataPayload.append("role", role);

      if (role === "student") {
        dataPayload.append("gender", formData.gender);
        if (resume) {
          dataPayload.append("resume", resume);
        }
      } else {
        dataPayload.append("expertise", formData.expertise);
        dataPayload.append("experience", formData.experience);
      }

      await registerUser(dataPayload);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-showcase">
        <div className="auth-showcase-card">
          <span className="auth-badge">Start strong</span>
          <h1 className="auth-hero-title">Turn effort into a visible path.</h1>
          <p className="auth-hero-copy">
            Whether you are learning or teaching, this platform should feel like something worth opening every day.
          </p>
          <div className="auth-points">
            <div className="auth-point">
              <strong>Students</strong>
              <p>
                Upload your resume, choose a path, and let the system personalize your next moves.
              </p>
            </div>
            <div className="auth-point">
              <strong>Teachers</strong>
              <p>
                Publish tracks that feel structured, motivating, and clear.
              </p>
            </div>
            <div className="auth-point">
              <strong>Momentum</strong>
              <p>
                Your dashboard should feel less like admin work and more like progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-card register-wide glass-panel">
          <span className="section-kicker">Join NextStepper</span>
          <h2 className="auth-title">Create a beautiful starting point.</h2>
          <p className="auth-subtitle">
            Pick your role, add the right context, and we will shape the experience around how you learn or teach.
          </p>

          <div className="auth-toggle">
            <button
              type="button"
              className={`auth-toggle-btn${role === "student" ? " active" : ""}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`auth-toggle-btn${role === "teacher" ? " active" : ""}`}
              onClick={() => setRole("teacher")}
            >
              Teacher
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="auth-form-grid two-col">
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-name">Full Name</label>
                <input
                  id="register-name"
                  className="auth-input"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-email">Email Address</label>
                <input
                  id="register-email"
                  className="auth-input"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="auth-field full">
                <label className="auth-label" htmlFor="register-password">Password</label>
                <input
                  id="register-password"
                  className="auth-input"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  required
                />
              </div>

              {role === "student" && (
                <>
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="register-gender">Gender</label>
                    <select id="register-gender" className="auth-select" name="gender" onChange={handleChange} required>
                      <option value="select">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="auth-field full">
                    <label className="auth-label" htmlFor="register-resume">Upload Resume</label>
                    <p className="mini-note">Optional, but it unlocks far better AI guidance later.</p>
                    <input
                      id="register-resume"
                      className="auth-file"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
              )}

              {role === "teacher" && (
                <>
                  <div className="auth-field full">
                    <label className="auth-label" htmlFor="register-expertise">Area of Expertise</label>
                    <input
                      id="register-expertise"
                      className="auth-input"
                      name="expertise"
                      autoComplete="organization-title"
                      placeholder="Web Development, Data Science, Cloud"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="auth-field full">
                    <label className="auth-label" htmlFor="register-experience">Years of Experience</label>
                    <input
                      id="register-experience"
                      className="auth-input"
                      name="experience"
                      type="number"
                      placeholder="5"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <button type="submit" disabled={loading} className="primary-btn" style={{ width: "100%", marginTop: "22px" }}>
              {loading ? "Creating Account..." : `Register as ${role === "student" ? "Student" : "Teacher"}`}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
