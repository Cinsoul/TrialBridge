import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Row, Col, Form, DatePicker, Select, Input, TimePicker, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface AppointmentForm {
  date: Date;
  time: Date;
  type: string;
  doctor: string;
  location: string;
  notes: string;
}

const ScheduleAppointment: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  const handleBackToDashboard = () => {
    navigate('/patient/dashboard');
  };

  const onFinish = async (_values: AppointmentForm) => {
    setLoading(true);
    try {
      // In a real app, this would call an API to schedule the appointment
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      message.success('Appointment scheduled successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      message.error('Failed to schedule appointment');
    } finally {
      setLoading(false);
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
        <Title level={2} style={{ margin: 0 }}>Schedule Appointment</Title>
      </Row>

      <Card>
        <Form
          form={form}
          name="appointment_form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: 'Please select a time' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Appointment Type"
                rules={[{ required: true, message: 'Please select appointment type' }]}
              >
                <Select placeholder="Select appointment type">
                  <Option value="initial">Initial Consultation</Option>
                  <Option value="followup">Follow-up Visit</Option>
                  <Option value="screening">Trial Screening</Option>
                  <Option value="treatment">Treatment Session</Option>
                  <Option value="checkup">Regular Check-up</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="doctor"
                label="Doctor/Specialist"
                rules={[{ required: true, message: 'Please select a doctor' }]}
              >
                <Select placeholder="Select doctor">
                  <Option value="dr_johnson">Dr. Johnson (Cardiologist)</Option>
                  <Option value="dr_smith">Dr. Smith (Neurologist)</Option>
                  <Option value="dr_patel">Dr. Patel (Endocrinologist)</Option>
                  <Option value="dr_williams">Dr. Williams (Rheumatologist)</Option>
                  <Option value="dr_chen">Dr. Chen (Oncologist)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please select a location' }]}
          >
            <Select placeholder="Select location">
              <Option value="main_clinic">Main Clinic - 123 Medical Center Dr</Option>
              <Option value="north_branch">North Branch - 456 Health Parkway</Option>
              <Option value="south_branch">South Branch - 789 Wellness Blvd</Option>
              <Option value="research_center">Clinical Research Center - 101 Science Ave</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes (Optional)"
          >
            <TextArea rows={4} placeholder="Any additional information or special requests" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Schedule Appointment
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ScheduleAppointment;