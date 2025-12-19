import { Card, Avatar, Typography, Space, Divider } from "antd";
import React, { useState } from "react";
import {
  UserOutlined,
  BookOutlined,
  EnvironmentOutlined,
  ProjectOutlined,
  StarOutlined,
  IdcardOutlined
} from "@ant-design/icons";
import EducationForm from "./components/EducationForm";
import JobsForm from "./components/JobsForm";
import ProfileForm from "./components/ProfileForm";
import ProjectsForm from "./components/ProjectsForm";
import './profile.css';
import useAuth from "../../hooks/useAuth";
import SkillsForm from "./components/SkillsForm";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Tab1");
  const authContext = useAuth() 
  const {loggedUser, token, checkTokenExpiration } = authContext;
 
  const tabList = [
    {
      key: "Tab1",
      tab: (
        <span>
          <IdcardOutlined />
          General Info
        </span>
      )
    },
    {
      key: "Tab2",
      tab: (
        <span>
          <BookOutlined />
          Education
        </span>
      )
    },
    {
      key: "Tab3",
      tab: (
        <span>
          <EnvironmentOutlined />
          Jobs
        </span>
      )
    },
    {
      key: "Tab4",
      tab: (
        <span>
          <ProjectOutlined />
          Projects
        </span>
      )
    },
    {
      key: "Tab5",
      tab: (
        <span>
          <StarOutlined />
          Skills
        </span>
      )
    },
  ];

  const contentList = {
    Tab1: <ProfileForm  />,
    Tab2: <EducationForm  loggedUser={loggedUser} token={token} checkTokenExpiration={checkTokenExpiration}/>,
    Tab3: <JobsForm loggedUser={loggedUser} token={token} checkTokenExpiration={checkTokenExpiration}/>,
    Tab4: <ProjectsForm loggedUser={loggedUser} token={token} checkTokenExpiration={checkTokenExpiration}/>,
    Tab5: <SkillsForm loggedUser={loggedUser} token={token} checkTokenExpiration={checkTokenExpiration}/>,
  };

  const onTabChange = (key) => {
    setSelectedTab(key);
  };
  const { Title, Text } = Typography;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Card className="profile-header-card">
          <Space size="large" align="center">
            <Avatar
              size={80}
              icon={<UserOutlined />}
              className="profile-avatar"
            />
            <div className="profile-info">
              <Title level={2} className="profile-name">
                {loggedUser?.username}'s Profile
              </Title>
              <Text type="secondary" className="profile-subtitle">
                Manage your professional information and build your resume
              </Text>
            </div>
          </Space>
        </Card>
      </div>

      <div className="profile-content">
        <Card
          className="profile-card"
          tabList={tabList}
          activeTabKey={selectedTab}
          onTabChange={onTabChange}
          tabProps={{
            size: 'large',
            type: 'line'
          }}
        >
          <div className="tab-content">
            {contentList[selectedTab]}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
