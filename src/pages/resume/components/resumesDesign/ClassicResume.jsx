import React from "react";
import "./classicResume.css";

const ClassicResume = ({ resumeInfo }) => {
  if (!resumeInfo) {
    return (
      <div className="cv-card">
        <div className="loading-placeholder">
          <p>Loading resume data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-card">
      <div>ClassicResume - Coming Soon</div>
      {/* TODO: Implement classic resume template */}
    </div>
  );
};

export default ClassicResume;
