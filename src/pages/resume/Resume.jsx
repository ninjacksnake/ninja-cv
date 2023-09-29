import React, { useEffect, useState } from "react";
import "./resume.css";
import ResumeGenerator from "./components/ResumeGenerator";
import useAuth from "../../hooks/useAuth";
import ResumeService from "../../services/ResumeService";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const AuthContext = useAuth();
  const navigate = useNavigate();
  const { loggedUser, token, checkTokenExpiration } = AuthContext;
  const [profileInfo, setProfileInfo] = useState();

  useEffect(() => {
    checkTokenExpiration();
    if (loggedUser && token) {
      ResumeService.getProfileInfo({
        token: token,
        loggedUser: loggedUser,
      }).then((info) => {
        setProfileInfo({
          profile: info[0].profile,
          educations: info[1],
          jobs: info[2],
          projects: info[3],
        });
      });
    } else {
      navigate("/profile");
    }
  }, []);
  return (
    <div className="resume-container">
      <div className="left-panel"></div>
      <ResumeGenerator resumeInfo={profileInfo} />
      <div className="right-panel"></div>
    </div>
  );
};

export default Resume;
