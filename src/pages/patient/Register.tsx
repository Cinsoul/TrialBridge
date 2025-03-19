import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Title, Text } = Typography;

interface RegisterForm {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const PatientRegister: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterForm) => {
    setLoading(true);
    try {
      const { confirmPassword, ...userData } = values;
      const response = await authService.registerPatient(userData);
      
      if (response.success) {
        message.success('Registration successful! Please login.');
        navigate('/patient/login');
      } else {
        message.error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Title level={2} className="login-title">Patient Registration</Title>
        <Form
          form={form}
          name="patient_register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number!' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">Already have an account? </Text>
            <Link to="/patient/login">Login here</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PatientRegister;