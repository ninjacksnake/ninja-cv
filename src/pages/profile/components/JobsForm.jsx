import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Button, message, Collapse, Modal, Descriptions } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./jobsForm.css";
import ResponsiveCardList from "./ResponsiveCardList.jsx";
import JobService from "../../../services/JobService";

const JobsForm = ({ loggedUser, token, checkTokenExpiration }) => {
  const [form] = Form.useForm();
  const [jobState, setJobState] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

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
    if (editingId) {
      JobService.update(editingId, token, values)
        .then((result) => {
          const updatedJobs = jobState.map((job) =>
            (job._id === editingId || job.id === editingId) ? { ...job, ...values } : job
          );
          setJobState(updatedJobs);
          message.success("Job updated successfully");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          message.error("Error updating job");
        });
    } else {
      JobService.create(values, loggedUser, token)
        .then((result) => {
          setJobState([...jobState, result.data]);
          message.success("Job added successfully");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          message.error("Error adding job");
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
    const formElement = document.querySelector(".jobs-edit-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    form.resetFields();
  };

  function handleView(item) {
    setViewItem(item);
    setIsViewModalVisible(true);
  }

  const handleCancelView = () => {
    setIsViewModalVisible(false);
    setViewItem(null);
  };

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
    <div className="jobs-form-container">
      <div className="jobs-viewer-section">
        <h3>Your Experience</h3>
        {jobState.length > 0 ? (
          <ResponsiveCardList
            data={jobState}
            cardType={"job"}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleView={handleView}
          />
        ) : (
          <div className="empty-jobs-message">
            <p>No professional experience added yet.</p>
          </div>
        )}
      </div>

      <Modal
        title="Job Details"
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
            <Descriptions.Item label="Company">{viewItem.company}</Descriptions.Item>
            <Descriptions.Item label="Job Title">{viewItem.title}</Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {viewItem.startDate ? new Date(viewItem.startDate).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {viewItem.endDate ? new Date(viewItem.endDate).toLocaleDateString() : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Company URL">
              {viewItem.jobUrl ? <a href={viewItem.jobUrl} target="_blank" rel="noopener noreferrer">{viewItem.jobUrl}</a> : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Responsibilities">
              <div style={{ whiteSpace: 'pre-wrap' }}>{viewItem.responsibilities}</div>
            </Descriptions.Item>
            <Descriptions.Item label="Technologies Used">{viewItem.technologiesUsed}</Descriptions.Item>
            {viewItem.projectDescription && (
              <Descriptions.Item label="Project Description">
                <div style={{ whiteSpace: 'pre-wrap' }}>{viewItem.projectDescription}</div>
              </Descriptions.Item>
            )}
            {viewItem.technicalChallenge && (
              <Descriptions.Item label="Technical Challenge">
                <div style={{ whiteSpace: 'pre-wrap' }}>{viewItem.technicalChallenge}</div>
              </Descriptions.Item>
            )}
            {viewItem.personalChallenge && (
              <Descriptions.Item label="Personal Challenge">
                <div style={{ whiteSpace: 'pre-wrap' }}>{viewItem.personalChallenge}</div>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      <div className="jobs-edit-section">
        <h3>{editingId ? "Edit Job" : "Add New Job"}</h3>
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
            <Input placeholder="e.g. Google, Amazon" />
          </Form.Item>

          <Form.Item
            name={["title"]}
            label="Job Title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="e.g. Senior Software Engineer" />
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
            name={["jobUrl"]}
            label="Company URL"
            rules={[{ required: false, message: "Please enter the company URL" }]}
          >
            <Input placeholder="e.g. https://company.com" />
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
            <TextArea placeholder="Describe your key responsibilities..." rows={4} />
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
            <Input placeholder="e.g. Java, Spring Boot, AWS" />
          </Form.Item>

          <Collapse ghost>
            <Collapse.Panel header="Additional Details (Optional)" key="1">
              <Form.Item
                name={["projectDescription"]}
                label="Project Description"
                rules={[{ required: false }]}
              >
                <TextArea placeholder="Describe a specific project..." rows={3} />
              </Form.Item>

              <Form.Item
                name={["technicalChallenge"]}
                label="Technical Challenge"
                rules={[{ required: false }]}
              >
                <TextArea placeholder="Describe a technical challenge you overcame..." rows={3} />
              </Form.Item>

              <Form.Item
                name={["personalChallenge"]}
                label="Personal Challenge"
                rules={[{ required: false }]}
              >
                <TextArea placeholder="Describe a personal challenge..." rows={3} />
              </Form.Item>
            </Collapse.Panel>
          </Collapse>

          <Form.Item>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ marginTop: '16px' }}
              >
                {editingId ? "Update Job" : "Save Job"}
              </Button>
              {editingId && (
                <Button
                  onClick={resetForm}
                  block
                  style={{ marginTop: '16px' }}
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

export default JobsForm;
