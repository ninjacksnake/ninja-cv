import "./basicResume.css";
import Spinner from "../../../../components/Spinner.jsx";

const BasicResume = ({ resumeInfo }) => {
  if (!resumeInfo) {
    return (
      <div className="basic-resume-spinner">
        <Spinner />
      </div>
    );
  }

  const { profile, educations, jobs, projects } = resumeInfo;

  // Helper to format contact info with separators
  const contactInfo = [
    profile?.phone,
    profile?.email || profile?.contact,
    [profile?.city, profile?.country].filter(Boolean).join(", "),
    profile?.portafolio
  ].filter(Boolean);

  return (
    <div className="basic-resume-page">
      {/* Header */}
      <header className="basic-resume-header">
        <h1 className="basic-resume-name">
          {profile?.name} {profile?.lastName}
        </h1>
        <div className="basic-resume-contact">
          {contactInfo.map((item, index) => (
            <span key={index}>
              {item}
              {index < contactInfo.length - 1 && <span className="separator">•</span>}
            </span>
          ))}
        </div>
        {profile?.aboutMe && (
          <p className="basic-resume-summary">{profile.aboutMe}</p>
        )}
      </header>

      {/* Education */}
      <section className="basic-resume-section">
        <h2 className="basic-section-title">EDUCATION</h2>
        {educations?.length > 0 ? (
          educations.map((edu, idx) => (
            <div key={idx} className="basic-resume-item">
              <div className="basic-item-header">
                <div className="basic-item-title-group">
                  <span className="basic-item-institution">{edu.institutionName}</span>
                  {(edu.degree || edu.educationType) && <span className="basic-item-comma">, </span>}
                  <span className="basic-item-degree">{edu.degree || edu.educationType}</span>
                </div>
                <div className="basic-item-date">
                  {edu.startDate && new Date(edu.startDate).toLocaleDateString(undefined, { year: 'numeric' })}
                  {edu.endDate && ` - ${new Date(edu.endDate).toLocaleDateString(undefined, { year: 'numeric' })}`}
                </div>
              </div>
              {edu.description && <p className="basic-item-description">{edu.description}</p>}
            </div>
          ))
        ) : (
          <p className="basic-item-description"><i>No education information listed</i></p>
        )}
      </section>

      {/* Experience */}
      <section className="basic-resume-section">
        <h2 className="basic-section-title">PROFESSIONAL EXPERIENCE</h2>
        {jobs?.length > 0 ? (
          jobs.map((job, idx) => (
            <div key={idx} className="basic-resume-item">
              <div className="basic-item-header">
                <div className="basic-item-title-group">
                  <span className="basic-item-company">{job.company}</span>
                  {job.position && <span className="basic-item-comma">, </span>}
                  <span className="basic-item-position">{job.position}</span>
                </div>
                <div className="basic-item-date">
                  {job.startDate && new Date(job.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                  {" - "}
                  {job.current ? "Present" : (job.endDate && new Date(job.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }))}
                </div>
              </div>
              {job.description && <p className="basic-item-description">{job.description}</p>}
            </div>
          ))
        ) : (
          <p className="basic-item-description"><i>No professional experience listed</i></p>
        )}
      </section>

      {/* Projects */}
      <section className="basic-resume-section">
        <h2 className="basic-section-title">PROJECTS</h2>
        {projects?.length > 0 ? (
          projects.map((proj, idx) => (
            <div key={idx} className="basic-resume-item">
              <div className="basic-item-header">
                <span className="basic-item-project-name">{proj.name}</span>
                {proj.startDate && (
                  <div className="basic-item-date">
                    {new Date(proj.startDate).toLocaleDateString(undefined, { year: 'numeric' })}
                  </div>
                )}
              </div>
              <p className="basic-item-description">{proj.description}</p>
            </div>
          ))
        ) : (
          <p className="basic-item-description"><i>No projects listed</i></p>
        )}
      </section>

      {/* Skills */}
      <section className="basic-resume-section">
        <h2 className="basic-section-title">SKILLS</h2>
        {profile?.skills?.length > 0 ? (
          <p className="basic-item-description">
            {profile.skills.map(skill => skill.name).join(", ")}
          </p>
        ) : (
          <p className="basic-item-description"><i>No skills listed</i></p>
        )}
      </section>

      {/* If completely empty sections, optionally show placeholders or just hide. 
           Classic resumes usually just hide empty sections. I will leave them hidden if empty for cleaner look
           unless user specifically asked to show placeholders, but previous request was about "missing topics" 
           because *everything* was hidden. Here I am conditionally rendering sections.
           To be safe and consistent with previous fix, let's keep them hidden if empty as per standard, 
           BUT if the user has NO data at all, they might see a blank page? 
           The 'BasicResume' usually behaves like a document. 
           I will stick to standard logic: if array > 0, show. 
       */}
    </div>
  );
};

export default BasicResume;
