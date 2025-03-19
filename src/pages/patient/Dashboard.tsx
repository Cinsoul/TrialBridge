import React from 'react';
import { Typography, Card, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const { Title, Text } = Typography;

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  // In a real app, you would check if the user is logged in
  // and redirect to login if not
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/patient/login');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={2}>Patient Dashboard</Title>
          <Text>Welcome, {currentUser?.email || 'Patient'}</Text>
        </Col>
        <Col>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="My Clinical Trials" bordered={false}>
            <p>You are not enrolled in any clinical trials yet.</p>
            <Button type="primary" onClick={() => navigate('/patient/find-trials')}>Find Trials</Button>
            <Button style={{ marginTop: '8px' }} onClick={() => navigate('/patient/trial-risk-assessment')}>Risk Assessment</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="My Appointments" bordered={false}>
            <p>You have no upcoming appointments.</p>
            <Button type="primary" onClick={() => navigate('/patient/schedule-appointment')}>Schedule Appointment</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="My Health Data" bordered={false}>
            <p>Track and manage your health information.</p>
            <Button type="primary" onClick={() => navigate('/patient/health-data')}>View Health Data</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Information Plaza" bordered={false}>
            <p>Access educational resources about clinical trials.</p>
            <Button type="primary" onClick={() => navigate('/patient/information-plaza')}>Browse Resources</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Trial Consultation" bordered={false}>
            <p>Chat with trial team members and medical professionals.</p>
            <Button type="primary" onClick={() => navigate('/patient/trial-consultation')}>Start Chat</Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Rewards Program" bordered={false}>
            <p>Earn points and redeem for medical benefits and more.</p>
            <Button type="primary" onClick={() => navigate('/patient/reward-mechanism')}>View Rewards</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientDashboard;