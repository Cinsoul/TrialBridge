import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, Input, Select, List, Tag, Space, Divider, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, SearchOutlined, ExperimentOutlined } from '@ant-design/icons';
import { trialService } from '../../services/trialService';
import type { Trial } from '../../services/trialService';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Trials: React.FC = () => {
  const navigate = useNavigate();
  const [trials, setTrials] = useState<Trial[]>([]);
  const [filteredTrials, setFilteredTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch trials data
  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await trialService.getAllTrials();
        if (response.success) {
          setTrials(response.trials);
          setFilteredTrials(response.trials);
        }
      } catch (error) {
        console.error('Error fetching trials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrials();
  }, []);

  // Filter trials based on search term and status filter
  useEffect(() => {
    let filtered = [...trials];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(trial => trial.status === statusFilter);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(trial => 
        trial.title.toLowerCase().includes(term) || 
        trial.description.toLowerCase().includes(term) ||
        trial.location.toLowerCase().includes(term) ||
        trial.sponsoredBy.toLowerCase().includes(term)
      );
    }
    
    setFilteredTrials(filtered);
  }, [searchTerm, statusFilter, trials]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleViewTrialDetails = (trialId: string) => {
    navigate(`/public/trials/${trialId}`);
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
          <Title>Clinical Trials</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Browse our database of clinical trials. You can search for specific conditions, locations, or keywords.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={16}>
          <Search
            placeholder="Search for trials by keyword, condition, or location"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            placeholder="Filter by status"
            style={{ width: '100%', height: '40px' }}
            onChange={handleStatusFilterChange}
            defaultValue="all"
          >
            <Option value="all">All Statuses</Option>
            <Option value="recruiting">Recruiting</Option>
            <Option value="active">Active, Not Recruiting</Option>
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
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={filteredTrials}
          renderItem={trial => (
            <List.Item>
              <Card 
                hoverable 
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ExperimentOutlined style={{ fontSize: 24, marginRight: 12, color: '#1890ff' }} />
                    <span>{trial.title}</span>
                  </div>
                }
                extra={<Tag color={getStatusColor(trial.status)}>{trial.status}</Tag>}
              >
                <Paragraph ellipsis={{ rows: 3 }}>
                  {trial.description}
                </Paragraph>
                
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Space split={<Divider type="vertical" />}>
                    <Text type="secondary">Location: {trial.location}</Text>
                    <Text type="secondary">Start: {trial.startDate}</Text>
                  </Space>
                  
                  <Text type="secondary">Sponsored by: {trial.sponsoredBy}</Text>
                  
                  <div style={{ marginTop: 16 }}>
                    <Button 
                      type="primary" 
                      onClick={() => handleViewTrialDetails(trial.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </Space>
              </Card>
            </List.Item>
          )}
          pagination={{
            onChange: () => {
              window.scrollTo(0, 0);
            },
            pageSize: 9,
          }}
        />
      )}

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

export default Trials;