import { Card, Typography, Button } from "antd";
import { pdfFromReact } from "generate-pdf-from-react-html";

import "./basicResume.css"; // Import your custom CSS for styling
import { FileSearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BasicResume = ({ resumeInfo }) => {
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
      <Card className="cv-card">
        <div className="cv-header">
          <Title level={2}>John Doe</Title>
          <Text>Web Developer</Text>
        </div>

        <div className="cv-section">
          <Title level={4}>Contact Information</Title>
          <Text>Email: john@example.com</Text>
          <Text>Phone: (123) 456-7890</Text>
          <Text>LinkedIn: linkedin.com/in/johndoe</Text>
        </div>

        <div className="cv-section">
          <Title level={4}>Education</Title>
          <Text>Bachelor of Science in Computer Science</Text>
          <Text>University Name, City, State</Text>
          <Text>Month Year - Month Year</Text>
        </div>

        <div className="cv-section">
          <Title level={4}>Skills</Title>
          <ul>
            <li>HTML5, CSS3, JavaScript</li>
            <li>React, Redux</li>
            <li>Ant Design</li>
            <li>Responsive Web Design</li>
            <li>Git, GitHub</li>
          </ul>
        </div>

        <div className="cv-section">
          <Title level={4}>Professional Experience</Title>
          <div className="cv-job">
            <Title level={5}>Senior Web Developer</Title>
            <Text>Company Name, City, State</Text>
            <Text>Month Year - Present</Text>
            <ul>
              <li>
                Developed and maintained web applications using React and Ant
                Design.
              </li>
              <li>
                Collaborated with cross-functional teams to deliver high-quality
                software.
              </li>
              <li>Implemented responsive and accessible UI components.</li>
            </ul>
          </div>

          {/* Add more job entries as needed */}
        </div>

        {/* Add more sections like projects, certifications, languages, etc., as needed */}
      </Card>
    </>
  );
};

export default BasicResume;
