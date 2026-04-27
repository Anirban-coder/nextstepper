import { useState } from "react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      login(data.token, data.user);
      navigate(data.user?.role === "teacher" ? "/teacher-dashboard" : "/dashboard");
    } catch (err) {
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth-shell">
      <section className="auth-showcase">
        <div className="auth-showcase-card">
          <span className="auth-badge">Career operating system</span>
          <h1 className="auth-hero-title">Learn with style, not chaos.</h1>
          <p className="auth-hero-copy">
            NextStepper turns courses, skills, progress, and AI guidance into one sharp workspace built for momentum.
          </p>
          <div className="auth-points">
            <div className="auth-point">
              <strong>Focused paths</strong>
              <p>
                Pick one track and see every milestone clearly.
              </p>
            </div>
            <div className="auth-point">
              <strong>Readable progress</strong>
              <p>
                Your dashboard shows what is done, what is blocked, and what comes next.
              </p>
            </div>
            <div className="auth-point">
              <strong>AI that feels personal</strong>
              <p>
                Upload your resume and get career advice grounded in your actual profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <form onSubmit={handleSubmit} className="auth-form-card glass-panel">
          <span className="section-kicker">Welcome back</span>
          <h2 className="auth-title">Log in and keep building.</h2>
          <p className="auth-subtitle">
            Step back into your dashboard, continue your track, and let the AI coach keep up with you.
          </p>

          <div className="auth-form-grid">
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="auth-input"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                className="auth-input"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: "22px" }}>
            Log In
          </button>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Login;
