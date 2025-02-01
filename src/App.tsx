import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AuthLayout } from './components/Layout/AuthLayout';
import { DashboardLayout } from './components/Layout/DashboardLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EmployeesPage } from './pages/admin/EmployeesPage';
import { EmployeeDetailsPage } from './pages/admin/EmployeeDetailsPage';
import { ProjectsPage } from './pages/admin/ProjectsPage';
import { ProjectDetailsPage } from './pages/shared/ProjectDetailsPage';
import { DocumentsPage } from './pages/admin/DocumentsPage';
import { OfficeLayoutPage } from './pages/admin/OfficeLayoutPage';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { TeamCommunicationPage } from './pages/employee/TeamCommunicationPage';
import { JobApplicationsPage } from './pages/employee/JobApplicationsPage';
import { ProfilePage } from './pages/shared/ProfilePage';
import { ChangePasswordPage } from './pages/shared/ChangePasswordPage';
import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<AuthLayout />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="employees/:id" element={<EmployeeDetailsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="office-layout" element={<OfficeLayoutPage />} />
          </Route>

          {/* Employee Routes */}
          <Route path="/employee" element={<DashboardLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="team" element={<TeamCommunicationPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailsPage />} />
            <Route path="jobs" element={<JobApplicationsPage />} />
            <Route path="office-layout" element={<OfficeLayoutPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;