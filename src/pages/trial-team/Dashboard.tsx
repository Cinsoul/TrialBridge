import React from 'react';
import { Typography, Card, Button, Row, Col, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { TeamOutlined, ExperimentOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TrialTeamDashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  // In a real app, you would check if the user is logged in
  // and redirect to login if not
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'trialTeam') {
      navigate('/trial-team/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/trial-team/login');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
        <Col>
          <Title level={2}>Trial Team Dashboard</Title>
          <Text>Welcome, {currentUser?.username || 'Admin'}</Text>
        </Col>
        <Col>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Active Trials" 
              value={3} 
              prefix={<ExperimentOutlined />} 
            />
            <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate('/trial-team/manage-trials')}>
              Manage Trials
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Enrolled Patients" 
              value={42} 
              prefix={<TeamOutlined />} 
            />
            <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate('/trial-team/view-patients')}>
              View Patients
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Pending Applications" 
              value={7} 
              prefix={<FileSearchOutlined />} 
            />
            <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate('/trial-team/review-applications')}>
              Review Applications
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrialTeamDashboard;