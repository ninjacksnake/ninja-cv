import React from "react";
import { FileSearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { pdfFromReact } from "generate-pdf-from-react-html";

const SleekResume = ({ resumeInfo }) => {
  return (
    <>
      <div className="resume-left-bar">
        <Button
          title="Generate and preview"
          className="generate-button"
          onClick={() => pdfFromReact(".resume", "my-resume", "p", true, true)}
          icon={<FileSearchOutlined />}
        >
          Generate
        </Button>
      </div>
      <div className="cv-card">
        <div>SleekResume</div>
      </div>
    </>
  );
};

export default SleekResume;
