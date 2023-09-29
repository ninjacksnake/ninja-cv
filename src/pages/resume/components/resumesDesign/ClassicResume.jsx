import React from "react";
import "./classicResume.css";
import { FileSearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { pdfFromReact } from "generate-pdf-from-react-html";
const ClassicResume = ({ resumeInfo }) => {
  return (
    <>
      <div className="resume-left-bar">
        <Button
          title="Generate and preview"
          className="generate-button"
          onClick={() => pdfFromReact(".cv-card", "my-resume", "p", true, true)}
          icon={<FileSearchOutlined />}
        >
          Generate
        </Button>
      </div>
      <div className="cv-card">
        <div>ClassicResume</div>
      </div>
    </>
  );
};

export default ClassicResume;
