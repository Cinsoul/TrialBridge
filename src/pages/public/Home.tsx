import React from 'react';
import { Typography, Button, Row, Col, Card, Space, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ExperimentOutlined, TeamOutlined, FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '0 50px' }}>
      {/* Hero Section */}
      <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
        <Col xs={24} md={16} lg={12} style={{ textAlign: 'center' }}>
          <Title>Trial Bridge</Title>
          <Title level={3} style={{ marginBottom: 40 }}>
            Connecting Patients with Clinical Trials
          </Title>
          <Paragraph style={{ fontSize: 18, marginBottom: 40 }}>
            Trial Bridge helps patients find suitable clinical trials and assists research teams in recruiting qualified participants.
            Our platform streamlines the clinical trial process for everyone involved.
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" onClick={() => navigate('/patient/login')}>
              Patient Portal
            </Button>
            <Button size="large" onClick={() => navigate('/trial-team/login')}>
              Trial Team Portal
            </Button>
            <Button type="link" size="large" onClick={() => navigate('/public/trials')}>
              Browse Trials
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider />

      {/* Features Section */}
      <div style={{ padding: '60px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>
          How Trial Bridge Works
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ padding: '30px 0', textAlign: 'center' }}>
                  <ExperimentOutlined style={{ fontSize: 64, color: '#1890ff' }} />
                </div>
              }
            >
              <Card.Meta
                title="Find Clinical Trials"
                description="Search for clinical trials based on your medical condition, location, and preferences."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ padding: '30px 0', textAlign: 'center' }}>
                  <FileSearchOutlined style={{ fontSize: 64, color: '#52c41a' }} />
                </div>
              }
            >
              <Card.Meta
                title="Check Eligibility"
                description="Our platform helps you determine if you're eligible for specific trials based on your health profile."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ padding: '30px 0', textAlign: 'center' }}>
                  <TeamOutlined style={{ fontSize: 64, color: '#722ed1' }} />
                </div>
              }
            >
              <Card.Meta
                title="Connect with Research Teams"
                description="Communicate directly with trial coordinators and healthcare professionals."
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card
              hoverable
              style={{ height: '100%' }}
              cover={
                <div style={{ padding: '30px 0', textAlign: 'center' }}>
                  <QuestionCircleOutlined style={{ fontSize: 64, color: '#fa8c16' }} />
                </div>
              }
            >
              <Card.Meta
                title="Get Support"
                description="Access educational resources and receive guidance throughout your clinical trial journey."
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Call to Action */}
      <Row justify="center" style={{ padding: '60px 0' }}>
        <Col xs={24} md={16} style={{ textAlign: 'center' }}>
          <Title level={2}>Ready to Get Started?</Title>
          <Paragraph style={{ fontSize: 16, marginBottom: 30 }}>
            Join thousands of patients who have found suitable clinical trials through our platform.
          </Paragraph>
          <Space>
            <Button type="primary" size="large" onClick={() => navigate('/patient/register')}>
              Sign Up as a Patient
            </Button>
            <Button onClick={() => navigate('/public/about')}>Learn More</Button>
          </Space>
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

export default Home;