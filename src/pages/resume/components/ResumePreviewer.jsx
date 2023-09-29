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
  const [zoom, setZoom] = useState(0.5);

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
 <>
<div className="left-space"></div>  
      <div className="resume-generator-container">
        <ResumeGenerator />
      </div>
<div className="right-space"></div>
 </>
  );
};

export default ResumePreViewer;
