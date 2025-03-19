import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Col, Table, Tag, Space, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { patientService } from '../../services/patientService';
import type { PatientProfile } from '../../services/patientService';

const { Title } = Typography;

const ViewPatients: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'trialTeam') {
      navigate('/trial-team/login');
    }
  }, [currentUser, navigate]);

  // Fetch patients data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientService.getAllPatients();
        if (response.success) {
          setPatients(response.patients || []);
        } else {
          message.error('Failed to load patients');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        message.error('An error occurred while loading patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleBackToDashboard = () => {
    navigate('/trial-team/dashboard');
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => gender.charAt(0).toUpperCase() + gender.slice(1),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Medical Conditions',
      dataIndex: 'medicalHistory',
      key: 'conditions',
      render: (medicalHistory: any) => (
        <Space size="small" wrap>
          {medicalHistory.conditions.map((condition: string, index: number) => (
            <Tag color="blue" key={index}>
              {condition}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="small">
          <Button type="link">View Details</Button>
          <Button type="link">Enroll in Trial</Button>
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
        <Title level={2} style={{ margin: 0 }}>Enrolled Patients</Title>
      </Row>

      <Row justify="end" style={{ marginBottom: '16px' }}>
        <Col span={6}>
          <Input
            placeholder="Search by name or email"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value)}
            allowClear
          />
        </Col>
      </Row>

      <Table 
        columns={columns} 
        dataSource={filteredPatients} 
        rowKey="email" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ViewPatients;