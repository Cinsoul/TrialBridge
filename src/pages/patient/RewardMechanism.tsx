import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, Progress, List, Tag, Tabs, Statistic, Steps, Divider, Modal, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, TrophyOutlined, GiftOutlined, MedicineBoxOutlined, HeartOutlined, DollarOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'medical' | 'financial' | 'service';
  pointsRequired: number;
  available: boolean;
  expiryDate?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  pointsAwarded: number;
  dateCompleted?: string;
}

const RewardMechanism: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [userPoints, setUserPoints] = useState(350);
const totalPointsEarned = 450;
const nextLevelPoints = 500;
const userLevel = 2;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemLoading, setRedeemLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  const handleBackToDashboard = () => {
    navigate('/patient/dashboard');
  };

  const showRewardDetails = (reward: Reward) => {
    setSelectedReward(reward);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedReward(null);
  };

  const handleRedeemReward = async () => {
    if (!selectedReward) return;
    
    setRedeemLoading(true);
    try {
      // In a real app, this would call an API to redeem the reward
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update points after redeeming
      setUserPoints(prev => prev - selectedReward.pointsRequired);
      
      // Close modal
      setIsModalVisible(false);
      setSelectedReward(null);
    } catch (error) {
      console.error('Error redeeming reward:', error);
    } finally {
      setRedeemLoading(false);
    }
  };

  // Mock rewards data
  const rewards: Reward[] = [
    {
      id: 'reward-001',
      title: 'Free Health Checkup',
      description: 'Complete physical examination with basic lab tests included.',
      type: 'medical',
      pointsRequired: 200,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-002',
      title: 'Specialist Consultation',
      description: 'One-time consultation with a specialist of your choice.',
      type: 'medical',
      pointsRequired: 350,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-003',
      title: 'Prescription Discount',
      description: '20% discount on your next prescription medication purchase.',
      type: 'medical',
      pointsRequired: 150,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-004',
      title: 'Gift Card',
      description: '$25 gift card for pharmacy purchases.',
      type: 'financial',
      pointsRequired: 250,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-005',
      title: 'Transportation Credit',
      description: '$30 credit for transportation to and from medical appointments.',
      type: 'service',
      pointsRequired: 300,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-006',
      title: 'Premium Health Tracker',
      description: 'Access to premium features in the health tracking app for 3 months.',
      type: 'service',
      pointsRequired: 400,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-007',
      title: 'Dental Checkup',
      description: 'Free dental examination and cleaning.',
      type: 'medical',
      pointsRequired: 450,
      available: true,
      expiryDate: '2023-12-31'
    },
    {
      id: 'reward-008',
      title: 'Nutrition Consultation',
      description: 'One-hour session with a registered dietitian.',
      type: 'medical',
      pointsRequired: 300,
      available: true,
      expiryDate: '2023-12-31'
    }
  ];

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: 'achievement-001',
      title: 'Profile Completion',
      description: 'Complete your health profile with all required information.',
      completed: true,
      pointsAwarded: 50,
      dateCompleted: '2023-05-10'
    },
    {
      id: 'achievement-002',
      title: 'First Trial Application',
      description: 'Apply for your first clinical trial.',
      completed: true,
      pointsAwarded: 100,
      dateCompleted: '2023-05-15'
    },
    {
      id: 'achievement-003',
      title: 'Health Data Sharing',
      description: 'Share your health data with a trial team.',
      completed: true,
      pointsAwarded: 75,
      dateCompleted: '2023-05-20'
    },
    {
      id: 'achievement-004',
      title: 'Screening Completion',
      description: 'Complete the screening process for a clinical trial.',
      completed: true,
      pointsAwarded: 125,
      dateCompleted: '2023-05-25'
    },
    {
      id: 'achievement-005',
      title: 'Educational Resources',
      description: 'Read 5 educational resources about clinical trials.',
      completed: true,
      pointsAwarded: 100,
      dateCompleted: '2023-06-01'
    },
    {
      id: 'achievement-006',
      title: 'Trial Participation',
      description: 'Participate in a clinical trial for at least 1 month.',
      completed: false,
      pointsAwarded: 200
    },
    {
      id: 'achievement-007',
      title: 'Feedback Submission',
      description: 'Submit feedback on your trial experience.',
      completed: false,
      pointsAwarded: 75
    },
    {
      id: 'achievement-008',
      title: 'Referral Program',
      description: 'Refer a friend who signs up for the platform.',
      completed: false,
      pointsAwarded: 150
    }
  ];

  // Filter rewards by type
  const medicalRewards = rewards.filter(reward => reward.type === 'medical');
  const financialRewards = rewards.filter(reward => reward.type === 'financial');
  const serviceRewards = rewards.filter(reward => reward.type === 'service');

  // Filter achievements by completion status
  const completedAchievements = achievements.filter(achievement => achievement.completed);
  const pendingAchievements = achievements.filter(achievement => !achievement.completed);

  const renderRewardItem = (reward: Reward) => (
    <List.Item
      key={reward.id}
      onClick={() => showRewardDetails(reward)}
      style={{ cursor: 'pointer' }}
    >
      <Card hoverable>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              {reward.type === 'medical' ? (
                <MedicineBoxOutlined style={{ fontSize: 24, color: '#1890ff', marginRight: 8 }} />
              ) : reward.type === 'financial' ? (
                <DollarOutlined style={{ fontSize: 24, color: '#52c41a', marginRight: 8 }} />
              ) : (
                <HeartOutlined style={{ fontSize: 24, color: '#722ed1', marginRight: 8 }} />
              )}
              <Title level={5} style={{ margin: 0 }}>{reward.title}</Title>
            </div>
            <Paragraph>{reward.description}</Paragraph>
            <Text type="secondary">Expires: {reward.expiryDate}</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Statistic 
              value={reward.pointsRequired} 
              suffix="pts" 
              valueStyle={{ color: userPoints >= reward.pointsRequired ? '#52c41a' : '#ff4d4f' }}
            />
            <Button 
              type="primary" 
              size="small"
              disabled={userPoints < reward.pointsRequired}
            >
              Redeem
            </Button>
          </div>
        </div>
      </Card>
    </List.Item>
  );

  const renderAchievementItem = (achievement: Achievement) => (
    <List.Item>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <TrophyOutlined style={{ fontSize: 24, color: achievement.completed ? '#faad14' : '#d9d9d9', marginRight: 8 }} />
              <Title level={5} style={{ margin: 0 }}>{achievement.title}</Title>
            </div>
            <Paragraph>{achievement.description}</Paragraph>
            {achievement.completed && achievement.dateCompleted && (
              <Text type="secondary">Completed on: {achievement.dateCompleted}</Text>
            )}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Statistic 
              value={achievement.pointsAwarded} 
              suffix="pts" 
              valueStyle={{ color: achievement.completed ? '#52c41a' : '#8c8c8c' }}
            />
            {achievement.completed ? (
              <Tag color="success">Completed</Tag>
            ) : (
              <Tag color="default">Pending</Tag>
            )}
          </div>
        </div>
      </Card>
    </List.Item>
  );

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
        <Title level={2} style={{ margin: 0 }}>
          <GiftOutlined style={{ marginRight: 8 }} />
          Rewards Program
        </Title>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} lg={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <Title level={4}>Your Progress</Title>
              <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
                <Progress 
                  type="circle" 
                  percent={Math.round((userPoints / nextLevelPoints) * 100)} 
                  format={() => `${userPoints} pts`}
                  width={120}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: -10, 
                    right: -10, 
                    background: '#1890ff', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: 40, 
                    height: 40, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: 18
                  }}
                >
                  {userLevel}
                </div>
              </div>
              <Paragraph style={{ marginTop: 16 }}>
                <Text strong>{nextLevelPoints - userPoints}</Text> points until Level {userLevel + 1}
              </Paragraph>
            </div>

            <Divider>Reward Levels</Divider>

            <Steps direction="vertical" current={userLevel - 1} size="small">
              <Step title="Level 1" description="Basic rewards unlocked" />
              <Step title="Level 2" description="Medical benefits unlocked" />
              <Step title="Level 3" description="Premium rewards unlocked" />
              <Step title="Level 4" description="VIP benefits unlocked" />
              <Step title="Level 5" description="All rewards unlocked" />
            </Steps>

            <Divider>Points Summary</Divider>

            <div>
              <Row>
                <Col span={12}><Text>Available Points:</Text></Col>
                <Col span={12} style={{ textAlign: 'right' }}><Text strong>{userPoints}</Text></Col>
              </Row>
              <Row>
                <Col span={12}><Text>Total Earned:</Text></Col>
                <Col span={12} style={{ textAlign: 'right' }}><Text strong>{totalPointsEarned}</Text></Col>
              </Row>
              <Row>
                <Col span={12}><Text>Redeemed:</Text></Col>
                <Col span={12} style={{ textAlign: 'right' }}><Text strong>{totalPointsEarned - userPoints}</Text></Col>
              </Row>
            </div>
          </Card>
        </Col>

        <Col span={24} lg={16}>
          <Tabs defaultActiveKey="rewards">
            <TabPane tab="Available Rewards" key="rewards">
              <Alert
                message="How Rewards Work"
                description="Earn points by participating in clinical trials, completing your profile, sharing health data, and more. Redeem your points for valuable rewards including medical benefits, financial incentives, and special services."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Tabs defaultActiveKey="medical">
                <TabPane tab="Medical Benefits" key="medical">
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={medicalRewards}
                    renderItem={renderRewardItem}
                  />
                </TabPane>
                <TabPane tab="Financial Rewards" key="financial">
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={financialRewards}
                    renderItem={renderRewardItem}
                  />
                </TabPane>
                <TabPane tab="Services" key="services">
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={serviceRewards}
                    renderItem={renderRewardItem}
                  />
                </TabPane>
              </Tabs>
            </TabPane>
            
            <TabPane tab="Achievements" key="achievements">
              <Alert
                message="Earn Points Through Achievements"
                description="Complete these achievements to earn points that can be redeemed for rewards. Each achievement represents an important milestone in your clinical trial journey."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Tabs defaultActiveKey="pending">
                <TabPane tab="Pending Achievements" key="pending">
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
                    dataSource={pendingAchievements}
                    renderItem={renderAchievementItem}
                  />
                </TabPane>
                <TabPane tab="Completed Achievements" key="completed">
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
                    dataSource={completedAchievements}
                    renderItem={renderAchievementItem}
                  />
                </TabPane>
              </Tabs>
            </TabPane>
          </Tabs>
        </Col>
      </Row>

      <Modal
        title={selectedReward?.title}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button
            key="redeem"
            type="primary"
            loading={redeemLoading}
            disabled={!selectedReward || userPoints < (selectedReward?.pointsRequired || 0)}
            onClick={handleRedeemReward}
          >
            Redeem Reward
          </Button>
        ]}
      >
        {selectedReward && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              {selectedReward.type === 'medical' ? (
                <MedicineBoxOutlined style={{ fontSize: 32, color: '#1890ff', marginRight: 16 }} />
              ) : selectedReward.type === 'financial' ? (
                <DollarOutlined style={{ fontSize: 32, color: '#52c41a', marginRight: 16 }} />
              ) : (
                <HeartOutlined style={{ fontSize: 32, color: '#722ed1', marginRight: 16 }} />
              )}
              <div>
                <Title level={4} style={{ margin: 0 }}>{selectedReward.title}</Title>
                <Tag color={selectedReward.type === 'medical' ? 'blue' : selectedReward.type === 'financial' ? 'green' : 'purple'}>
                  {selectedReward.type.charAt(0).toUpperCase() + selectedReward.type.slice(1)}
                </Tag>
              </div>
            </div>
            
            <Paragraph>{selectedReward.description}</Paragraph>
            
            <Divider />
            
            <Row gutter={16}>
              <Col span={12}>
                <Statistic 
                  title="Points Required" 
                  value={selectedReward.pointsRequired} 
                  suffix="pts"
                  valueStyle={{ color: userPoints >= selectedReward.pointsRequired ? '#52c41a' : '#ff4d4f' }}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Your Points" 
                  value={userPoints} 
                  suffix="pts"
                />
              </Col>
            </Row>
            
            <Divider />
            
            <div>
              <Text strong>Expiry Date:</Text> {selectedReward.expiryDate}
            </div>
            
            {userPoints < selectedReward.pointsRequired && (
              <Alert
                message={`You need ${selectedReward.pointsRequired - userPoints} more points to redeem this reward`}
                type="warning"
                showIcon
                style={{ marginTop: 16 }}
              />
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default RewardMechanism;