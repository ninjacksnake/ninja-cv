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
      } catch (error)  {
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
      {Object.keys(profileInfo).length > 0 ? (
        <Form
          className="profile-form"
          form={form}
          initialValues={profileInfo}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Space>
            <Form.Item
              name="photo"
              rules={[
                { required: true, message: "Please complete this field" },
              ]}
            >
              <div className="photo-container">
                <ImageUploader getImageBynaries={getImage} />
              </div>
            </Form.Item>
            <h1> {profileInfo.name} </h1>
          </Space>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <Input placeholder="Write your first name" />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <Input placeholder="Write your last name" />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <Input placeholder="Write your city name" />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <Input placeholder="Write your Country name" />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: false, message: "Please complete this field" }]}
          >
            <Input placeholder="Give a contact Email" />
          </Form.Item>
          <Form.Item
            label="Portafolio Link"
            name="portafolio"
            rules={[{ required: false, message: "Please complete this field" }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label="Social Network link"
            name="socialNetwork"
            rules={[{ required: false, message: "Please complete this field" }]}
          >
            <Input placeholder="Give a social network link" />
          </Form.Item>
          <Form.Item
            label="About Me"
            name="aboutMe"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label="Strong points"
            name="strongPoints"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item
            label="Weaknesses"
            name="weakPoints"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            label="LifeStyle"
            name="lifeStyle"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            label="Aspirations"
            name="aspirations"
            rules={[{ required: true, message: "Please complete this field" }]}
          >
            <TextArea
              placeholder="Controlled autosize"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                float: "right",
              }}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <p>Loading...</p>
      )}
      
    </div>
  );
};

export default ProfileForm;
