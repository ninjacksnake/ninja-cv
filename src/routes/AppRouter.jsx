import React from "react";

import { Route, Routes } from "react-router-dom";
import Login from "../pages/logIn/Login";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import AppLayout from "../pages/AppLayout";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import Resume from "../pages/resume/Resume";
import Basic from "../pages/resume/components/resumesDesign/BasicResume.jsx";

const AppRouter = () => {
  // const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="resume" element={<Resume />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
