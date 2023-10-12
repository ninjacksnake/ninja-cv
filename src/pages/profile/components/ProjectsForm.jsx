import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Collapse } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./projectsForm.css";
import ResponsiveCardList from "./ResponsiveCardList.jsx";
import ProjectService from "../../../services/Project.Service";

const ProjectsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    ProjectService.find({ token: token, loggedUser: loggedUser })
      .then((projects) => {
        // console.log("projects:", projects);
        if (projects.length > 0) {
          setProjects(projects);
        }
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = (values) => {
    // Add the new Project entry to the list of Projects
    ProjectService.create(values, loggedUser, token)
      .then((response) => {
        console.log(values);
        setProjects([...projects, values]);

        // Reset the form fields
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleView = () => {};

  return (
    <>
      <ResponsiveCardList
        data={projects}
        cardType="projects"
        handleDelete={handleDelete}
        handleView={handleView}
      />
      <div className="Projects-form-container">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="Projects-form"
        >
          <Form.Item
            name={["name"]}
            label="Project Name"
            rules={[
              { required: true, message: "Please enter the project name" },
            ]}
          >
            <Input placeholder="Enter the project name" />
          </Form.Item>

          <Form.Item
            name={["startDate"]}
            label="Start Date"
            rules={[{ required: true, message: "Please select a start date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name={["endDate"]}
            label="End Date"
            rules={[{ required: true, message: "Please select an end date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

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
            <Input placeholder="Enter the technologies used" />
          </Form.Item>

          <Form.Item
            name={["url"]}
            label="Url"
            rules={[
              {
                required: false,
                message: "Please enter the URL",
              },
            ]}
          >
            <Input placeholder="Enter the technologies used" />
          </Form.Item>

          <Form.Item
            name={["description"]}
            label="Project Description"
            rules={[
              {
                required: true,
                message: "Please enter the project description",
              },
            ]}
          >
            <TextArea placeholder="Enter the project description" rows={4} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "16px", float: "right" }}
          >
            Save
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ProjectsForm;
