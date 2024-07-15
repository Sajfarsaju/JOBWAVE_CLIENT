import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CompanyHomepage from '.././pages/company/HomePage';
import Login from '../components/Login'
import CompanyRegisterPage from '.././pages/company/RegisterPage';
import MyJobs from '.././pages/company/MyJobs';
import Profile from '.././pages/company/ProfilePage';
import ChatpageCompany from '.././pages/company/ChatPage';
import CandidatesPage from '.././pages/company/CandidatesPage';
import AboutCandidatePage from '.././pages/company/AboutCandidatePage';
import InterViewTime from '../components/company/candidates/InterViewTime';
import HiredCandidates from '../components/company/candidates/HiredCandidates';
import PaymentSuccess from '../components/company/paymentStatus/paymentSuccess';
import PaymentFailure from '../components/company/paymentStatus/paymentFailure';

const CompanyRoutes = ({ companyAuth }) => {
 return (
    <Routes>
      <Route path="/home" element={companyAuth ? <CompanyHomepage /> : <Navigate to="/company/login" />} />
      <Route path="/login" element={companyAuth ? <Navigate to="/company/home" /> : <Login logerName="company" url="company/login" />} />
      <Route path="/signup" element={companyAuth ? <Navigate to="/company/home" /> : <CompanyRegisterPage />} />
      <Route path="/joblist" element={companyAuth ? <MyJobs /> : <Navigate to="/company/login" />} />
      <Route path="/profile" element={companyAuth ? <Profile /> : <Navigate to="/company/login" />} />
      <Route path="/chats" element={companyAuth ? <ChatpageCompany /> : <Navigate to="/company/login" />} />
      <Route path="/candidates" element={companyAuth ? <CandidatesPage /> : <Navigate to="/company/login" />} />
      <Route path="/candidates/profile_view/:userName/:userId" element={companyAuth ? <AboutCandidatePage /> : <Navigate to="/company/login" />} />
      <Route path="/candidates/interviewTimes" element={companyAuth ? <InterViewTime /> : <Navigate to="/company/login" />} />
      <Route path="/candidates/interviewTimes" element={companyAuth ? <InterViewTime /> : <Navigate to="/company/login" />} />
      <Route path="/candidates/hired_candidates" element={companyAuth ? <HiredCandidates /> : <Navigate to="/company/login" />} />
      <Route path="/payment_successfully" element={<PaymentSuccess />} />
      <Route path="/payment_failed" element={<PaymentFailure />} />
    </Routes>
 );
};

export default CompanyRoutes;
