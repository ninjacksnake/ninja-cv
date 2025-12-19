import React from "react";
import "./minimalistResume.css";

const MinimalistResume = ({ resumeInfo }) => {
    if (!resumeInfo) {
        return (
            <div className="minimalist-resume-spinner">
                <p>Loading resume data...</p>
            </div>
        );
    }

    return (
        <div className="minimalist-resume-page">
            <div className="coming-soon-banner">
                <h2>Minimalist Design</h2>
                <p>This template is currently under development.</p>
                <p>Stay tuned for an ultra-clean design that focuses purely on content!</p>
            </div>
        </div>
    );
};

export default MinimalistResume;
