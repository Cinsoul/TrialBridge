import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
}

const TrialTeamLogin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      const response = await authService.loginTrialTeam(values);
      if (response.success) {
        message.success('Login successful!');
        // In a real app, redirect to trial team dashboard
        navigate('/trial-team/dashboard');
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
        <Title level={2} className="login-title">Trial Team Portal</Title>
        <Form
          form={form}
          name="trial_team_login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
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
              <Link to="/trial-team/register">Register Now</Link>
              <Link to="/trial-team/forgot-password">Forgot Password</Link>
            </Space>
          </div>
        </Form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Text type="secondary">Are you a patient? </Text>
          <Link to="/patient/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default TrialTeamLogin;