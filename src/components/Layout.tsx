import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, ExperimentOutlined, BookOutlined, MailOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '40px' }}>
            <Link to="/" style={{ color: 'white' }}>Trial Bridge</Link>
          </div>
          <Menu 
            theme="dark" 
            mode="horizontal" 
            selectedKeys={[location.pathname]}
            style={{ flex: 1 }}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/public/about" icon={<InfoCircleOutlined />}>
              <Link to="/public/about">About</Link>
            </Menu.Item>
            <Menu.Item key="/public/trials" icon={<ExperimentOutlined />}>
              <Link to="/public/trials">Trials</Link>
            </Menu.Item>
            <Menu.Item key="/public/resources" icon={<BookOutlined />}>
              <Link to="/public/resources">Resources</Link>
            </Menu.Item>
            <Menu.Item key="/public/contact" icon={<MailOutlined />}>
              <Link to="/public/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Space>
          <Button type="primary" icon={<UserOutlined />} onClick={() => navigate('/patient/login')}>
            Patient Portal
          </Button>
          <Button icon={<TeamOutlined />} onClick={() => navigate('/trial-team/login')}>
            Trial Team Portal
          </Button>
        </Space>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Trial Bridge ©{new Date().getFullYear()} - Connecting Patients with Clinical Trials
      </Footer>
    </Layout>
  );
};

export default MainLayout;