import React, { useState, useEffect } from 'react';
import { Typography, Button, Row, Tabs, Table, Tag, Empty, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, HeartOutlined, ExperimentOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { patientService } from '../../services/patientService';
import type { HealthRecord } from '../../services/patientService';

const { Title } = Typography;
const { TabPane } = Tabs;

const HealthData: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  // Fetch health records
  useEffect(() => {
    const fetchHealthRecords = async () => {
      if (currentUser?.email) {
        try {
          const response = await patientService.getPatientHealthRecords(currentUser.email);
          if (response.success) {
            setHealthRecords(response.records || []);
          }
        } catch (error) {
          console.error('Error fetching health records:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHealthRecords();
  }, [currentUser]);

  const handleBackToDashboard = () => {
    navigate('/patient/dashboard');
  };

  // Filter records by type
  const vitalRecords = healthRecords.filter(record => record.type === 'vital');
  const labRecords = healthRecords.filter(record => record.type === 'lab');
  const medicationRecords = healthRecords.filter(record => record.type === 'medication');

  // Columns for vital signs table
  const vitalColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Blood Pressure',
      dataIndex: 'data',
      key: 'bloodPressure',
      render: (data: any) => data.bloodPressure || 'N/A',
    },
    {
      title: 'Heart Rate',
      dataIndex: 'data',
      key: 'heartRate',
      render: (data: any) => data.heartRate ? `${data.heartRate} bpm` : 'N/A',
    },
    {
      title: 'Temperature',
      dataIndex: 'data',
      key: 'temperature',
      render: (data: any) => data.temperature ? `${data.temperature} °F` : 'N/A',
    },
    {
      title: 'Respiratory Rate',
      dataIndex: 'data',
      key: 'respiratoryRate',
      render: (data: any) => data.respiratoryRate ? `${data.respiratoryRate} breaths/min` : 'N/A',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
  ];

  // Columns for lab results table
  const labColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Test Name',
      dataIndex: 'data',
      key: 'testName',
      render: (data: any) => data.testName || 'N/A',
    },
    {
      title: 'Result',
      dataIndex: 'data',
      key: 'result',
      render: (data: any) => data.result || 'N/A',
    },
    {
      title: 'Reference Range',
      dataIndex: 'data',
      key: 'referenceRange',
      render: (data: any) => data.referenceRange || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'data',
      key: 'status',
      render: (data: any) => {
        if (!data.status) return <Tag>N/A</Tag>;
        
        let color = 'green';
        if (data.status === 'abnormal') {
          color = 'orange';
        } else if (data.status === 'critical') {
          color = 'red';
        }
        
        return (
          <Tag color={color}>
            {data.status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
  ];

  // Columns for medications table
  const medicationColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Medication',
      dataIndex: 'data',
      key: 'medication',
      render: (data: any) => data.medication || 'N/A',
    },
    {
      title: 'Dosage',
      dataIndex: 'data',
      key: 'dosage',
      render: (data: any) => data.dosage || 'N/A',
    },
    {
      title: 'Frequency',
      dataIndex: 'data',
      key: 'frequency',
      render: (data: any) => data.frequency || 'N/A',
    },
    {
      title: 'Prescribed By',
      dataIndex: 'provider',
      key: 'provider',
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
        <Title level={2} style={{ margin: 0 }}>My Health Data</Title>
      </Row>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Tabs defaultActiveKey="vitals">
          <TabPane 
            tab={<span><HeartOutlined /> Vital Signs</span>}
            key="vitals"
          >
            {vitalRecords.length > 0 ? (
              <Table 
                dataSource={vitalRecords} 
                columns={vitalColumns} 
                rowKey="id" 
                pagination={false}
              />
            ) : (
              <Empty description="No vital sign records found" />
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><ExperimentOutlined /> Lab Results</span>}
            key="labs"
          >
            {labRecords.length > 0 ? (
              <Table 
                dataSource={labRecords} 
                columns={labColumns} 
                rowKey="id" 
                pagination={false}
              />
            ) : (
              <Empty description="No lab result records found" />
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><MedicineBoxOutlined /> Medications</span>}
            key="medications"
          >
            {medicationRecords.length > 0 ? (
              <Table 
                dataSource={medicationRecords} 
                columns={medicationColumns} 
                rowKey="id" 
                pagination={false}
              />
            ) : (
              <Empty description="No medication records found" />
            )}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default HealthData;