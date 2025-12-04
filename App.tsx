import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { Layout } from './components/Layout';
import { HomePage, AboutPage, ServicesPage, BlogPage, ContactPage } from './pages/Public';
import { AdminDashboard } from './pages/Admin';

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          {/* Admin Routes - No Layout */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          
          {/* Public Routes - With Layout */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SiteProvider>
  );
};

export default App;
