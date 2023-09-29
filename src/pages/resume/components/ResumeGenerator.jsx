"generate-pdf-from-react-html";
import "./resumeGenerator.css";
import { Drawer } from "antd";
import { Button } from "antd";
import { DiffOutlined } from "@ant-design/icons";
import { useState } from "react";
import BasicResume from "./resumesDesign/BasicResume";
import Modern from "./resumesDesign/ModernResume";
import SleekResume from "./resumesDesign/SleekResume";
import ClassicResume from "./resumesDesign/ClassicResume";
import DesignCard from "./DesignCard";

const ResumeGenerator = ({ resumeInfo }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);

  const resumeOBj = [
    {
      name: "basic",
      title: "Basic",
      description: "Basic Resume",
      component: (info) => <BasicResume resumeInfo={info} />,
    },
    {
      name: "modern",
      title: "Modern",
      description: "Basic Resume",
      component: (info) => <Modern resumeInfo={info} />,
    },
    {
      name: "sleek",
      title: "Sleek",
      description: "Basic Resume",
      component: (info) => <SleekResume resumeInfo={info} />,
    },
    {
      name: "classic",
      title: "Classic",
      description: "Basic Resume",
      component: (info) => <ClassicResume resumeInfo={info} />,
    },
  ];

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const handleClickDesignCard = (index) => {
    console.log(index);
    setSelectedDesignIndex(index);
  };

  return (
    <>
      <Drawer
        placement="left"
        closable="true"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        title="Change the resume design"
      >
        {resumeOBj.map((item, index) => (
          <DesignCard
            key={index}
            designInfo={item}
            index={index}
            handleClickDesignCard={handleClickDesignCard}
          />
        ))}
      </Drawer>
      {/* drawer */}

      { resumeOBj[selectedDesignIndex].component ? resumeOBj[selectedDesignIndex].component(resumeInfo)  : "loading..."}

      <div className="generate-buttom">
        <Button onClick={toggleDrawer} icon={<DiffOutlined />}>
       
          Change Design
        </Button>
      </div>
    </>
  );
};

export default ResumeGenerator;
