import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import defaultPdf from "../../../pdf/CV.pdf";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import "./resumePreviewer.css";
import ResumeGenerator from "./ResumeGenerator";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts",
};

const ResumePreViewer = () => {
  const [file, setFile] = useState(defaultPdf);
  const [numPages, setNumPages] = useState(1);
  const [showPages, setShowPages] = useState(1);
  const [zoom, setZoom] = useState(1.5);

  function onFileChange(e) {
    console.log(e.target);
    const selectedFilefile = e.target.files[0];
    if (selectedFilefile) {
      setFile(selectedFilefile);
    }
  }

  function onLoadedComplete(pages) {
    setNumPages(pages.numPages);
    // console.log(pages.numPages)
  }
  function handleNextPage(params) {
    if (showPages + 1 <= numPages) {
      setShowPages(showPages + 1);
    }
  }
  function handlePrevPage(params) {
    if (showPages - 1 >= 1) {
      setShowPages(showPages - 1);
    }
  }

  function increaseZoom(params) {
    if (zoom < 3) {
      setZoom(zoom + 0.2);
    }
  }
  function decreaseZoom(params) {
    if (zoom > 0.5) {
      setZoom(zoom - 0.2);
    }
  }

  return (
   // <div className="resume-previewer-container">
      {/* <label htmlFor="file">Choose a file</label>"
      <input type="file" id="file" onChange={onFileChange} /> */}
      <div className="resume-generator-container">
        <ResumeGenerator />
      </div>
      {/* <div className="pdf-container">
        <div className="navigation-buttons-container">
          <Tooltip title="Go back to the previous page" color="geekblue" className="navi-Icon">
            <CaretLeftOutlined
              onClick={handlePrevPage}
              style={{ fontSize: "25px", color: "#08c" }}
            />
          </Tooltip>
          <Tooltip title="Decrease the zoom " color="geekblue" className="navi-Icon">
            <ZoomOutOutlined
              onClick={decreaseZoom}
              style={{ fontSize: "25px", color: "#08c" }}
            />
          </Tooltip>
          <div className="page-number-container">
            <p className="page-number">
              Page {showPages} of {numPages}
            </p>
          </div>

          <Tooltip title="Increase the zoom " color="geekblue" className="navi-Icon">
            <ZoomInOutlined
              onClick={increaseZoom}
              style={{ fontSize: "25px", color: "#08c" }}
            />
          </Tooltip>
          <Tooltip title="Go to the next page" color="geekblue" className="navi-Icon">
            <CaretRightOutlined
              onClick={handleNextPage}
              style={{ fontSize: "25px", color: "#08c" }}
            />
          </Tooltip>
        </div>
        <Document
          file={file}
          options={options}
          onLoadSuccess={onLoadedComplete}
        >
          <Page pageNumber={showPages} scale={zoom} />
        </Document> 
      </div> */}
   // </div>
  );
};

export default ResumePreViewer;
