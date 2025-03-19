import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Table, Tag, Modal, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { trialService } from '../../services/trialService';
import type { PatientApplication, Trial } from '../../services/trialService';

const { Title } = Typography;
const { TextArea } = Input;

const ReviewApplications: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [applications, setApplications] = useState<PatientApplication[]>([]);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<PatientApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [approving, setApproving] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'trialTeam') {
      navigate('/trial-team/login');
    }
  }, [currentUser, navigate]);

  // Fetch applications and trials data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all pending applications
        const applicationsResponse = await trialService.getAllApplications();
        if (applicationsResponse.success) {
          setApplications(applicationsResponse.applications.filter(app => app.status === 'pending'));
        } else {
          message.error('Failed to load applications');
        }

        // Fetch all trials for reference
        const trialsResponse = await trialService.getAllTrials();
        if (trialsResponse.success) {
          setTrials(trialsResponse.trials);
        } else {
          message.error('Failed to load trials');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('An error occurred while loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/trial-team/dashboard');
  };

  const showReviewModal = (application: PatientApplication) => {
    setCurrentApplication(application);
    setReviewNotes(application.notes || '');
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentApplication(null);
    setReviewNotes('');
  };

  const handleApprove = async () => {
    if (!currentApplication) return;
    
    setApproving(true);
    try {
      // In a real app, this would call an API to approve the application
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      message.success('Application approved successfully!');
      
      // Update local state
      setApplications(applications.filter(app => app.id !== currentApplication.id));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error approving application:', error);
      message.error('Failed to approve application');
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async () => {
    if (!currentApplication) return;
    
    setApproving(false);
    try {
      // In a real app, this would call an API to reject the application
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      message.success('Application rejected');
      
      // Update local state
      setApplications(applications.filter(app => app.id !== currentApplication.id));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error rejecting application:', error);
      message.error('Failed to reject application');
    }
  };

  // Find trial title by ID
  const getTrialTitle = (trialId: string) => {
    const trial = trials.find(t => t.id === trialId);
    return trial ? trial.title : 'Unknown Trial';
  };

  const columns = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Email',
      dataIndex: 'patientEmail',
      key: 'patientEmail',
    },
    {
      title: 'Trial',
      dataIndex: 'trialId',
      key: 'trialId',
      render: (trialId: string) => getTrialTitle(trialId),
    },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="orange">
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: PatientApplication) => (
        <Button type="primary" onClick={() => showReviewModal(record)}>
          Review
        </Button>
      ),
    },
  ];

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
        <Title level={2} style={{ margin: 0 }}>Pending Applications</Title>
      </Row>

      <Table 
        columns={columns} 
        dataSource={applications} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'No pending applications' }}
      />

      <Modal
        title="Review Application"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        {currentApplication && (
          <>
            <p><strong>Patient:</strong> {currentApplication.patientEmail}</p>
            <p><strong>Trial:</strong> {getTrialTitle(currentApplication.trialId)}</p>
            <p><strong>Submitted:</strong> {currentApplication.submissionDate}</p>
            
            <div style={{ marginBottom: 16 }}>
              <p><strong>Notes:</strong></p>
              <TextArea 
                rows={4} 
                value={reviewNotes}
                onChange={e => setReviewNotes(e.target.value)}
                placeholder="Add review notes here..."
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                danger 
                icon={<CloseOutlined />}
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button 
                type="primary" 
                icon={<CheckOutlined />}
                onClick={handleApprove}
                loading={approving}
              >
                Approve
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ReviewApplications;