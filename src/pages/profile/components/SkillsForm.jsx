import { useEffect, useState } from "react";
import "./skillsForm.css";
import { Button, Empty, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import SkillsViewer from "./SkillsViewer.jsx";
import SkillsService from "./../../../services/SkillsService";
import ProfileService from "./../../../services/ProfileService";

const SkillsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = useForm();
  const [skills, setSkills] = useState([]);
  const [profileSkills, setProfileSkills] = useState([]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const changeSkills = (skill) => {
    //  console.log(skill);
    if (!skills.includes(skill)) {
      setSkills((x) => skill);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    //get the skills of the logged user
    ProfileService.find({ token: token, loggedUser: loggedUser })
      .then((foundProfile) => {})
      .catch((error) => {
        console.log(error);
      });
    //get all the skills available
    SkillsService.find({ token: token, loggedUser: loggedUser })
      .then((foundSkills) => {
        if (foundSkills) {
          console.log(skills);
          setSkills((x) => foundSkills);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <>
      {skills ? <SkillsViewer skills={skills} /> : <Empty />}
      <br />

      <Form
        {...layout}
        initialValues={{ skills }}
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
            onChange={(skills) => changeSkills(skills)}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SkillsForm;
