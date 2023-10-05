import { Badge } from "antd";
import "./showPills.css";

const ShowPills = ({ elements, deleteSkill, editable = false }) => {
  return (
    <div className="show-pills-container">
      {elements.map((element, index) => (
        editable ? (
        <div key={"pill" + index} className="pill-container">
          {element}
          {/* <div className="close-button" onClick={() => deleteSkill(index)}>
            x
          </div> */}
        </div>
        ):<Badge  count={element} key={"pill" + index} className="pill-badge"   style={ {backgroundColor: "#b6babe", color: "black",  fontSize: "12px"
      	 }}
      />
      
      ))}
    </div>
  );
};

export default ShowPills;
