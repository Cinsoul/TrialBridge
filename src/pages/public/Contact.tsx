import React, { useState } from 'react';
import { Typography, Form, Input, Button, Row, Col, Card, Space, Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      message.success('Your message has been sent. We will get back to you soon!');
      form.resetFields();
    }, 1000);
  };

  return (
    <div style={{ padding: '24px 50px' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: '24px' }}
      >
        Back to Home
      </Button>

      <Row justify="center" style={{ marginBottom: 40 }}>
        <Col xs={24} md={18} lg={16}>
          <Title>Contact Us</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Have questions about clinical trials or our platform? We're here to help. Fill out the form below or use our contact information to get in touch.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <Col xs={24} md={16}>
          <Card>
            <Title level={4}>Send Us a Message</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Your Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="What is your message about?" />
              </Form.Item>
              
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  rows={6} 
                  placeholder="How can we help you?" 
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={submitting}
                  size="large"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card>
            <Title level={4}>Contact Information</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Space>
                <MailOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                <div>
                  <Text strong>Email</Text>
                  <Paragraph>contact@trialbridge.com</Paragraph>
                </div>
              </Space>
              
              <Space>
                <PhoneOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                <div>
                  <Text strong>Phone</Text>
                  <Paragraph>+1 (555) 123-4567</Paragraph>
                </div>
              </Space>
              
              <Space>
                <EnvironmentOutlined style={{ fontSize: 20, color: '#722ed1' }} />
                <div>
                  <Text strong>Address</Text>
                  <Paragraph>
                    Trial Bridge Headquarters<br />
                    123 Medical Plaza<br />
                    Boston, MA 02115
                  </Paragraph>
                </div>
              </Space>
            </Space>
            
            <Divider />
            
            <Title level={5}>Office Hours</Title>
            <Paragraph>
              Monday - Friday: 9:00 AM - 5:00 PM EST<br />
              Saturday - Sunday: Closed
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px 0', borderTop: '1px solid #f0f0f0', marginTop: 40 }}>
        <Space split={<Divider type="vertical" />}>
          <a onClick={() => navigate('/public/about')}>About Us</a>
          <a onClick={() => navigate('/public/trials')}>Clinical Trials</a>
          <a onClick={() => navigate('/public/resources')}>Resources</a>
          <a onClick={() => navigate('/public/contact')}>Contact</a>
        </Space>
        <div style={{ marginTop: 20 }}>
          <Typography.Text type="secondary">© {new Date().getFullYear()} Trial Bridge. All rights reserved.</Typography.Text>
        </div>
      </footer>
    </div>
  );
};

export default Contact;