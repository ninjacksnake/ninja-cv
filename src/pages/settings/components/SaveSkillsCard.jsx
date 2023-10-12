import React from "react";
import { Card, Form, Input, Button, Space, message } from "antd";
import SkillsService from "./../../../services/SkillsService";

const { TextArea } = Input;
const SaveSkillsCard = ({ token, loggedUser }) => {
  const [skillForm] = Form.useForm();

  //save a new skill
  const submit = (formValues) => {
    // console.log(formValues);
    SkillsService.create({token:token, loggedUser:loggedUser,  skill:formValues})
      .then((savedSkill) => {
        // console.log(savedSkill)
        message.success("New skill saved successfully", savedSkill);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const InLineLayout = {
    wrapperCol: { span: 20, offset: 0 },
  };
  return (
    <>
      <div className="soft-card">
        <Form form={skillForm} name="skills-form" onFinish={submit}>
          <Card title="Create a new Skills">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true }]}
              {...InLineLayout}
            >
              <div className="inLine">
                <Input />
                {/* <Button children={"Find"} onClick={findSkill} /> */}
              </div>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item>
              <Space wrap>
                {/* <Button danger type="primary" onClick={remove}>
                  Delete Skill
                </Button> */}
                <Button type="primary" htmlType="submit" onClick={submit}>
                  Save Skill
                </Button>
              </Space>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </>
  );
};

export default SaveSkillsCard;
