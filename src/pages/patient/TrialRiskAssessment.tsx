import React, { useState } from 'react';
import { Typography, Card, Form, Input, Select, Button, Row, Col, Steps, Result, Space, Alert, Statistic } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, SafetyOutlined, FileTextOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { patientService } from '../../services/patientService';
import type { Trial } from '../../services/trialService';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

interface RiskAssessmentProps {
  trial?: Trial;
  onComplete?: (result: RiskAssessmentResult) => void;
  standalone?: boolean;
}

export interface RiskAssessmentResult {
  score: number;
  recommendation: string;
  riskLevel: 'low' | 'moderate' | 'high';
  matchPercentage: number;
}

const TrialRiskAssessment: React.FC<RiskAssessmentProps> = ({ trial, onComplete, standalone = true }) => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentResult, setAssessmentResult] = useState<RiskAssessmentResult | null>(null);
  const [healthDataImported, setHealthDataImported] = useState(false);

  // Check if user is logged in
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      navigate('/patient/login');
    }
  }, [currentUser, navigate]);

  const handleBack = () => {
    if (standalone) {
      navigate(-1);
    }
  };

  const handleImportHealthData = async () => {
    try {
      // In a real app, this would fetch the patient's health data
      const response = await patientService.getPatientProfile(currentUser?.email || '');
      if (response.success) {
        const medicalHistory = response.profile?.medicalHistory;
        
        // Pre-fill the form with imported health data
        form.setFieldsValue({
          conditions: medicalHistory?.conditions?.join(', ') || '',
          medications: medicalHistory?.medications?.join(', ') || '',
          allergies: medicalHistory?.allergies?.join(', ') || '',
          familyHistory: medicalHistory?.familyHistory?.join(', ') || ''
        });
        
        setHealthDataImported(true);
      }
    } catch (error) {
      console.error('Error importing health data:', error);
    }
  };

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    form.validateFields().then(() => {
      // In a real app, this would calculate a risk score based on the form data
      // and the specific trial requirements
      
      // Mock assessment result
      const result: RiskAssessmentResult = {
        score: 85,
        recommendation: 'Based on your health profile, you appear to be a good candidate for this trial. However, please consult with your healthcare provider before proceeding.',
        riskLevel: 'low',
        matchPercentage: 85
      };
      
      setAssessmentResult(result);
      setCurrentStep(currentStep + 1);
      
      if (onComplete) {
        onComplete(result);
      }
    });
  };

  const steps = [
    {
      title: 'Health Profile',
      content: (
        <>
          <Alert
            message="Your information is secure"
            description="The health information you provide is encrypted and will only be used for assessing your eligibility and potential risks for clinical trials."
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
          
          <Row justify="end" style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<FileTextOutlined />} 
              onClick={handleImportHealthData}
              disabled={healthDataImported}
            >
              {healthDataImported ? 'Health Data Imported' : 'Import My Health Data'}
            </Button>
          </Row>
          
          <Form.Item
            name="conditions"
            label="Medical Conditions"
            rules={[{ required: true, message: 'Please enter your medical conditions' }]}
          >
            <Input.TextArea 
              placeholder="List any diagnosed medical conditions (e.g., diabetes, hypertension)"
              rows={3}
            />
          </Form.Item>
          
          <Form.Item
            name="medications"
            label="Current Medications"
            rules={[{ required: true, message: 'Please enter your current medications' }]}
          >
            <Input.TextArea 
              placeholder="List all medications you are currently taking"
              rows={3}
            />
          </Form.Item>
          
          <Form.Item
            name="allergies"
            label="Allergies"
            rules={[{ required: true, message: 'Please enter your allergies' }]}
          >
            <Input.TextArea 
              placeholder="List any allergies to medications, foods, or other substances"
              rows={2}
            />
          </Form.Item>
          
          <Form.Item
            name="familyHistory"
            label="Family Medical History"
            rules={[{ required: true, message: 'Please enter your family medical history' }]}
          >
            <Input.TextArea 
              placeholder="List relevant family medical history"
              rows={2}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Lifestyle Factors',
      content: (
        <>
          <Form.Item
            name="smoking"
            label="Smoking Status"
            rules={[{ required: true, message: 'Please select your smoking status' }]}
          >
            <Select placeholder="Select your smoking status">
              <Option value="never">Never smoked</Option>
              <Option value="former">Former smoker</Option>
              <Option value="current">Current smoker</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="alcohol"
            label="Alcohol Consumption"
            rules={[{ required: true, message: 'Please select your alcohol consumption' }]}
          >
            <Select placeholder="Select your alcohol consumption">
              <Option value="none">None</Option>
              <Option value="occasional">Occasional (1-2 drinks per week)</Option>
              <Option value="moderate">Moderate (3-7 drinks per week)</Option>
              <Option value="heavy">Heavy (8+ drinks per week)</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="exercise"
            label="Physical Activity Level"
            rules={[{ required: true, message: 'Please select your physical activity level' }]}
          >
            <Select placeholder="Select your physical activity level">
              <Option value="sedentary">Sedentary (little to no exercise)</Option>
              <Option value="light">Light (1-3 days per week)</Option>
              <Option value="moderate">Moderate (3-5 days per week)</Option>
              <Option value="active">Active (6-7 days per week)</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="diet"
            label="Diet Description"
            rules={[{ required: true, message: 'Please describe your diet' }]}
          >
            <Input.TextArea 
              placeholder="Briefly describe your typical diet"
              rows={3}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Trial-Specific Questions',
      content: (
        <>
          <Paragraph>
            These questions are specific to {trial?.title || 'the selected clinical trial'}. Your answers help us assess your eligibility and potential risks.
          </Paragraph>
          
          <Form.Item
            name="previousTrials"
            label="Previous Clinical Trial Participation"
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <Select placeholder="Have you participated in clinical trials before?">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="availability"
            label="Availability for Trial Visits"
            rules={[{ required: true, message: 'Please select your availability' }]}
          >
            <Select placeholder="Select your availability for trial visits">
              <Option value="weekdays">Weekdays only</Option>
              <Option value="weekends">Weekends only</Option>
              <Option value="both">Both weekdays and weekends</Option>
              <Option value="limited">Limited availability</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="transportation"
            label="Transportation to Trial Site"
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <Select placeholder="Do you have reliable transportation to the trial site?">
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
              <Option value="sometimes">Sometimes</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="concerns"
            label="Concerns or Questions"
          >
            <Input.TextArea 
              placeholder="List any concerns or questions you have about participating in this trial"
              rows={3}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Results',
      content: assessmentResult ? (
        <Result
          status={assessmentResult.riskLevel === 'low' ? 'success' : 'warning'}
          title={`Risk Assessment Complete - ${assessmentResult.matchPercentage}% Match`}
          subTitle={assessmentResult.recommendation}
          extra={[
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card title="Risk Assessment Summary">
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic 
                      title="Risk Level" 
                      value={assessmentResult.riskLevel.charAt(0).toUpperCase() + assessmentResult.riskLevel.slice(1)} 
                      valueStyle={{ color: assessmentResult.riskLevel === 'low' ? '#3f8600' : assessmentResult.riskLevel === 'moderate' ? '#faad14' : '#cf1322' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic 
                      title="Match Score" 
                      value={assessmentResult.score} 
                      suffix="/100"
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic 
                      title="Compatibility" 
                      value={assessmentResult.matchPercentage} 
                      suffix="%"
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Col>
                </Row>
              </Card>
              
              <Alert
                message="Next Steps"
                description="We recommend discussing these results with your healthcare provider before proceeding with the trial application."
                type="info"
                showIcon
              />
              
              {standalone && (
                <Button type="primary" onClick={() => navigate('/patient/find-trials')}>
                  Return to Trial Search
                </Button>
              )}
            </Space>
          ]}
        />
      ) : null,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {standalone && (
        <Row align="middle" style={{ marginBottom: '24px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginRight: '16px' }}
          >
            Back
          </Button>
          <Title level={2} style={{ margin: 0 }}>
            <SafetyOutlined style={{ marginRight: 8 }} />
            Trial Risk Assessment
          </Title>
        </Row>
      )}

      <Card>
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          requiredMark="optional"
        >
          <div>{steps[currentStep].content}</div>

          {currentStep < steps.length - 1 && (
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
              {currentStep > 0 && (
                <Button onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <div style={{ flex: '1 1 0' }} />
              <Button type="primary" onClick={currentStep === steps.length - 2 ? handleSubmit : handleNext}>
                {currentStep === steps.length - 2 ? 'Submit' : 'Next'}
              </Button>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default TrialRiskAssessment;