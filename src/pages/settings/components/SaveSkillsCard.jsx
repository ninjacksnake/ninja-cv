import React from "react";
import { Form, Input, Button, Space, message } from "antd";
import SkillsService from "./../../../services/SkillsService";
import "./skillsCard.css";

const { TextArea } = Input;

const SaveSkillsCard = ({ token, loggedUser }) => {
  const [skillForm] = Form.useForm();

  //save a new skill
  const submit = (formValues) => {
    // console.log(formValues);
    SkillsService.create({ token: token, loggedUser: loggedUser, skill: formValues })
      .then((savedSkill) => {
        // console.log(savedSkill)
        message.success("New skill saved successfully");
        skillForm.resetFields();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div className="save-skills-card-container">
      <div className="save-skills-card">
        <h3>Create New Skill</h3>
        <p className="card-subtitle">Define a new global skill that can be added to profiles.</p>

        <Form
          form={skillForm}
          name="skills-form"
          onFinish={submit}
          layout="vertical"
          className="skills-form"
        >
          <Form.Item
            name="name"
            label="Skill Name"
            rules={[{ required: true, message: "Please enter a skill name" }]}
          >
            <Input placeholder="e.g. React, Python, Project Management" />
          </Form.Item>

          <Form.Item name="description" label="Description (Optional)">
            <TextArea rows={3} placeholder="Brief description of this skill..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Save Skill
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SaveSkillsCard;
