import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Button, Collapse, Modal, Descriptions, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./projectsForm.css";
import ResponsiveCardList from "./ResponsiveCardList.jsx";
import ProjectService from "../../../services/Project.Service";

const ProjectsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  useEffect(() => {
    ProjectService.find({ token: token, loggedUser: loggedUser })
      .then((projects) => {
        // console.log("projects:", projects);
        if (projects.length > 0) {
          setProjects(projects);
        }
      })
      .catch((err) => { });
  }, []);

  const handleSubmit = (values) => {
    if (editingId) {
      ProjectService.update(editingId, token, values)
        .then((response) => {
          const updatedProjects = projects.map((proj) =>
            (proj._id === editingId || proj.id === editingId) ? { ...proj, ...values } : proj
          );
          setProjects(updatedProjects);
          message.success("Project updated successfully");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          message.error("Error updating project");
        });
    } else {
      ProjectService.create(values, loggedUser, token)
        .then((response) => {
          // console.log(values);
          setProjects([...projects, response.data]);
          message.success("Project added successfully");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          message.error("Error adding project");
        });
    }
  };

  const handleUpdate = (item) => {
    setEditingId(item._id || item.id);
    form.setFieldsValue({
      ...item,
      startDate: item.startDate ? dayjs(item.startDate) : null,
      endDate: item.endDate ? dayjs(item.endDate) : null,
    });
    // Scroll to form
    const formElement = document.querySelector(".projects-edit-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    form.resetFields();
  };

  const handleDelete = (id, index) => {
    // console.log("🚀 ~ file: ProjectsForm.jsx:39 ~ handleDelete ~ id:", id)
    // Remove the Project entry at the specified index from the list of Projects
    ProjectService.remove(id, loggedUser, token)
      .then((response) => {
        const updatedJobs = projects.filter((_, idx) => idx !== index);
        setProjects(updatedJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleView = (item) => {
    setViewItem(item);
    setIsViewModalVisible(true);
  };

  const handleCancelView = () => {
    setIsViewModalVisible(false);
    setViewItem(null);
  };

  return (
    <div className="projects-form-container">
      <div className="projects-viewer-section">
        <h3>Your Projects</h3>
        {projects.length > 0 ? (
          <ResponsiveCardList
            data={projects}
            cardType="projects"
            handleDelete={handleDelete}
            handleView={handleView}
            handleUpdate={handleUpdate}
          />
        ) : (
          <div className="empty-projects-message">
            <p>No projects added yet.</p>
          </div>
        )}
      </div>

      <Modal
        title="Project Details"
        open={isViewModalVisible}
        onCancel={handleCancelView}
        footer={[
          <Button key="close" onClick={handleCancelView}>
            Close
          </Button>
        ]}
        width={700}
      >
        {viewItem && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Project Name">{viewItem.name}</Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {viewItem.startDate ? new Date(viewItem.startDate).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {viewItem.endDate ? new Date(viewItem.endDate).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Technologies Used">{viewItem.technologies}</Descriptions.Item>
            <Descriptions.Item label="Project URL">
              {viewItem.url ? <a href={viewItem.url} target="_blank" rel="noopener noreferrer">{viewItem.url}</a> : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              <div style={{ whiteSpace: 'pre-wrap' }}>{viewItem.description}</div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <div className="projects-edit-section">
        <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="projects-form"
        >
          <Form.Item
            name={["name"]}
            label="Project Name"
            rules={[
              { required: true, message: "Please enter the project name" },
            ]}
          >
            <Input placeholder="e.g. E-commerce Website" />
          </Form.Item>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name={["startDate"]}
              label="Start Date"
              style={{ flex: 1 }}
              rules={[{ required: true, message: "Please select a start date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name={["endDate"]}
              label="End Date"
              style={{ flex: 1 }}
              rules={[{ required: true, message: "Please select an end date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item
            name={["technologies"]}
            label="Technologies Used"
            rules={[
              {
                required: true,
                message: "Please enter the technologies used",
              },
            ]}
          >
            <Input placeholder="e.g. React, Node.js, MongoDB" />
          </Form.Item>

          <Form.Item
            name={["url"]}
            label="Project URL"
            rules={[
              {
                required: false,
                message: "Please enter the URL",
              },
            ]}
          >
            <Input placeholder="e.g. https://github.com/myproject" />
          </Form.Item>

          <Form.Item
            name={["description"]}
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the project description",
              },
            ]}
          >
            <TextArea placeholder="Briefly describe what you built and your role..." rows={4} />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                type="primary"
                htmlType="submit"
                block
              >
                {editingId ? "Update Project" : "Save Project"}
              </Button>
              {editingId && (
                <Button
                  onClick={resetForm}
                  block
                >
                  Cancel
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProjectsForm; 
