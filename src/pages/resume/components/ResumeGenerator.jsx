import { pdfFromReact } from "generate-pdf-from-react-html";
import "./resumeGenerator.css";
function transform(element) {
  pdfFromReact(element, "my-file", "p", true, true);
}

const ResumeGenerator = () => {
  return (
    <>
      <div className="resume">
        <div className="resume-header">
          <div className="resume-header-name">
            <h1>Michael Fermin</h1>
          </div>
        </div>
        <div className="resume-body">
        <div className="contact-info">
          <h3>Contact</h3>
          <ul>
              <li>Address : aaaaaaaa</li>
              <li>Email : aaaaaaaa</li>
              <li> GitHub: aaaaaaaa</li>
          </ul>
          </div>     
        </div>
      </div>
      <button onClick={() => transform(".resume")}> Generate</button>
    </>
  );
};

export default ResumeGenerator;
