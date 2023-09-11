import "./educationForm.css";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Collapse,
  Select,
  Space,
  message,
} from "antd";
import EducationService from "./../../../services/EducationService";
import ResponsiveCardList from "./ResponsiveCardList.jsx";

const { Option } = Select;

const EducationForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = Form.useForm();
  const [educations, setEducations] = useState([]);
  const [countries] = useState(["USA", "UK", "Canada", "Australia"]);
  const [cities] = useState(["New York", "London", "Toronto", "Sydney"]);
  const [degrees] = useState(["Bachelor", "Master", "PhD"]);

  useEffect(() => {
    // console.log("effect excecuted educationform line 20");
    const findEducationList = async () => {
      try {
        if (loggedUser.userId) {
          const educationList = await EducationService.find({
            token,
            loggedUser,
          });
          if (educationList) {
            setEducations(educationList);
          }
          //  console.log("🚀 ~ file: ProfileForm.jsx:22 ~ findProfile ~ profile:", profile.profile)
        }
      } catch (error) {
        console.log(error);
      }
    };
    findEducationList();
  }, [loggedUser]);

  const handleSubmit = (values) => {
    const { institution, country, city, degree, startDate, endDate, status } =
      values;
    const educationInfo = {
      profileId: loggedUser.userId,
      institution,
      country,
      city,
      degree,
      startDate,
      endDate,
      status,
    };
    // console.log(educationInfo);
    EducationService.create(educationInfo, loggedUser, token)
      .then((result) => {
        console.log("saved education is :");
        console.log(result);
        setEducations([...educations, result.data]);
        message.success("Education added successfully");
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (values) => {
    console.log(values);
  };

  // Remove the education entry at the specified index from the list of educations
  const handleDelete = (id, index) => {
    
    const updatedEducations = educations.filter((_, idx) => idx !== index);
    // code to delete from db first then update the state
    EducationService.remove(id, loggedUser, token).then((result) => {
      message.success("Education deleted successfully");
      setEducations(updatedEducations);
    }).catch((error) => { 
      console.log(error);
    
    });
    ///
    //setEducations([...updatedEducations]);
  };

  return (
    <>
      <ResponsiveCardList
        data={educations}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <div className="education-form-container">
        <Space>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="education-form"
          >
            <Form.Item
              name={"institution"}
              label="Institution"
              rules={[
                {
                  required: true,
                  message: "Please enter the institution",
                },
              ]}
            >
              <Input placeholder="Enter the institution" />
            </Form.Item>

            <Form.Item
              name={"country"}
              label="Country"
              rules={[{ required: true, message: "Please select a country" }]}
            >
              <Select placeholder="Select a country">
                {countries.map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={"city"}
              label="City"
              rules={[{ required: true, message: "Please select a city" }]}
            >
              <Select placeholder="Select a city">
                {cities.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={"startDate"}
              label="Start Date"
              rules={[
                { required: true, message: "Please select a start date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name={"endDate"}
              label="End Date"
              rules={[{ required: true, message: "Please select an end date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name={"degree"}
              label="Degree"
              rules={[{ required: true, message: "Please select a degree" }]}
            >
              <Select placeholder="Select a degree">
                {degrees.map((degree) => (
                  <Option key={degree} value={degree}>
                    {degree}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={"status"}
              label="Status"
              rules={[{ required: true, message: "Please enter the status" }]}
            >
              <Input placeholder="Enter the status" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "25px", float: "right" }}
            >
              Submit
            </Button>
          </Form>
        </Space>
      </div>
    </>
  );
};

export default EducationForm;
