import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCareers } from "../services/api";

function TeacherDashboard() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCareers = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCareers();
        setCareers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    loadCareers();
  }, []);

  const stats = useMemo(() => {
    const courseCount = careers.length;
    const skillEstimate = courseCount * 3;
    const advancedCount = careers.filter((career) => career.level === "Advanced").length;

    return { courseCount, skillEstimate, advancedCount };
  }, [careers]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h3>Loading teaching workspace...</h3>
        <p className="muted-copy">Pulling your published tracks and course overview.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-loading">
        <h3 style={{ color: "var(--warn)" }}>{error}</h3>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="dashboard-grid">
        <section className="dashboard-hero">
          <div className="dashboard-panel">
            <span className="section-kicker">Teacher dashboard</span>
            <h1 className="dashboard-hero-title">Your course catalog is back online.</h1>
            <p className="muted-copy" style={{ maxWidth: "58ch", fontSize: "1.04rem" }}>
              Publish new tracks, review what students can enroll in, and keep the roadmap library organized.
            </p>
            <div className="dashboard-actions" style={{ marginTop: "24px" }}>
              <Link to="/create-course" className="primary-btn">
                Create Course
              </Link>
              <Link to="/careers" className="secondary-btn">
                Preview Student View
              </Link>
            </div>
          </div>

          <div className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <p className="mini-note">Published tracks</p>
              <div className="dashboard-stat-value">{stats.courseCount}</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                Courses students can add right now.
              </p>
            </div>
            <div className="dashboard-stat-card">
              <p className="mini-note">Advanced tracks</p>
              <div className="dashboard-stat-value">{stats.advancedCount}</div>
              <p className="muted-copy" style={{ marginTop: "8px", marginBottom: 0 }}>
                Higher-difficulty paths in the catalog.
              </p>
            </div>
          </div>
        </section>

        <section className="teacher-grid">
          <article className="teacher-card">
            <span className="eyebrow-note">Catalog health</span>
            <h2 style={{ margin: "12px 0 10px" }}>Keep the learning ladder balanced</h2>
            <p className="muted-copy">
              Aim for a spread of beginner, intermediate, and advanced tracks so students can grow without hitting a dead end.
            </p>
            <div className="teacher-card-actions" style={{ marginTop: "18px" }}>
              <Link to="/create-course" className="secondary-btn">
                Add Another Track
              </Link>
            </div>
          </article>

          <article className="teacher-card">
            <span className="eyebrow-note">Quick read</span>
            <h2 style={{ margin: "12px 0 10px" }}>Estimated roadmap volume</h2>
            <strong className="dashboard-stat-value">{stats.skillEstimate}+</strong>
            <p className="muted-copy" style={{ marginBottom: 0 }}>
              A rough signal based on your current course count. Publish detailed skill steps from the course builder to make each path useful immediately.
            </p>
          </article>
        </section>

        <section className="dashboard-list-card">
          <div className="track-card-header">
            <div>
              <span className="section-kicker">Published courses</span>
              <h2 style={{ margin: "14px 0 0" }}>What students can browse</h2>
            </div>
          </div>

          {careers.length === 0 ? (
            <div className="dashboard-empty-card" style={{ boxShadow: "none" }}>
              <h3>No courses yet</h3>
              <p className="muted-copy">Create your first course to restore the teacher flow.</p>
            </div>
          ) : (
            <div className="careers-grid">
              {careers.map((career) => (
                <article key={career._id} className="career-card">
                  <span className="career-card-tag">{career.level || "Beginner"}</span>
                  <h3 className="career-card-title">{career.title}</h3>
                  <p className="career-card-desc">
                    {career.description || "No description has been added to this track yet."}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
