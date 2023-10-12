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
  const [selectedSkills, setSelectedSkills] = useState([]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const changeSkills = (skill) => {
    if (!skills.includes(skill)) {
         setSelectedSkills((x) => skill);
    }
  };

  const deleteSkill = (index) => {
    setProfileSkills(profileSkills.filter((x, i) => i !== index));
    ProfileService.update(loggedUser.userId, token, {
      skills: profileSkills.filter((x, i) => i !== index),
    });
  };

  useEffect(() => {
    checkTokenExpiration();
    //get the skills of the logged user
    ProfileService.find({ token: token, loggedUser: loggedUser })
      .then((foundProfile) => {
        const fSkills = foundProfile.profile.skills.map((skill) => {
          return skill.name;
        });
        // console.log(fSkills);
        setProfileSkills((x) => fSkills);
        setSelectedSkills((x)=> fSkills)
      })
      .catch((error) => {
        console.log(error);
      });

    //get all the skills available
    SkillsService.find({ token: token, loggedUser: loggedUser })
      .then((foundSkills) => {
        setSkills(foundSkills);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitForm = (values) => {
    const newSkills = values.skills.map((skill) => {
      return { name: skill };
    });
    ProfileService.update(loggedUser.userId, token, { skills: newSkills });
  };

  return (
    <>
      {selectedSkills.length > 0 ? (
        <SkillsViewer skills={selectedSkills} deleteSkill={deleteSkill} />
      ) : (
        <Empty />
      )}
      <br />
      {selectedSkills.length > 0 ? (
        <Form
          {...layout}
          initialValues={{ skills: selectedSkills }}
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
              options={skills.map((skill) => {
                return { label: skill.name, value: skill.name };
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default SkillsForm;
