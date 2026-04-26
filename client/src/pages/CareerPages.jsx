import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCareers, getDashboardData, selectCareer } from "../services/api";
import { useAuth } from "../context/AuthContext";

function CareersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [careers, setCareers] = useState([]);
  const [activeTrackIds, setActiveTrackIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError("");

        const [careersData, dashboardData] = await Promise.all([
          getCareers(),
          getDashboardData().catch(() => ({ learningTracks: [] })),
        ]);

        setCareers(Array.isArray(careersData) ? careersData : []);
        setActiveTrackIds(
          Array.isArray(dashboardData?.learningTracks)
            ? dashboardData.learningTracks
                .map((track) => track?.career?._id || track?.career)
                .filter(Boolean)
            : []
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load careers.");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  const stats = useMemo(() => {
    const total = careers.length;
    const beginner = careers.filter((career) => career.level === "Beginner").length;
    const intermediate = careers.filter((career) => career.level === "Intermediate").length;

    return { total, beginner, intermediate };
  }, [careers]);

  const handleSelectCareer = async (careerId) => {
    try {
      setSubmittingId(careerId);
      setError("");
      await selectCareer(careerId);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add career.");
    } finally {
      setSubmittingId("");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h3>Loading careers...</h3>
        <p className="muted-copy">Bringing in the latest tracks from the catalog.</p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="dashboard-grid">
        <section className="careers-hero">
          <div className="dashboard-panel">
            <span className="section-kicker">Career catalog</span>
            <h1 className="dashboard-hero-title">Pick the next track you want to turn into momentum.</h1>
            <p className="muted-copy" style={{ maxWidth: "60ch", fontSize: "1.04rem" }}>
              Browse every published path, compare difficulty, and add the one that best fits your current stretch goal.
            </p>
            <div className="hero-actions" style={{ marginTop: "24px" }}>
              <Link to={user?.role === "teacher" ? "/teacher-dashboard" : "/dashboard"} className="secondary-btn">
                Back to dashboard
              </Link>
              {user?.role === "teacher" && (
                <Link to="/create-course" className="primary-btn">
                  Create Course
                </Link>
              )}
            </div>
          </div>

          <div className="careers-stats">
            <div className="dashboard-stat-card">
              <p className="mini-note">Available tracks</p>
              <div className="dashboard-stat-value">{stats.total}</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                Fresh options ready for students to start.
              </p>
            </div>
            <div className="dashboard-stat-card">
              <p className="mini-note">Beginner friendly</p>
              <div className="dashboard-stat-value">{stats.beginner}</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                Low-friction entry points for building consistency.
              </p>
            </div>
            <div className="dashboard-stat-card">
              <p className="mini-note">Intermediate paths</p>
              <div className="dashboard-stat-value">{stats.intermediate}</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                Tracks for learners ready to go deeper.
              </p>
            </div>
          </div>
        </section>

        {error && <p className="auth-error">{error}</p>}

        <section className="dashboard-list-card">
          <div className="track-card-header">
            <div>
              <span className="section-kicker">Browse tracks</span>
              <h2 style={{ margin: "14px 0 0" }}>Choose what to learn next</h2>
            </div>
          </div>

          {careers.length === 0 ? (
            <div className="dashboard-empty-card" style={{ boxShadow: "none" }}>
              <h3>No careers available yet</h3>
              <p className="muted-copy">
                A teacher needs to publish the first course before this catalog fills up.
              </p>
            </div>
          ) : (
            <div className="careers-grid">
              {careers.map((career) => {
                const alreadyAdded = activeTrackIds.includes(career._id);

                return (
                  <article key={career._id} className="career-card">
                    <span className="career-card-tag">{career.level || "Beginner"}</span>
                    <h3 className="career-card-title">{career.title}</h3>
                    <p className="career-card-desc">
                      {career.description || "This track is ready for students, but the description still needs a little love."}
                    </p>
                    {user?.role !== "teacher" ? (
                      <button
                        type="button"
                        className={alreadyAdded ? "ghost-btn" : "primary-btn"}
                        onClick={() => handleSelectCareer(career._id)}
                        disabled={alreadyAdded || submittingId === career._id}
                      >
                        {alreadyAdded
                          ? "Already Added"
                          : submittingId === career._id
                            ? "Adding..."
                            : "Add Track"}
                      </button>
                    ) : (
                      <Link to="/create-course" className="secondary-btn">
                        Build Another
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CareersPage;
