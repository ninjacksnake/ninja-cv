import { Button, Form, Space, Input } from "antd";
import React, { useEffect, useState } from "react";
import ImageUploader from "../../../components/ImageUploader";
import "./profileForm.css";
import TextArea from "antd/es/input/TextArea";
import useAuth from "../../../hooks/useAuth";
import ProfileService from "../../../services/ProfileService";

const ProfileForm = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const authContext = useAuth();
  const { loggedUser, token, checkTokenExpiration } = authContext;
  const [form] = Form.useForm();

  useEffect(() => {
    //console.log("effect excecuted");
    const findProfile = async () => {
      try {
        if (loggedUser.userId) {
          const profile = await ProfileService.find({ token, loggedUser });
          //  console.log("🚀 ~ file: ProfileForm.jsx:22 ~ findProfile ~ profile:", profile.profile)
          setProfileInfo(profile.profile);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findProfile();
  }, [loggedUser]);

  //submit the info to the backend
  const onSubmit = (values) => {
    checkTokenExpiration();
    const updateProfile = async () => {
      const updated = await ProfileService.update(
        loggedUser.userId,
        token,
        values
      );
      return updated;
    };
    updateProfile()
      .then((result) => {
        // findProfile(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getImage = (image) => {
    //  /   console.log(image.length);
  };
  return (

    <div className="profile-form-container">
      <div className="profile-edit-section">
        <div className="profile-header">
          <div className="photo-wrapper">
            <ImageUploader getImageBynaries={getImage} />
          </div>
          <h3>Edit Profile</h3>
        </div>

        {Object.keys(profileInfo).length > 0 ? (
          <Form
            className="profile-form"
            form={form}
            initialValues={profileInfo}
            layout="vertical"
            onFinish={onSubmit}
          >
            <div className="form-grid-2">
              <Form.Item
                label="First Name"
                name="name"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input placeholder="John" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </div>

            <div className="form-grid-2">
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="New York" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please enter your country" }]}
              >
                <Input placeholder="USA" />
              </Form.Item>
            </div>

            <div className="form-grid-2">
              <Form.Item
                label="Contact Email"
                name="contact"
                rules={[{ required: false }]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
              <Form.Item
                label="Portfolio URL"
                name="portafolio" // Keeping backend field name
                rules={[{ required: false }]}
              >
                <Input placeholder="https://myportfolio.com" />
              </Form.Item>
            </div>

            <Form.Item
              label="Social Network URL"
              name="socialNetwork"
              rules={[{ required: false }]}
            >
              <Input placeholder="https://linkedin.com/in/johndoe" />
            </Form.Item>

            <Form.Item
              label="About Me (Bio)"
              name="aboutMe"
              rules={[{ required: true, message: "Please tell us about yourself" }]}
            >
              <TextArea
                placeholder="Brief professional summary..."
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>

            <div className="form-grid-2">
              <Form.Item
                label="Strong Points"
                name="strongPoints"
                rules={[{ required: true, message: "Required" }]}
              >
                <TextArea
                  placeholder="e.g. Leadership, Problem Solving"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
              <Form.Item
                label="Weaknesses"
                name="weakPoints" // Keeping backend field name
                rules={[{ required: true, message: "Required" }]}
              >
                <TextArea
                  placeholder="e.g. Public Speaking"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </div>

            <div className="form-grid-2">
              <Form.Item
                label="Lifestyle / Hobbies"
                name="lifeStyle"
                rules={[{ required: true, message: "Required" }]}
              >
                <TextArea
                  placeholder="e.g. Hiking, Reading"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
              <Form.Item
                label="Aspirations"
                name="aspirations"
                rules={[{ required: true, message: "Required" }]}
              >
                <TextArea
                  placeholder="e.g. Become a CTO"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                style={{ marginTop: '20px' }}
                size="large"
                type="primary"
                htmlType="submit"
                block
              >
                Save Profile
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading Profile...</div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
