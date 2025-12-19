import React from "react";

const SleekResume = ({ resumeInfo }) => {
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
      <div>SleekResume - Coming Soon</div>
      {/* TODO: Implement sleek resume template */}
    </div>
  );
};

export default SleekResume;
