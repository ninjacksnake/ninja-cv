import { useEffect, useState } from "react";
import "./skillsForm.css";
import { Button, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import SkillsViewer from "./SkillsViewer.jsx";

const SkillsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = useForm();
  const [skills, setSkills] = useState(["HTML", "JavaScript", "React"]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const deleteSkill = (skillIndex) => {
    console.log(skillIndex);
    setSkills(skills.filter((skill, index) => index !== skillIndex));
  };

  useEffect(() => {
    checkTokenExpiration();
    //get the skills of the logged user
  }, []);

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <>
      <SkillsViewer skills={skills} deleteSkill={deleteSkill} />
      <br />
      <Form
        {...layout}
        style={{ maxWidth: 600 }}
        form={form}
        onFinish={submitForm}
      >
        <Form.Item name="skills">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select skills"
            onChange={(value) => console.log(value)}
            options={[
              { label: "HTML", value: "HTML" },
              { label: "CSS", value: "CSS" },
              { label: "JavaScript", value: "JavaScript" },
              { label: "React", value: "React" },
              { label: "Node.js", value: "Node.js" },
              { label: "Express", value: "Express" },
              { label: "MongoDB", value: "mongo" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SkillsForm;
