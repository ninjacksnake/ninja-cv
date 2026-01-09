import "./modernResume.css";
import Spinner from "../../../../components/Spinner.jsx";
import {
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Modern = ({ resumeInfo }) => {
  return (
    <>
      {!resumeInfo ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="modern-resume-page">
          <header className="modern-resume-header">
            <div className="modern-header-container">
              {resumeInfo.profile?.photo && (
                <div className="modern-photo-container">
                  <img
                    src={resumeInfo.profile.photo}
                    alt={`${resumeInfo.profile?.name} ${resumeInfo.profile?.lastName}`}
                    className="modern-profile-photo"
                  />
                </div>
              )}
              <div className="modern-header-info">
                <h1 className="modern-resume-name">
                  {resumeInfo.profile?.name || ""} {resumeInfo.profile?.lastName || ""}
                </h1>
                {resumeInfo.profile?.role && (
                  <p className="modern-resume-role">{resumeInfo.profile.role}</p>
                )}
              </div>
            </div>
          </header>

          <div className="modern-resume-body">
            <aside className="modern-resume-sidebar">
              <div className="modern-sidebar-section">
                <h3 className="modern-sidebar-title">Contact</h3>
                <ul className="modern-contact-list">
                  {resumeInfo.profile?.phone && (
                    <li>
                      <PhoneOutlined className="icon-svg" />
                      <span className="text">{resumeInfo.profile.phone}</span>
                    </li>
                  )}
                  {(resumeInfo.profile?.email || resumeInfo.profile?.contact) && (
                    <li>
                      <MailOutlined className="icon-svg" />
                      <span className="text">
                        {resumeInfo.profile.email || resumeInfo.profile.contact}
                      </span>
                    </li>
                  )}
                  {(resumeInfo.profile?.city || resumeInfo.profile?.country) && (
                    <li>
                      <EnvironmentOutlined className="icon-svg" />
                      <span className="text">
                        {resumeInfo.profile.city}
                        {resumeInfo.profile.city && resumeInfo.profile.country
                          ? ", "
                          : ""}
                        {resumeInfo.profile.country}
                      </span>
                    </li>
                  )}
                  {resumeInfo.profile?.portafolio && (
                    <li>
                      <GlobalOutlined className="icon-svg" />
                      <a href={resumeInfo.profile.portafolio} target="_blank" rel="noreferrer" className="text link">
                        Portfolio
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {resumeInfo.profile?.skills?.length > 0 && (
                <div className="modern-sidebar-section">
                  <h3 className="modern-sidebar-title">Skills</h3>
                  <div className="modern-skills-wrapper">
                    {resumeInfo.profile.skills.map((skill, index) => (
                      <span key={index} className="modern-skill-tag">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            <main className="modern-resume-content">
              <section className="modern-section">
                <h2 className="modern-section-title">About Me</h2>
                <p className="modern-text-content">
                  {resumeInfo.profile?.aboutMe || "No description available"}
                </p>
              </section>

              <section className="modern-section">
                <h2 className="modern-section-title">Experience</h2>
                {resumeInfo.jobs?.length > 0 ? (
                  <div className="modern-timeline">
                    {resumeInfo.jobs.map((job) => (
                      <div key={job.id} className="modern-timeline-item">
                        <div className="modern-timeline-header">
                          <h3 className="modern-item-title">{job.company}</h3>
                          <span className="modern-date-range">
                            {new Date(job.startDate).toLocaleDateString(undefined, {
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            -{" "}
                            {new Date(job.endDate).toLocaleDateString(undefined, {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h4 className="modern-item-subtitle">{job.institution}</h4>
                        <p className="modern-item-description">{job.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="modern-no-data">No work experience available</div>
                )}
              </section>

              <section className="modern-section">
                <h2 className="modern-section-title">Education</h2>
                {resumeInfo.educations?.length > 0 ? (
                  <div className="modern-timeline">
                    {resumeInfo.educations.map((edu) => (
                      <div key={edu.id} className="modern-timeline-item">
                        <div className="modern-timeline-header">
                          <h3 className="modern-item-title">{edu.institution}</h3>
                          <span className="modern-date-range">
                            {new Date(edu.startDate).toLocaleDateString(undefined, {
                              month: "short",
                              year: "numeric",
                            })}{" "}
                            -{" "}
                            {new Date(edu.endDate).toLocaleDateString(undefined, {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h4 className="modern-item-subtitle">{edu.educationType}</h4>
                        <p className="modern-item-description">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="modern-no-data">
                    No education information available
                  </div>
                )}
              </section>

              <section className="modern-section">
                <h2 className="modern-section-title">Projects</h2>
                {resumeInfo.projects?.length > 0 ? (
                  <div className="modern-grid-list">
                    {resumeInfo.projects.map((project) => (
                      <div
                        key={project.id || project.name}
                        className="modern-grid-item"
                      >
                        <div className="modern-timeline-header">
                          <h3 className="modern-item-title">{project.name}</h3>
                          {project.url && (
                            <a
                              href={project.url}
                              className="modern-project-link"
                              target="_blank"
                              rel="noreferrer"
                            >
                              View Project ↗
                            </a>
                          )}
                        </div>
                        <p className="modern-item-description">
                          {project.description}
                        </p>
                        <span className="modern-date-range-sm">
                          {new Date(project.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="modern-no-data">No projects available</div>
                )}
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Modern;
