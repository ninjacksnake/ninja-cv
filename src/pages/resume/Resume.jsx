import React, { useEffect, useState } from "react";
import { Card, Typography, Space, Button, message, Spin, Alert } from "antd";
import {
  FileTextOutlined,
  DownloadOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import "./resume.css";
import ResumeGenerator from "./components/ResumeGenerator";
import useAuth from "../../hooks/useAuth";
import ResumeService from "../../services/ResumeService";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Resume = () => {
  const AuthContext = useAuth();
  const navigate = useNavigate();
  const { loggedUser, token, checkTokenExpiration } = AuthContext;
  const [profileInfo, setProfileInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        setLoading(true);
        setError(null);
    checkTokenExpiration();

    if (loggedUser && token) {
          const info = await ResumeService.getProfileInfo({
        token: token,
        loggedUser: loggedUser,
          });

        setProfileInfo({
          profile: info[0].profile,
          educations: info[1],
          jobs: info[2],
          projects: info[3],
      });
    } else {
      navigate("/profile");
    }
      } catch (err) {
        console.error("Error loading resume data:", err);
        setError("Failed to load resume data. Please try again.");
        message.error("Failed to load resume data");
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, [loggedUser, token, navigate]);

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="resume-loading-container">
        <Card className="resume-loading-card">
          <div className="loading-content">
            <Spin size="large" indicator={<LoadingOutlined spin />} />
            <Title level={4} className="loading-title">
              Loading your resume...
            </Title>
            <Text type="secondary">Please wait while we fetch your profile information</Text>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="resume-error-container">
        <Card className="resume-error-card">
          <Alert
            message="Error Loading Resume"
            description={error}
            type="error"
            showIcon
            action={
              <Button size="small" onClick={handleRetry}>
                Retry
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="resume-page">
      {/* Resume Header */}
      <div className="resume-header-section">
        <Card className="resume-header-card">
          <div className="header-content">
            <div className="header-left">
              <Space>
                <FileTextOutlined className="header-icon" />
                <div>
                  <Title level={3} className="header-title">
                    Resume Builder
                  </Title>
                  <Text type="secondary" className="header-subtitle">
                    Create and customize your professional resume
                  </Text>
                </div>
              </Space>
            </div>
            <div className="header-right">
              <Space>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => message.info("Download feature integrated in resume templates")}
                >
                  Download PDF
                </Button>
              </Space>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="resume-main-content">
      <ResumeGenerator resumeInfo={profileInfo} />
      </div>
    </div>
  );
};

export default Resume;
