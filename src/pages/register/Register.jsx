import {
  FacebookFilled,
  GoogleSquareFilled,
  LockOutlined,
  TwitterSquareFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Image, Input, message } from "antd";
import "./register.css";
import AuthService from "../../services/AuthService";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const Register = () => {

  const authContext = useAuth() 
  const {onLogin} = authContext;
  
  const onFinish = (values) => {
    const getNewUser = async (values) => {
      try {
        const newUser = await AuthService.Register(values);
        message.info("User created Correctly")
       onLogin(values.username, values.password)
        return newUser;
      } catch (error) {
        message("Ups, the user was not created")
        console.log(error);
      }
    };
    getNewUser(values);
  };
  return (
    <div className="register-container">
      <div className="register-form-container">
        <Image alt="LogoPhoto" src="#" />
        <div className="register-article">
          <h3>Join thousands of users that strive to improve</h3>
        </div>
        <br />
        <Form
          name="normal_register"
          className="register-form"
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

            <a className="register-form-forgot" href="/#">
              Forgot password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Start Creating now
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="register-social-icon">
              <p> Or continue with these social profile </p>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="register-social-icon">
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
          Already a member <a href="/login">Log in !</a>
        </Form>
      </div>
    </div>
  );
};

export default Register;
