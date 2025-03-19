import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, Tabs, List, Tag, Space, Input, Spin, Image, Rate, Modal, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, BookOutlined, VideoCameraOutlined, QuestionCircleOutlined, PictureOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { educationService } from '../../services/educationService';
import type { EducationalResource } from '../../services/educationService';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const InformationPlaza: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

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

  const handleBackToDashboard = () => {
    navigate('/patient/dashboard');
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleResourceClick = (resource: EducationalResource) => {
    setSelectedResource(resource);
    setIsModalVisible(true);
    // In a real app, this would increment the view count
    // educationService.incrementViewCount(resource.id);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedResource(null);
    setUserRating(0);
    setUserComment('');
  };

  const handleRatingChange = (value: number) => {
    setUserRating(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedResource || !currentUser?.email) return;
    
    setSubmittingFeedback(true);
    try {
      // In a real app, this would submit feedback to the server
      await educationService.submitFeedback({
        resourceId: selectedResource.id,
        patientEmail: currentUser.email,
        rating: userRating,
        comment: userComment,
      });
      
      // Reset form
      setUserRating(0);
      setUserComment('');
      
      // Close modal
      setIsModalVisible(false);
      setSelectedResource(null);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setSubmittingFeedback(false);
    }
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
      <List.Item
        key={resource.id}
        onClick={() => handleResourceClick(resource)}
        style={{ cursor: 'pointer' }}
      >
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={
            resource.type === 'infographic' ? (
              <div style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
                <Image
                  preview={false}
                  src="https://via.placeholder.com/400x200?text=Infographic+Preview"
                  alt={resource.title}
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
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
                <Space split={<Divider type="vertical" />}>
                  <Text type="secondary">{resource.datePublished}</Text>
                  <Text type="secondary">
                    <LikeOutlined /> {Math.floor(Math.random() * 50) + 10}
                  </Text>
                  <Text type="secondary">
                    <MessageOutlined /> {Math.floor(Math.random() * 20) + 5}
                  </Text>
                </Space>
              </Space>
            }
          />
        </Card>
      </List.Item>
    );
  };

  const renderResourceContent = (resource: EducationalResource) => {
    if (resource.type === 'infographic') {
      return (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Image
            src="https://via.placeholder.com/800x600?text=Infographic+Content"
            alt={resource.title}
            style={{ maxWidth: '100%' }}
          />
        </div>
      );
    } else if (resource.type === 'video') {
      return (
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                background: '#000', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <VideoCameraOutlined style={{ fontSize: 64, color: '#fff' }} />
              <Text style={{ color: '#fff', marginLeft: 16 }}>Video content would play here</Text>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Paragraph style={{ whiteSpace: 'pre-line' }}>
          {resource.content}
        </Paragraph>
      );
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
        <Title level={2} style={{ margin: 0 }}>Information Plaza</Title>
      </Row>

      <Row style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Search
            placeholder="Search for clinical trial information"
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

      <Modal
        title={selectedResource?.title}
        open={isModalVisible}
        onCancel={handleModalClose}
        width={800}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
          <Button 
            key="share" 
            type="default" 
            icon={<ShareAltOutlined />}
          >
            Share
          </Button>,
        ]}
      >
        {selectedResource && (
          <>
            <Space split={<Divider type="vertical" />} style={{ marginBottom: 16 }}>
              <Text type="secondary">Published: {selectedResource.datePublished}</Text>
              <Text type="secondary">Author: {selectedResource.author || 'Unknown'}</Text>
              <Text type="secondary">Views: {selectedResource.viewCount}</Text>
            </Space>
            
            <div style={{ marginBottom: 24 }}>
              {selectedResource.tags.map(tag => (
                <Tag key={tag} style={{ marginRight: 8 }}>{tag}</Tag>
              ))}
            </div>
            
            {renderResourceContent(selectedResource)}
            
            <Divider>Rate this resource</Divider>
            
            <div style={{ marginBottom: 16 }}>
              <Rate 
                allowHalf 
                value={userRating} 
                onChange={handleRatingChange} 
              />
              <span style={{ marginLeft: 8 }}>
                {userRating ? <Text type="secondary">{userRating} stars</Text> : ''}
              </span>
            </div>
            
            <Input.TextArea
              rows={4}
              value={userComment}
              onChange={handleCommentChange}
              placeholder="Share your thoughts about this resource..."
              style={{ marginBottom: 16 }}
            />
            
            <Button 
              type="primary" 
              onClick={handleSubmitFeedback}
              loading={submittingFeedback}
            >
              Submit Feedback
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default InformationPlaza;