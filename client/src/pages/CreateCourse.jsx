import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createCareer, createSkill } from "../services/api";

const emptySkill = (order) => ({
  title: "",
  description: "",
  resourceTitle: "",
  resourceUrl: "",
  order,
});

function CreateCourse() {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    level: "Beginner",
  });
  const [skills, setSkills] = useState([emptySkill(1), emptySkill(2), emptySkill(3)]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setCourse((current) => ({ ...current, [name]: value }));
  };

  const handleSkillChange = (index, field, value) => {
    setSkills((current) =>
      current.map((skill, skillIndex) =>
        skillIndex === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const addSkillRow = () => {
    setSkills((current) => [...current, emptySkill(current.length + 1)]);
  };

  const removeSkillRow = (index) => {
    setSkills((current) =>
      current
        .filter((_, skillIndex) => skillIndex !== index)
        .map((skill, skillIndex) => ({ ...skill, order: skillIndex + 1 }))
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const preparedSkills = skills
        .map((skill, index) => ({
          ...skill,
          order: index + 1,
          title: skill.title.trim(),
          description: skill.description.trim(),
          resourceTitle: skill.resourceTitle.trim(),
          resourceUrl: skill.resourceUrl.trim(),
        }))
        .filter((skill) => skill.title);

      if (!course.title.trim()) {
        throw new Error("Course title is required.");
      }

      if (preparedSkills.length === 0) {
        throw new Error("Add at least one skill before publishing the course.");
      }

      const createdCareer = await createCareer({
        title: course.title.trim(),
        description: course.description.trim(),
        level: course.level,
      });

      await Promise.all(
        preparedSkills.map((skill) =>
          createSkill({
            career: createdCareer._id,
            title: skill.title,
            description: skill.description,
            order: skill.order,
            resources: skill.resourceUrl
              ? [{ title: skill.resourceTitle || skill.title, url: skill.resourceUrl }]
              : [],
          })
        )
      );

      setMessage("Course created successfully.");
      setCourse({ title: "", description: "", level: "Beginner" });
      setSkills([emptySkill(1), emptySkill(2), emptySkill(3)]);
      setTimeout(() => navigate("/teacher-dashboard"), 900);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to create course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <span className="section-kicker">Teacher studio</span>
          <h1 className="dashboard-hero-title">Build a course that students can start immediately.</h1>
          <p className="muted-copy" style={{ maxWidth: "60ch", marginTop: "14px" }}>
            Create the learning track, map the skills in order, and attach a resource when you have one.
          </p>
          <div className="hero-actions" style={{ marginTop: "22px" }}>
            <Link to="/teacher-dashboard" className="secondary-btn">
              Back to dashboard
            </Link>
          </div>
        </section>

        <form className="course-builder" onSubmit={handleSubmit}>
          <section className="course-section">
            <span className="eyebrow-note">Course details</span>
            <div className="course-grid" style={{ marginTop: "18px" }}>
              <div className="course-field">
                <label className="course-label" htmlFor="course-title">Course title</label>
                <input
                  id="course-title"
                  name="title"
                  className="course-input"
                  value={course.title}
                  onChange={handleCourseChange}
                  placeholder="Frontend Developer"
                  required
                />
              </div>

              <div className="course-field">
                <label className="course-label" htmlFor="course-level">Level</label>
                <select
                  id="course-level"
                  name="level"
                  className="course-select"
                  value={course.level}
                  onChange={handleCourseChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="course-field full">
                <label className="course-label" htmlFor="course-description">Description</label>
                <textarea
                  id="course-description"
                  name="description"
                  className="course-textarea"
                  value={course.description}
                  onChange={handleCourseChange}
                  placeholder="Explain what students will learn and why this track matters."
                />
              </div>
            </div>
          </section>

          <section className="course-section">
            <div className="track-card-header">
              <div>
                <span className="eyebrow-note">Skill roadmap</span>
                <h2 style={{ marginTop: "10px" }}>Sequence the learning steps</h2>
              </div>
              <button type="button" className="secondary-btn" onClick={addSkillRow}>
                Add skill
              </button>
            </div>

            <div className="skill-builder-list">
              {skills.map((skill, index) => (
                <div className="skill-builder-row" key={`skill-${index}`}>
                  <div className="skill-builder-number">{index + 1}</div>

                  <div className="course-grid">
                    <div className="course-field">
                      <label className="course-label" htmlFor={`skill-title-${index}`}>Skill title</label>
                      <input
                        id={`skill-title-${index}`}
                        className="course-input"
                        value={skill.title}
                        onChange={(event) => handleSkillChange(index, "title", event.target.value)}
                        placeholder="HTML foundations"
                      />
                    </div>

                    <div className="course-field">
                      <label className="course-label" htmlFor={`skill-resource-title-${index}`}>Resource name</label>
                      <input
                        id={`skill-resource-title-${index}`}
                        className="course-input"
                        value={skill.resourceTitle}
                        onChange={(event) => handleSkillChange(index, "resourceTitle", event.target.value)}
                        placeholder="MDN guide"
                      />
                    </div>

                    <div className="course-field full">
                      <label className="course-label" htmlFor={`skill-description-${index}`}>Skill description</label>
                      <textarea
                        id={`skill-description-${index}`}
                        className="course-textarea"
                        value={skill.description}
                        onChange={(event) => handleSkillChange(index, "description", event.target.value)}
                        placeholder="Describe what this step should cover."
                      />
                    </div>

                    <div className="course-field full">
                      <label className="course-label" htmlFor={`skill-resource-url-${index}`}>Resource URL</label>
                      <input
                        id={`skill-resource-url-${index}`}
                        className="course-input"
                        value={skill.resourceUrl}
                        onChange={(event) => handleSkillChange(index, "resourceUrl", event.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => removeSkillRow(index)}
                    disabled={skills.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {(error || message) && (
            <p className="auth-error" style={message ? { color: "var(--accent)", background: "var(--accent-soft)" } : undefined}>
              {error || message}
            </p>
          )}

          <div className="course-submit-row">
            <p className="mini-note">Students will be able to add this track from the careers page after publishing.</p>
            <button type="submit" className="primary-btn" disabled={submitting}>
              {submitting ? "Creating..." : "Publish course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
