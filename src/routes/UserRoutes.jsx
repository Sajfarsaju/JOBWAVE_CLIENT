import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/user/Homepage'
import Login from '../components/Login'
import RegisterPage from '../pages/user/RegisterPage';
import SignupOtp from '../components/user/SIgnupOtp';
import JobsPage from '../pages/user/JobsPage';
import JobSinglePage from '../pages/user/JobSinglePage';
import ProfilePage from './../pages/user/ProfilePage';
import AppliedJobsPage from './../pages/user/AppliedJobsPage';
import PhoneLogin from '../components/PhoneLogin';
import Chatpage from './../pages/user/Chatpage';
import AboutCompanyPage from './../pages/user/AboutCompanyPage'
import PaymentsuccessUser from '../components/user/subscriptionPlan/paymentSuccess';
import PaymentFailedUser from '../components/user/subscriptionPlan/paymentFailure';
import ForgotPassword from '../components/forgot-password/Forgot-password'

const UserRoutes = ({ userAuth }) => {
 return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={userAuth ? <Navigate to="/" /> : <Login logerName="user" url="login" />} />
      <Route path="/forgot_password" element={userAuth ? <Navigate to="/" /> : <ForgotPassword />} />
      <Route path="/signup" element={userAuth ? <Navigate to="/" /> : <RegisterPage />} />
      <Route path="/verifyOtp" element={userAuth ? <Navigate to="/" /> : <SignupOtp />} />
      <Route path="/jobs" element={userAuth ? <JobsPage /> : <Navigate to="/login" />} />
      <Route path="/jobs/jobview/:jobId" element={userAuth ? <JobSinglePage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={userAuth ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/profile/applied_jobs" element={userAuth ? <AppliedJobsPage /> : <Navigate to="/login" />} />
      <Route path="/login_with_otp" element={userAuth ? <Navigate to="/" /> : <PhoneLogin />} />
      <Route path="/chats/:companyId" element={userAuth ? <Chatpage /> : <Navigate to="/login" />} />
      <Route path="/about_company/:companyId" element={userAuth ? <AboutCompanyPage /> : <Navigate to="/login" />} />
      <Route path="/payment_successfully" element={<PaymentsuccessUser />} />
      <Route path="/payment_failed" element={<PaymentFailedUser />} />
    </Routes>
 );
};

export default UserRoutes;
