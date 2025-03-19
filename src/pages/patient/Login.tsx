import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Space, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface LoginForm {
  username: string;
  password: string;
  phone?: string;
  email?: string;
}

const PatientLogin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const response = await authService.loginPatient(values);
      if (response.success) {
        message.success('Login successful!');
        navigate('/patient/dashboard');
      } else {
        message.error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Title level={2} className="login-title">Patient Portal</Title>
        <Tabs defaultActiveKey="account" centered>
          <TabPane tab="Account Login" key="account">
            <Form
              form={form}
              name="patient_login"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' },
                       { type: 'email', message: 'Please enter a valid email!' }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Log in
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <Space split={<Divider type="vertical" />}>
                  <Link to="/patient/register">Register Now</Link>
                  <Link to="/patient/forgot-password">Forgot Password</Link>
                </Space>
              </div>
            </Form>
          </TabPane>

          <TabPane tab="Phone Login" key="phone">
            <Form
              form={form}
              name="patient_phone_login"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="phone"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input prefix={<MobileOutlined />} placeholder="Phone Number" />
              </Form.Item>

              <Form.Item
                name="verificationCode"
                rules={[{ required: true, message: 'Please input verification code!' }]}
              >
                <Input.Search
                  prefix={<UserOutlined />}
                  placeholder="Verification Code"
                  enterButton="Get Code"
                  onSearch={() => console.log('Send verification code')}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Text type="secondary">Are you a trial team member? </Text>
          <Link to="/trial-team/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;