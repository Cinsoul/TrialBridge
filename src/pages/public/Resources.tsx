import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, Input, Tabs, List, Tag, Space, Divider, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, BookOutlined, VideoCameraOutlined, QuestionCircleOutlined, PictureOutlined } from '@ant-design/icons';
import { educationService } from '../../services/educationService';
import type { EducationalResource } from '../../services/educationService';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const Resources: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch educational resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await educationService.getAllResources();
        if (response.success) {
          setResources(response.resources);
          setFilteredResources(response.resources);
        }
      } catch (error) {
        console.error('Error fetching educational resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search term
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = resources.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        resource.summary.toLowerCase().includes(term) || 
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
      setFilteredResources(filtered);
    } else {
      setFilteredResources(resources);
    }
  }, [searchTerm, resources]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const renderResourceItem = (resource: EducationalResource) => {
    const getIconByType = (type: string) => {
      switch (type) {
        case 'article':
          return <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
        case 'video':
          return <VideoCameraOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
        case 'faq':
          return <QuestionCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
        case 'infographic':
          return <PictureOutlined style={{ fontSize: '24px', color: '#722ed1' }} />;
        default:
          return <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      }
    };

    return (
      <List.Item>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={
            resource.type === 'infographic' ? (
              <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
                <PictureOutlined style={{ fontSize: 64, color: '#722ed1' }} />
              </div>
            ) : resource.type === 'video' ? (
              <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
                <VideoCameraOutlined style={{ fontSize: 64, color: '#fff' }} />
              </div>
            ) : null
          }
        >
          <Card.Meta
            avatar={getIconByType(resource.type)}
            title={resource.title}
            description={
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph ellipsis={{ rows: 2 }}>{resource.summary}</Paragraph>
                <Space>
                  {resource.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
                <Text type="secondary">Published: {resource.datePublished}</Text>
              </Space>
            }
          />
        </Card>
      </List.Item>
    );
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
          <Title>Educational Resources</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Browse our collection of educational resources about clinical trials, medical conditions, and treatment options.
          </Paragraph>
        </Col>
      </Row>

      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Search
            placeholder="Search for resources by keyword or topic"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Tabs defaultActiveKey="all">
          <TabPane tab="All Resources" key="all">
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              dataSource={filteredResources}
              renderItem={renderResourceItem}
              pagination={{
                onChange: () => {
                  window.scrollTo(0, 0);
                },
                pageSize: 12,
              }}
            />
          </TabPane>
          <TabPane tab="Articles" key="articles">
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              dataSource={filteredResources.filter(r => r.type === 'article')}
              renderItem={renderResourceItem}
              pagination={{
                onChange: () => {
                  window.scrollTo(0, 0);
                },
                pageSize: 12,
              }}
            />
          </TabPane>
          <TabPane tab="Videos" key="videos">
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              dataSource={filteredResources.filter(r => r.type === 'video')}
              renderItem={renderResourceItem}
              pagination={{
                onChange: () => {
                  window.scrollTo(0, 0);
                },
                pageSize: 12,
              }}
            />
          </TabPane>
          <TabPane tab="Infographics" key="infographics">
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              dataSource={filteredResources.filter(r => r.type === 'infographic')}
              renderItem={renderResourceItem}
              pagination={{
                onChange: () => {
                  window.scrollTo(0, 0);
                },
                pageSize: 12,
              }}
            />
          </TabPane>
          <TabPane tab="FAQs" key="faqs">
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              dataSource={filteredResources.filter(r => r.type === 'faq')}
              renderItem={renderResourceItem}
              pagination={{
                onChange: () => {
                  window.scrollTo(0, 0);
                },
                pageSize: 12,
              }}
            />
          </TabPane>
        </Tabs>
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

export default Resources;