import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./jobsForm.css";
import ResponsiveCardList from "./ResponsiveCardList.jsx";
import JobService from "../../../services/JobService";

const JobsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = Form.useForm();
  const [jobState, setJobState] = useState([]);

  useEffect(() => {
    checkTokenExpiration();
    JobService.find({ loggedUser: loggedUser, token: token })
      .then((jobs) => {
        if (jobs.length > 0) {
          return setJobState([...jobs]);
        }
        // console.log(jobs.message);
      })
      .catch((error) => {
        // console.log(error)
        if (error?.response?.status === 401) {
          checkTokenExpiration();
        }
      });
  }, []);

  const handleSubmit = (values) => {
    JobService.create(values, loggedUser, token)
      .then((result) => {
        setJobState([...jobState, result.data]);
        message.success("Job added successfully");
         form.resetFields();
      })
      .catch((err) => {
        console.log(err);
        message.error("Error adding job");
      });
  };

  function handleUpdate(params) {}

  function handleView(params) {}

  const handleDelete = (id, index) => {
    //Remove the job entry at the specified index from the list of jobs
    JobService.remove(id, loggedUser, token)
      .then((result) => {
        // console.log(result);
        const updatedJobs = jobState.filter((_, idx) => idx !== index);
        setJobState(updatedJobs);
        message.success("Job deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        message.error("Error deleting job");
      });
  };

  return (
    <>
      <ResponsiveCardList
        data={jobState}
        cardType={"job"}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleView={handleView}
      />
      <div className="jobs-form-container">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="jobs-form"
        >
          <Form.Item
            name={["company"]}
            label="Company"
            rules={[{ required: true, message: "Please enter the company" }]}
          >
            <Input placeholder="Enter the company" />
          </Form.Item>

          <Form.Item
            name={["jobUrl"]}
            label="URL"
            rules={[{ required: true, message: "Please enter the company  URL" }]}
          >
            <Input placeholder="Enter the company URL" />
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
            name={["title"]}
            label="Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter the title" />
          </Form.Item>

          <Form.Item
            name={["responsibilities"]}
            label="Responsibilities"
            rules={[
              {
                required: true,
                message: "Please enter the responsibilities",
              },
            ]}
          >
            <TextArea placeholder="Enter the responsibilities" rows={4} />
          </Form.Item>

          <Form.Item
            name={["technologiesUsed"]}
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
            name={["projectDescription"]}
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

          <Form.Item
            name={["technicalChallenge"]}
            label="Technical Challenge"
            rules={[
              {
                required: true,
                message: "Please enter the technical challenge",
              },
            ]}
          >
            <TextArea placeholder="Enter the technical challenge" rows={4} />
          </Form.Item>

          <Form.Item
            name={["personalChallenge"]}
            label="Personal Challenge"
            rules={[
              {
                required: true,
                message: "Please enter the personal challenge",
              },
            ]}
          >
            <TextArea placeholder="Enter the personal challenge" rows={4} />
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

export default JobsForm;
