import React from "react";
import "./settings.css";
import { Card, Form, Input, Button, Space, message } from "antd";

const { TextArea } = Input;

const Settings = () => {
  const [skillForm] = Form.useForm();

  
//save a new skill
const submit = (formValues) => {
  console.log(formValues);
  message.info("Skill Saved Successfully");
};

// remove a skill
const remove = (skillId) => {
  console.log(skillForm.getFieldsValue());
  message.warning("Skill Deleted Successfully");
};

// find a skill
const findSkill =  () => {
    skillForm.validateFields();
   const skill =  skillForm.getFieldsValue();
    
 
  console.log(skill)
  
  message.info("Searching for a skill");
};

const InLineLayout = {
  wrapperCol: { span: 20, offset: 0 },
};

  return (
    <>
      <div className="settings-container">
        <div className="soft-card">
          <Form form={skillForm} name="skills-form" onFinish={submit}>
            <Card title="Skills">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true }]}
                {...InLineLayout}
              >
                <div className="inLine">
                  <Input />
                  <Button children={"Find"} onClick={findSkill} />
                </div>
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item>
                <Space wrap>
                  <Button danger type="primary" onClick={remove}>
                    Delete Skill
                  </Button>
                  <Button type="primary" htmlType="submit" onClick={submit}>
                    Save Skill
                  </Button>
                </Space>
              </Form.Item>
            </Card>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Settings;
