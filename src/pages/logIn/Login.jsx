import React from "react";
import {
  FacebookFilled,
  GoogleSquareFilled,
  LockOutlined,
  TwitterSquareFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Image, Input } from "antd";
import "./login.css";
import useAuth from "../../hooks/useAuth";



const Login = () => {
  const authContext = useAuth() 
  const {onLogin} = authContext;
 
  const onFinish = async (values) => {
    try {
      const { username, password } = values;
      onLogin({username, password})    
    } catch (error) {
    console.log("🚀 ~ file: Login.jsx:24 ~ onFinish ~ error:", error)
    }
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Image alt="LogoPhoto" src="#" />
        <div className="login-article">
          <h3>Login </h3>
        </div>
        <br />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/#">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Continue
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="login-social-icon">
              <p> Or use any these social profile </p>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="login-social-icon">
              <a href="/#">
                <FacebookFilled style={{ fontSize: "48px", color: "#08c" }} />
              </a>
              <a href="/#">
                <GoogleSquareFilled
                  style={{ fontSize: "48px", color: "#08c" }}
                />
              </a>
              <a href="/#">
                <TwitterSquareFilled
                  style={{ fontSize: "48px", color: "#08c" }}
                />
              </a>
            </div>
          </Form.Item>
          No account yet? <a href="/register">register now!</a>
        </Form>
      </div>
    </div>
  );
};

export default Login;
