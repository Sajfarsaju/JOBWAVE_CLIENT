import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLoginPage from '.././pages/admin/LoginPage'
import DashboardPage from '.././pages/admin/DashboardPage';
import CategoryPage from '.././pages/admin/categoryPage';
import UsersPage from '.././pages/admin/usersPage';
import JobListPage from '.././pages/admin/jobsPage';

const AdminRoutes = ({ adminAuth }) => {
 return (
    <Routes>
      <Route path="/" element={adminAuth ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />} />
      <Route path="/dashboard" element={adminAuth ? <DashboardPage /> : <Navigate to="/admin" />} />
      <Route path="/categories" element={adminAuth ? <CategoryPage /> : <Navigate to="/admin" />} />
      <Route path="/users_list" element={adminAuth ? <UsersPage /> : <Navigate to="/admin" />} />
      <Route path="/job_list" element={adminAuth ? <JobListPage /> : <Navigate to="/admin" />} />
    </Routes>
 );
};

export default AdminRoutes;
