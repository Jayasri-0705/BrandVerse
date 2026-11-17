import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CareersPage from './pages/CareersPage';
import JobDetailPage from './pages/JobDetailPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Imports
import AdminLoginPage from './admin/AdminLoginPage';
import AdminLayout from './admin/AdminLayout';
import ProtectedRoute from './admin/ProtectedRoute';
import DashboardOverview from './admin/DashboardOverview';
import ServicesManagement from './admin/ServicesManagement';
import ProjectsManagement from './admin/ProjectsManagement';
import JobsManagement from './admin/JobsManagement';
import ApplicationsManagement from './admin/ApplicationsManagement';
import EnquiriesManagement from './admin/EnquiriesManagement';
import TeamManagement from './admin/TeamManagement';
import TestimonialsManagement from './admin/TestimonialsManagement';
import CompanyInfoManagement from './admin/CompanyInfoManagement';
import SettingsManagement from './admin/SettingsManagement';
import AdminProfilePage from './admin/AdminProfilePage';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/:slug" element={<ProjectDetailPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="careers/:slug" element={<JobDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsConditionsPage />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="projects" element={<ProjectsManagement />} />
        <Route path="jobs" element={<JobsManagement />} />
        <Route path="applications" element={<ApplicationsManagement />} />
        <Route path="enquiries" element={<EnquiriesManagement />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="testimonials" element={<TestimonialsManagement />} />
        <Route path="company" element={<CompanyInfoManagement />} />
        <Route path="settings" element={<SettingsManagement />} />
        <Route path="profile" element={<AdminProfilePage />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
