import { Card } from "antd";
import React, { useState } from "react";
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
    { key: "Tab1", tab: "General Info" },
    { key: "Tab2", tab: "Education" },
    { key: "Tab3", tab: "Jobs" },
    { key: "Tab4", tab: "Projects" },
    { key: "Tab5", tab: "Skills" },
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
  return (
    <div className="profile-card-container">
      <Card
        className="profile-card"
        title={`${loggedUser?.username}'s profile`}
        tabList={tabList}
        activeTabKey={selectedTab}
        onTabChange={onTabChange}
      >
        {contentList[selectedTab]}
      </Card>
    </div>
  );
};

export default Profile;
