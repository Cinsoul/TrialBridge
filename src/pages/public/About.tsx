import React from 'react';
import { Typography, Row, Col, Card, Avatar, Space, Divider, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, TeamOutlined, HeartOutlined, SafetyOutlined, GlobalOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & Medical Director',
      bio: 'Board-certified physician with over 15 years of experience in clinical research.',
      avatar: 'J',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Former tech lead at major health platforms with expertise in secure medical data systems.',
      avatar: 'C',
    },
    {
      name: 'Dr. Robert Thompson',
      role: 'Clinical Research Advisor',
      bio: 'Specialist in designing patient-centered clinical trials with focus on accessibility.',
      avatar: 'T',
    },
    {
      name: 'Emily Davis',
      role: 'Patient Advocacy Director',
      bio: 'Former patient advocate with experience in connecting patients to appropriate clinical trials.',
      avatar: 'D',
    },
  ];

  return (
    <div style={{ padding: '24px 50px' }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: '24px' }}
      >
        Back to Home
      </Button>

      <Row justify="center" style={{ marginBottom: 60 }}>
        <Col xs={24} md={18} lg={16}>
          <Title>About Trial Bridge</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Trial Bridge was founded in 2022 with a simple mission: to make clinical trials more accessible to patients 
            and to help research teams find the right participants more efficiently.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[32, 32]} justify="center" style={{ marginBottom: 60 }}>
        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
              <HeartOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
              <Title level={4}>Our Mission</Title>
              <Paragraph>
                To bridge the gap between patients seeking innovative treatments and research teams conducting 
                groundbreaking clinical trials, creating a more efficient and patient-centered research ecosystem.
              </Paragraph>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
              <SafetyOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
              <Title level={4}>Our Values</Title>
              <Paragraph>
                We believe in transparency, patient empowerment, data security, and advancing medical research 
                through ethical practices and inclusive participation.
              </Paragraph>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
              <GlobalOutlined style={{ fontSize: 48, color: '#722ed1', marginBottom: 16 }} />
              <Title level={4}>Our Impact</Title>
              <Paragraph>
                Since our founding, we've helped connect thousands of patients with appropriate clinical trials 
                and assisted research teams in accelerating their recruitment timelines.
              </Paragraph>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">
        <Space>
          <TeamOutlined />
          <span>Our Team</span>
        </Space>
      </Divider>

      <Row gutter={[24, 24]} style={{ marginBottom: 60 }}>
        {teamMembers.map((member, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable>
              <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
                <Avatar size={64} style={{ backgroundColor: index % 2 === 0 ? '#1890ff' : '#722ed1', marginBottom: 16 }}>
                  {member.avatar}
                </Avatar>
                <Title level={5} style={{ margin: 0 }}>{member.name}</Title>
                <Text type="secondary">{member.role}</Text>
                <Paragraph style={{ marginTop: 12 }}>
                  {member.bio}
                </Paragraph>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider />

      <Row justify="center" style={{ marginBottom: 60 }}>
        <Col xs={24} md={16} style={{ textAlign: 'center' }}>
          <Title level={2}>Join Our Mission</Title>
          <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
            Whether you're a patient looking for treatment options or a research team seeking participants,
            Trial Bridge is here to help you navigate the clinical trial landscape.
          </Paragraph>
          <Space>
            <Button type="primary" size="large" onClick={() => navigate('/patient/register')}>
              Sign Up as a Patient
            </Button>
            <Button onClick={() => navigate('/trial-team/register')}>
              Register as a Trial Team
            </Button>
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

export default About;