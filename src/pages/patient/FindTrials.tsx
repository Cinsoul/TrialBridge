import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, List, Tag, Input, Select, Spin, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { trialService } from '../../services/trialService';
import type { Trial } from '../../services/trialService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const FindTrials: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [trials, setTrials] = useState<Trial[]>([]);
  const [filteredTrials, setFilteredTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  // Fetch trials data
  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await trialService.getAllTrials();
        if (response.success) {
          setTrials(response.trials);
          setFilteredTrials(response.trials);
        } else {
          message.error('Failed to load clinical trials');
        }
      } catch (error) {
        console.error('Error fetching trials:', error);
        message.error('An error occurred while loading trials');
      } finally {
        setLoading(false);
      }
    };

    fetchTrials();
  }, []);

  // Filter trials based on search term and status
  useEffect(() => {
    let result = trials;
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(trial => trial.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(trial => 
        trial.title.toLowerCase().includes(term) || 
        trial.description.toLowerCase().includes(term) ||
        trial.location.toLowerCase().includes(term)
      );
    }
    
    setFilteredTrials(result);
  }, [searchTerm, statusFilter, trials]);

  const handleApply = async (trialId: string) => {
    if (!currentUser?.email) {
      message.error('You must be logged in to apply');
      return;
    }
    
    try {
      const response = await trialService.applyForTrial(currentUser.email, trialId);
      if (response.success) {
        message.success('Application submitted successfully!');
      } else {
        message.error(response.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying for trial:', error);
      message.error('An error occurred while submitting your application');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/patient/dashboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting':
        return 'green';
      case 'active':
        return 'blue';
      case 'completed':
        return 'gray';
      default:
        return 'default';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row align="middle" style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBackToDashboard}
          style={{ marginRight: '16px' }}
        >
          Back
        </Button>
        <Title level={2} style={{ margin: 0 }}>Find Clinical Trials</Title>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={16}>
          <Input 
            placeholder="Search by title, description, or location" 
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="large"
          />
        </Col>
        <Col span={8}>
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by status"
            value={statusFilter}
            onChange={value => setStatusFilter(value)}
            size="large"
          >
            <Option value="all">All Statuses</Option>
            <Option value="recruiting">Recruiting</Option>
            <Option value="active">Active</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={filteredTrials}
          locale={{ emptyText: 'No clinical trials found' }}
          renderItem={trial => (
            <List.Item>
              <Card>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={4}>{trial.title}</Title>
                    <Tag color={getStatusColor(trial.status)}>
                      {trial.status.charAt(0).toUpperCase() + trial.status.slice(1)}
                    </Tag>
                  </Col>
                  <Col>
                    <Button 
                      type="primary" 
                      onClick={() => handleApply(trial.id)}
                      disabled={trial.status !== 'recruiting'}
                    >
                      Apply Now
                    </Button>
                  </Col>
                </Row>
                <Paragraph>{trial.description}</Paragraph>
                <Space direction="vertical">
                  <Text strong>Location:</Text>
                  <Text>{trial.location}</Text>
                  <Text strong>Duration:</Text>
                  <Text>{trial.startDate} to {trial.endDate}</Text>
                  <Text strong>Compensation:</Text>
                  <Text>{trial.compensation}</Text>
                  <Text strong>Contact:</Text>
                  <Text>{trial.contactEmail} | {trial.contactPhone}</Text>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default FindTrials;