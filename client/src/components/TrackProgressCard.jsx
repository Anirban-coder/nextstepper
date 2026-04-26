import { useState } from "react";
import ProgressBar from "./ProgressBar";
import SkillCard from "./SkillCard";

function TrackProgressCard({ track, onSkillUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const title = track?.career?.title || "Untitled track";
  const description = track?.career?.description || "No description available for this track yet.";
  const skills = Array.isArray(track?.skills) ? track.skills : [];

  const totalSkills = skills.length;
  const completedSkills = skills.filter((skill) => skill.status === "Completed").length;
  const completion = totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

  return (
    <article className="track-card">
      <div className="track-card-header">
        <div>
          <h3 className="track-card-title">{title}</h3>
          <p className="track-card-subtitle">{description}</p>
        </div>

        <div className="track-progress-wrap">
          <ProgressBar percentage={completion} />
        </div>
      </div>

      <button
        type="button"
        className="track-card-toggle"
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Hide skills" : "View skills"}
      </button>

      {expanded && (
        <div className="track-card-skills">
          {skills.length === 0 ? (
            <p className="mini-note">No skills have been added to this track yet.</p>
          ) : (
            skills.map((skillProgress) => (
              <SkillCard
                key={skillProgress?.skill?._id || skillProgress?._id}
                careerId={track?.career?._id || track?.career}
                skillProgress={skillProgress}
                onUpdate={onSkillUpdate}
              />
            ))
          )}
        </div>
      )}
    </article>
  );
}

export default TrackProgressCard;
