import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, Input, List, Avatar, Spin, Badge, Tabs, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, SendOutlined, UserOutlined, TeamOutlined, PaperClipOutlined, FileTextOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { communicationService } from '../../services/communicationService';
import type { Message } from '../../services/communicationService';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const TrialConsultation: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [activeChat, setActiveChat] = useState('admin');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await communicationService.getMessagesByUser(currentUser?.email || '');
        if (response.success) {
          setMessages(response.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    
    // Simulate receiving new messages every 30 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [currentUser]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBackToDashboard = () => {
    navigate('/patient/dashboard');
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser?.email) return;
    
    setSending(true);
    try {
      // In a real app, this would send the message to the server
      await communicationService.sendMessage({
        senderId: currentUser.email,
        receiverId: activeChat,
        senderType: 'patient',
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false
      });
      
      // Clear input
      setNewMessage('');
      
      // Refresh messages
      const response = await communicationService.getMessagesByUser(currentUser.email);
      if (response.success) {
        setMessages(response.messages);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      message.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTabChange = (key: string) => {
    setActiveChat(key);
  };

  const handleFileUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Filter messages for current chat
  const currentMessages = messages.filter(
    msg => (msg.senderId === currentUser?.email && msg.receiverId === activeChat) || 
           (msg.receiverId === currentUser?.email && msg.senderId === activeChat)
  );

  // Get unread message count for each chat
  const getUnreadCount = (chatId: string) => {
    return messages.filter(
      msg => msg.senderId === chatId && 
             msg.receiverId === currentUser?.email && 
             !msg.read
    ).length;
  };

  const renderMessageItem = (msg: Message) => {
    const isSelf = msg.senderId === currentUser?.email;
    
    return (
      <List.Item style={{ padding: '8px 0' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: isSelf ? 'row-reverse' : 'row',
          alignItems: 'flex-start'
        }}>
          <Avatar 
            icon={isSelf ? <UserOutlined /> : <TeamOutlined />} 
            style={{ 
              backgroundColor: isSelf ? '#1890ff' : '#52c41a',
              marginRight: isSelf ? 0 : 12,
              marginLeft: isSelf ? 12 : 0
            }}
          />
          <div style={{ maxWidth: '70%' }}>
            <div
              style={{
                background: isSelf ? '#1890ff' : '#f0f2f5',
                color: isSelf ? 'white' : 'rgba(0, 0, 0, 0.85)',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '4px',
                wordWrap: 'break-word'
              }}
            >
              {msg.content}
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(0, 0, 0, 0.45)',
              textAlign: isSelf ? 'right' : 'left'
            }}>
              {new Date(msg.timestamp).toLocaleString()}
            </div>
            
            {msg.attachments && msg.attachments.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                {msg.attachments.map(attachment => (
                  <div 
                    key={attachment.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      background: '#f9f9f9',
                      borderRadius: '4px',
                      marginBottom: '4px'
                    }}
                  >
                    <FileTextOutlined style={{ marginRight: '8px' }} />
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                      {attachment.name} ({attachment.size} KB)
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </List.Item>
    );
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
        <Title level={2} style={{ margin: 0 }}>Trial Consultation</Title>
      </Row>

      <Row gutter={24}>
        <Col span={6}>
          <Card title="Conversations" bordered={false}>
            <Tabs defaultActiveKey="admin" onChange={handleTabChange}>
              <Tabs.TabPane 
                tab={
                  <Badge count={getUnreadCount('admin')} size="small">
                    <span>Trial Team</span>
                  </Badge>
                } 
                key="admin"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[{ name: 'Trial Coordinator', id: 'admin' }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<TeamOutlined />} style={{ backgroundColor: '#52c41a' }} />}
                        title={item.name}
                        description="Available for consultation"
                      />
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane 
                tab={
                  <Badge count={getUnreadCount('dr.thompson')} size="small">
                    <span>Doctors</span>
                  </Badge>
                } 
                key="dr.thompson"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={[{ name: 'Dr. Robert Thompson', id: 'dr.thompson' }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<TeamOutlined />} style={{ backgroundColor: '#722ed1' }} />}
                        title={item.name}
                        description="Rheumatology Specialist"
                      />
                    </List.Item>
                  )}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col span={18}>
          <Card 
            bordered={false} 
            style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0' }}
          >
            <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
              <Text strong>Chatting with: </Text>
              <Text>{activeChat === 'admin' ? 'Trial Coordinator' : 'Dr. Robert Thompson'}</Text>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <Spin size="large" />
                </div>
              ) : currentMessages.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <Text type="secondary">No messages yet. Start a conversation!</Text>
                </div>
              ) : (
                <List
                  dataSource={currentMessages}
                  renderItem={renderMessageItem}
                />
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
              <TextArea 
                rows={3} 
                value={newMessage}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                disabled={sending}
              />
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <Dragger 
                  name="file" 
                  multiple={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={handleFileUpload}
                  showUploadList={false}
                  style={{ width: 'auto' }}
                  disabled={sending}
                >
                  <Button icon={<PaperClipOutlined />}>
                    Attach File
                  </Button>
                </Dragger>
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  onClick={handleSendMessage}
                  loading={sending}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TrialConsultation;