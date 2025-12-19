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
  Modal,
  Descriptions,
} from "antd";
import dayjs from "dayjs";
import EducationService from "./../../../services/EducationService";
import ResponsiveCardList from "./ResponsiveCardList.jsx";

const { Option } = Select;

const EducationForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = Form.useForm();
  const [educations, setEducations] = useState([]);
  const [countries] = useState(["USA", "UK", "Canada", "Australia"]);
  const [cities] = useState(["New York", "London", "Toronto", "Sydney"]);
  const [editingId, setEditingId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  useEffect(() => {
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    findEducationList();
  }, [loggedUser]);

  const handleView = (item) => {
    setViewItem(item);
    setIsViewModalVisible(true);
  };

  const handleCancelView = () => {
    setIsViewModalVisible(false);
    setViewItem(null);
  };

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

    if (editingId) {
      EducationService.update(editingId, token, educationInfo)
        .then((result) => {
          // Update the local state
          // Update the local state
          const updatedEducations = educations.map((edu) =>
            (edu._id === editingId || edu.id === editingId) ? { ...edu, ...educationInfo } : edu
          );
          setEducations(updatedEducations);
          message.success("Education updated successfully");
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          message.error("Failed to update education");
        });
    } else {
      EducationService.create(educationInfo, loggedUser, token)
        .then((result) => {
          setEducations([...educations, result.data]);
          message.success("Education added successfully");
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          message.error("Failed to add education");
        });
    }
  };

  const handleUpdate = (item) => {
    setEditingId(item._id || item.id);
    form.setFieldsValue({
      ...item,
      institution: item.institution || item.institutionName,
      degree: item.degree || item.educationType,
      startDate: item.startDate ? dayjs(item.startDate) : null,
      endDate: item.endDate ? dayjs(item.endDate) : null,
    });
    // Scroll to form (optional UX improvement)
    const formElement = document.querySelector(".education-edit-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDelete = (id, index) => {
    const updatedEducations = educations.filter((_, idx) => idx !== index);
    EducationService.remove(id, loggedUser, token).then((result) => {
      message.success("Education deleted successfully");
      setEducations(updatedEducations);
      if (editingId === id) {
        resetForm();
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const resetForm = () => {
    setEditingId(null);
    form.resetFields();
  };

  return (
    <div className="education-form-container">
      <div className="education-viewer-section">
        <h3>Your Education</h3>
        {educations.length > 0 ? (
          <ResponsiveCardList
            data={educations}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleView={handleView}
            cardType="education"
          />
        ) : (
          <div className="empty-education-message">
            <p>No education added yet.</p>
          </div>
        )}
        <Modal
          title="Education Details"
          open={isViewModalVisible}
          onCancel={handleCancelView}
          footer={[
            <Button key="close" onClick={handleCancelView}>
              Close
            </Button>
          ]}
        >
          {viewItem && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Institution">{viewItem.institutionName}</Descriptions.Item>
              <Descriptions.Item label="Degree">{viewItem.educationType}</Descriptions.Item>
              <Descriptions.Item label="Country">{viewItem.country}</Descriptions.Item>
              <Descriptions.Item label="City">{viewItem.city}</Descriptions.Item>
              <Descriptions.Item label="Start Date">
                {viewItem.startDate ? new Date(viewItem.startDate).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="End Date">
                {viewItem.endDate ? new Date(viewItem.endDate).toLocaleDateString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Status">{viewItem.status}</Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>

      <div className="education-edit-section">
        <h3>{editingId ? "Edit Education" : "Add New Education"}</h3>
        <Space direction="vertical" style={{ width: '100%' }}>
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
              <Input placeholder="e.g. Harvard University" />
            </Form.Item>

            <Form.Item
              name={"degree"}
              label="Degree"
              rules={[
                {
                  required: true,
                  message: "Please enter the degree",
                },
              ]}
            >
              <Input placeholder="e.g. Software Engineer" />
            </Form.Item>

            <div style={{ display: 'flex', gap: '16px' }}>
              <Form.Item
                name={"country"}
                label="Country"
                style={{ flex: 1 }}
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
                style={{ flex: 1 }}
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
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <Form.Item
                name={"startDate"}
                label="Start Date"
                style={{ flex: 1 }}
                rules={[
                  { required: true, message: "Please select a start date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name={"endDate"}
                label="End Date"
                style={{ flex: 1 }}
                rules={[{ required: true, message: "Please select an end date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>

            <Form.Item
              name={"status"}
              label="Status"
              rules={[{ required: true, message: "Please enter the status" }]}
            >
              <Input placeholder="e.g. Graduated, In Progress" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                >
                  {editingId ? "Update Education" : "Save Education"}
                </Button>
                {editingId && (
                  <Button onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default EducationForm;
