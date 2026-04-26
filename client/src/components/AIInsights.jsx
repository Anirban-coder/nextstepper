import { useEffect, useState } from "react";
import { getAIInsights } from "../services/api";

function AIInsights() {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsight = async () => {
      try {
        const response = await getAIInsights();
        const message =
          response?.insight ||
          response?.message ||
          response?.summary ||
          response?.data?.insight ||
          "";
        setInsight(message);
      } catch (error) {
        setInsight("");
      } finally {
        setLoading(false);
      }
    };

    loadInsight();
  }, []);

  return (
    <section className="ai-card">
      <div className="ai-card-header">
        <div>
          <span className="section-kicker">AI guidance</span>
          <h2 style={{ margin: "14px 0 0" }}>A quick read on your current momentum</h2>
        </div>
      </div>

      <div className="ai-insight-body">
        {loading ? (
          <p className="muted-copy">Generating a fresh learning insight...</p>
        ) : insight ? (
          <p className="muted-copy" style={{ marginBottom: 0 }}>{insight}</p>
        ) : (
          <>
            <p className="muted-copy">
              Your dashboard is ready, but AI insight text is unavailable right now.
            </p>
            <p className="mini-note">
              The app will still work normally while the insight service is missing or offline.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default AIInsights;
