import { Card, Empty } from "antd";
import "./skillsViewer.css";
import ShowPills from "../../../components/ShowPills";

const SkillsViewer = ({ skills, deleteSkill }) => {
  return <Card>{skills ? <ShowPills elements={skills} deleteSkill={deleteSkill} editable={true}/> : <Empty />}</Card>;
};

export default SkillsViewer;
