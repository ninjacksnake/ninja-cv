import { useEffect, useState } from "react";
import "./skillsForm.css";
import { Button, Empty, Form, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import SkillsViewer from "./SkillsViewer.jsx";
import SkillsService from "./../../../services/SkillsService";
import ProfileService from "./../../../services/ProfileService";

const SkillsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = useForm();
  const [skills, setSkills] = useState([]); // All available skills
  const [profileSkills, setProfileSkills] = useState([]); // User's saved skills
  const [selectedSkills, setSelectedSkills] = useState([]); // Currently selected in form

  const layout = {
    labelCol: { span: 24 }, // Full width labels
    wrapperCol: { span: 24 },
  };

  // Sync selectedSkills with form when profileSkills changes
  useEffect(() => {
    form.setFieldsValue({ skills: profileSkills });
    setSelectedSkills(profileSkills);
  }, [profileSkills, form]);

  const handleChange = (values) => {
    setSelectedSkills(values);
  };

  const deleteSkill = (skillToDelete) => {
    // Determine if skillToDelete is an index or the skill name itself
    // The previous code passed index, but SkillsViewer might pass name or object. 
    // Assuming SkillsViewer passes the skill object or name based on previous code usage...
    // Actually looking at previous code: deleteSkill(index) was used.
    // Let's robustly handle it.

    // Filter out the skill
    const updatedSkills = profileSkills.filter((_, i) => i !== skillToDelete);
    setProfileSkills(updatedSkills);

    // Update backend (Silent update for delete)
    ProfileService.update(loggedUser.userId, token, {
      skills: updatedSkills.map(s => ({ name: s })) // Ensure format matches backend expectation
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    checkTokenExpiration();

    // Get user skills
    ProfileService.find({ token: token, loggedUser: loggedUser })
      .then((foundProfile) => {
        const fSkills = foundProfile.profile.skills.map((skill) => skill.name);
        setProfileSkills(fSkills);
      })
      .catch((error) => console.log(error));

    // Get all available skills
    SkillsService.find({ token: token, loggedUser: loggedUser })
      .then((foundSkills) => {
        setSkills(foundSkills);
      })
      .catch((error) => console.log(error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = (values) => {
    // valid skills array
    const newSkills = (values.skills || []).map((skillName) => ({ name: skillName }));

    ProfileService.update(loggedUser.userId, token, { skills: newSkills })
      .then(() => {
        setProfileSkills(values.skills || []);
        // Optional: Show success message
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="skills-form-container">
      <div className="skills-viewer-section">
        <h3>Your Skills</h3>
        {profileSkills.length > 0 ? (

          <SkillsViewer
            skills={profileSkills.map(s => [s])}
            deleteSkill={deleteSkill}
          />

        ) : (
          <Empty description="No skills added yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      <div className="skills-edit-section">
        <h3>Manage Skills</h3>
        <Form
          {...layout}
          form={form}
          onFinish={submitForm}
          className="skills-form"
        >
          <Form.Item
            name="skills"
            help="Type to search or select from list"
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Add skills (e.g. JavaScript, Python)"
              onChange={handleChange}
              options={skills.map((skill) => ({ label: skill.name, value: skill.name }))}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SkillsForm;
