import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Table, Tag, Space, Modal, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { trialService } from '../../services/trialService';
import type { Trial } from '../../services/trialService';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ManageTrials: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTrial, setEditingTrial] = useState<Trial | null>(null);
  const [form] = Form.useForm();

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'trialTeam') {
      navigate('/trial-team/login');
    }
  }, [currentUser, navigate]);

  // Fetch trials data
  useEffect(() => {
    const fetchTrials = async () => {
      try {
        const response = await trialService.getAllTrials();
        if (response.success) {
          setTrials(response.trials);
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

  const handleBackToDashboard = () => {
    navigate('/trial-team/dashboard');
  };

  const showAddModal = () => {
    setEditingTrial(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (trial: Trial) => {
    setEditingTrial(trial);
    form.setFieldsValue({
      title: trial.title,
      description: trial.description,
      status: trial.status,
      location: trial.location,
      startDate: trial.startDate,
      endDate: trial.endDate,
      compensation: trial.compensation,
      contactEmail: trial.contactEmail,
      contactPhone: trial.contactPhone,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      await form.validateFields();
      
      if (editingTrial) {
        // Update existing trial
        // In a real app, this would call an API
        message.success('Trial updated successfully!');
      } else {
        // Create new trial
        // In a real app, this would call an API
        message.success('Trial created successfully!');
      }
      
      setIsModalVisible(false);
      
      // Refresh trials list
      // In a real app, this would be handled by the API response
      const response = await trialService.getAllTrials();
      if (response.success) {
        setTrials(response.trials);
      }
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // In a real app, this would call an API to delete the trial
      message.success('Trial deleted successfully!');
      
      // Refresh trials list
      const response = await trialService.getAllTrials();
      if (response.success) {
        setTrials(response.trials);
      }
    } catch (error) {
      console.error('Error deleting trial:', error);
      message.error('Failed to delete trial');
    }
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Trial) => <a onClick={() => showEditModal(record)}>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Trial) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </Space>
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
        <Title level={2} style={{ margin: 0 }}>Manage Clinical Trials</Title>
      </Row>

      <Row justify="end" style={{ marginBottom: '16px' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={showAddModal}
        >
          Add New Trial
        </Button>
      </Row>

      <Table 
        columns={columns} 
        dataSource={trials} 
        rowKey="id" 
        loading={loading}
      />

      <Modal
        title={editingTrial ? 'Edit Trial' : 'Add New Trial'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Trial Title"
                rules={[{ required: true, message: 'Please enter trial title' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter trial description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select>
                  <Option value="recruiting">Recruiting</Option>
                  <Option value="active">Active</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please enter location' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please enter start date' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please enter end date' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="compensation"
            label="Compensation"
            rules={[{ required: true, message: 'Please enter compensation details' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactEmail"
                label="Contact Email"
                rules={[{ required: true, message: 'Please enter contact email' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contactPhone"
                label="Contact Phone"
                rules={[{ required: true, message: 'Please enter contact phone' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageTrials;