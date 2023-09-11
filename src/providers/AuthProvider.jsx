import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthProvider = ({ children }) => {
 // console.log("auth provider");
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async ({ username, password }) => {
    try {
      localStorage.removeItem("token");
      const newToken = await AuthService.LogIn({ username, password });
      localStorage.setItem("token", JSON.stringify(newToken));
      const decodedToken = jwtDecode(newToken); // decode the token if exist in local storage
      setLoggedUser(loggedUserData(decodedToken));
      setToken(newToken);
      setIsloggedIn(true);
      navigate("/profile");
    } catch (error) {
      if (error.message.includes("username")) {
        message.error("Wrong username or password");
      }
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsloggedIn(false);
  };

  //return the necesary user data to be used in the application
  const loggedUserData = (existingToken) => {
    if (existingToken) {
      const { userId, email, username, role } = existingToken;
      return { userId, email, username, role };
    }
  };

  const checkTokenExpiration = () => {
    try {
      const existingToken = localStorage.getItem("token");
      const decodedToken = jwtDecode(existingToken);
      const currentTime = Date.now() / 1000;
      if (location.pathname === "/register") {
        return navigate("/register");
      }
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        setToken(null);
        setIsloggedIn(false);
        message.error("SESSION EXPIRED!");
        setTimeout(() => {
          return navigate("/login");
        }, 500);
      }
      setToken(existingToken);
      return decodedToken;
    } catch (error) {
    //  console.error(error);
      if (location.pathname !== "/register" && location.pathname !== "/login") {
        console.log("not register");
        if (error.name === "InvalidTokenError") {
          message.error("INVALID SESION!");
          setTimeout(() => {
            return navigate("/login");
          }, 50);
        }
      }
    }
  };

  //this effect loads when the app starts and checks if there is a token in local storage
  useEffect(() => {
    const existingToken = JSON.parse(localStorage.getItem("token"));
    checkTokenExpiration(existingToken);
    if (existingToken !== null && location.pathname !== "/register") {
      const decodedToken = checkTokenExpiration(existingToken);
      setLoggedUser(loggedUserData(decodedToken));
    } else {
      setToken(existingToken);
      setIsloggedIn(true);
    }
  }, []);

  const value = {
    token,
    loggedUser,
    checkTokenExpiration,
    onLogin: handleLogin,
    onLogout: handleLogout,
    isLoggedIn: isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
