import React from "react";
import "./settings.css";
import SaveSkillsCard from "./components/SaveSkillsCard";
import useAuth from "./../../hooks/useAuth";

const Settings = () => {
  const authContext = useAuth();
  const { loggedUser, token, checkTokenExpiration } = authContext;

  return (
    <>
      <div className="settings-container">
        <SaveSkillsCard token={token} loggedUser={loggedUser} />
      </div>
    </>
  );
};

export default Settings;
