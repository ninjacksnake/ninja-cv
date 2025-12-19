import React from "react";
import "./excutiveResume.css";

const ExecutiveResume = ({ resumeInfo }) => {
    if (!resumeInfo) {
        return (
            <div className="executive-resume-spinner">
                <p>Loading resume data...</p>
            </div>
        );
    }

    return (
        <div className="executive-resume-page">
            <div className="coming-soon-banner">
                <h2>Executive Design</h2>
                <p>This template is currently under development.</p>
                <p>Stay tuned for a high-impact design focused on achievements and leadership!</p>
            </div>
        </div>
    );
};

export default ExecutiveResume;
