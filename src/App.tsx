import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import MainLayout from './components/Layout'

// Lazy load components for better performance
// Public pages
const PublicHome = React.lazy(() => import('./pages/public/Home'))
const PublicAbout = React.lazy(() => import('./pages/public/About'))
const PublicTrials = React.lazy(() => import('./pages/public/Trials'))
const PublicResources = React.lazy(() => import('./pages/public/Resources'))
const PublicContact = React.lazy(() => import('./pages/public/Contact'))

// Patient pages
const PatientLogin = React.lazy(() => import('./pages/patient/Login'))
const PatientRegister = React.lazy(() => import('./pages/patient/Register'))
const PatientDashboard = React.lazy(() => import('./pages/patient/Dashboard'))
const PatientFindTrials = React.lazy(() => import('./pages/patient/FindTrials'))
const PatientScheduleAppointment = React.lazy(() => import('./pages/patient/ScheduleAppointment'))
const PatientHealthData = React.lazy(() => import('./pages/patient/HealthData'))
const PatientTrialRiskAssessment = React.lazy(() => import('./pages/patient/TrialRiskAssessment'))
const PatientInformationPlaza = React.lazy(() => import('./pages/patient/InformationPlaza'))
const PatientTrialConsultation = React.lazy(() => import('./pages/patient/TrialConsultation'))
const PatientRewardMechanism = React.lazy(() => import('./pages/patient/RewardMechanism'))

// Trial team pages
const TrialTeamLogin = React.lazy(() => import('./pages/trial-team/Login'))
const TrialTeamRegister = React.lazy(() => import('./pages/trial-team/Register'))
const TrialTeamDashboard = React.lazy(() => import('./pages/trial-team/Dashboard'))
const TrialTeamManageTrials = React.lazy(() => import('./pages/trial-team/ManageTrials'))
const TrialTeamViewPatients = React.lazy(() => import('./pages/trial-team/ViewPatients'))
const TrialTeamReviewApplications = React.lazy(() => import('./pages/trial-team/ReviewApplications'))

const LoadingFallback: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Spin size="large" />
  </div>
)

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <MainLayout>
          <Routes>
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/find-trials" element={<PatientFindTrials />} />
          <Route path="/patient/schedule-appointment" element={<PatientScheduleAppointment />} />
          <Route path="/patient/health-data" element={<PatientHealthData />} />
          <Route path="/patient/trial-risk-assessment" element={<PatientTrialRiskAssessment />} />
          <Route path="/patient/information-plaza" element={<PatientInformationPlaza />} />
          <Route path="/patient/trial-consultation" element={<PatientTrialConsultation />} />
          <Route path="/patient/reward-mechanism" element={<PatientRewardMechanism />} />
          
          <Route path="/trial-team/login" element={<TrialTeamLogin />} />
          <Route path="/trial-team/register" element={<TrialTeamRegister />} />
          <Route path="/trial-team/dashboard" element={<TrialTeamDashboard />} />
          <Route path="/trial-team/manage-trials" element={<TrialTeamManageTrials />} />
          <Route path="/trial-team/view-patients" element={<TrialTeamViewPatients />} />
          <Route path="/trial-team/review-applications" element={<TrialTeamReviewApplications />} />
          
          {/* Public Routes */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/public/about" element={<PublicAbout />} />
          <Route path="/public/trials" element={<PublicTrials />} />
          <Route path="/public/resources" element={<PublicResources />} />
          <Route path="/public/contact" element={<PublicContact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </MainLayout>
      </React.Suspense>
    </ConfigProvider>
  )
}

export default App