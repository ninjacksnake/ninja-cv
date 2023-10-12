import { pdfFromReact } from "generate-pdf-from-react-html";
import { Timeline, Button, Tooltip } from "antd";
import TimeLineSet from "../../components/TimeLineSet.jsx";
import ShowPills from "../../../../components/ShowPills.jsx";
import ElementList from "../../components/ElementList.jsx";
import "./modernResume.css";
import { FileSearchOutlined, RedoOutlined } from "@ant-design/icons";
import Spinner from "../../../../components/Spinner.jsx";

const Modern = ({ resumeInfo }) => {
  return (
    <>
      {!resumeInfo ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="resume-left-bar">
            <Button
              title="Generate and preview"
              className="generate-button"
              onClick={() =>
                pdfFromReact(".resume", "my-resume", "p", true, true)
              }
              icon={<FileSearchOutlined />}
            >
              Generate
            </Button>
          </div>
          <div className="resume">
            <div className="resume-header">
              <h1>
                {resumeInfo.profile.name} {resumeInfo.profile.lastName}
              </h1>
            </div>
            <div className="resume-body">
              <div className="body-row">
                <div className="column-left">
                  <div className="about-me-box">
                    <h3>About me</h3>
                    <article>{resumeInfo.profile.aboutMe}</article>
                  </div>
                </div>
                <div className="column-right">
                  <h3>Info</h3>
                  <div className="basic-info-list">
                    <ul>
                      <li>
                        <b>Phone:</b> {resumeInfo.profile.phone}
                      </li>
                      <li>
                        <b>Email:</b> {resumeInfo.profile.email}
                      </li>
                      <li>
                        <b>Address:</b> {resumeInfo.profile.city},{" "}
                        {resumeInfo.profile.country}
                      </li>
                      <li>
                        <b>Portfolio:</b> {resumeInfo.profile.portafolio}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="body-row">
                <div className="education-section-box">
                  <div className="column-left">
                    <h3 className="section-title">Education</h3>
                    <hr className="section-title-hr-left" />
                    <div className="timeline-container">
                      <Timeline
                        items={resumeInfo.educations.map((entity) => {
                          return {
                            children: (
                              <TimeLineSet
                                key={entity.id}
                                info={{
                                  title: entity.educationType,
                                  institution: entity.institution,
                                  startDate: entity.startDate,
                                  endDate: entity.endDate,
                                  description: entity.description,
                                  status: entity.status,
                                }}
                              />
                            ),
                          };
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="skill-section-box">
                  <div className="column-right">
                    <h2>Skills</h2>
                    <hr className="section-title-hr-right" />
                    <ShowPills
                      elements={resumeInfo.profile.skills.map((skill) => {
                        return skill.name;
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="body-row">
                <div className="column-left">
                  <div className="experience-section-box">
                    <h3 className="section-title">Experience</h3>
                    <hr className="section-title-hr-left" />
                    <div className="timeline-container">
                      {
                        <Timeline
                          items={resumeInfo.jobs.map((entity) => {
                            return {
                              children: (
                                <TimeLineSet
                                  key={entity.id}
                                  info={{
                                    title: entity.company,
                                    institution: entity.institution,
                                    startDate: entity.startDate,
                                    endDate: entity.endDate,
                                    description: entity.description,
                                    status: entity.status,
                                  }}
                                />
                              ),
                            };
                          })}
                        />
                      }
                    </div>
                  </div>
                </div>

                <div className="project-section-box">
                  <div className="column-right">
                    <h2>Projects</h2>
                    <hr className="section-title-hr-right" />
                    <ElementList
                      elements={resumeInfo.projects.map((entity) => {
                        return {
                          name: entity.name,
                          description: entity.description,
                          startDate: entity.startDate,
                          endDate: entity.endDate,
                          url: entity.url,
                        };
                      })}
                    />
                  </div>
                  {/* column right */}
                </div>
                {/* section box */}
              </div>
              {/* body row */}
            </div>
            {/* resume body */}
          </div>
          {/* resume */}
        </>
      )}
    </>
  );
};

export default Modern;
