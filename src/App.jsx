import RegisterPage from './pages/user/RegisterPage'
import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Homepage from './pages/user/Homepage'
import { useSelector } from 'react-redux'
import CompanyRegisterPage from './pages/company/RegisterPage'
import CompanyHomepage from './pages/company/HomePage'
import AdminLoginPage from './pages/admin/LoginPage'
// import WelcomeModalHome from './components/user/WelcomeModalHome'
import DashboardPage from './pages/admin/DashboardPage'
import CategoryPage from './pages/admin/categoryPage'
import Login from './components/Login'
import MyJobs from './pages/company/MyJobs'
import JobsPage from './pages/user/JobsPage'
import ProfilePage from './pages/user/ProfilePage'
import JobSinglePage from './pages/user/JobSinglePage'
import Userpro from './components/user/profile/userpro'
import NotFoundPage from './pages/404Page'
import UsersPage from './pages/admin/usersPage'
import PhoneLogin from './components/PhoneLogin'
// import VerifyEmail from './components/emailVerify/verifyEmail'
import ForgotPassword from './components/forgot-password/Forgot-password'
import PaymentSuccess from './components/company/paymentStatus/paymentSuccess'
import PaymentFailure from './components/company/paymentStatus/paymentFailure'
import JobListPage from './pages/admin/jobsPage'
import Profile from './pages/company/ProfilePage'
import AppliedJobsPage from './pages/user/AppliedJobsPage'
import Chatpage from './pages/user/Chatpage'
import ChatpageCompany from './pages/company/ChatPage'
import PaymentsuccessUser from './components/user/subscriptionPlan/paymentSuccess'
import PaymentFailedUser from './components/user/subscriptionPlan/paymentFailure'
import CandidatesPage from './pages/company/CandidatesPage'
import InterViewTime from './components/company/candidates/InterViewTime'
import HiredCandidates from './components/company/candidates/HiredCandidates'
import SignupOtp from './components/user/SIgnupOtp'




function App() {

  const userAuth = Boolean(useSelector((state)=>state.user.token));
  const companyAuth = Boolean(useSelector((state)=>state.company.token));
  const adminAuth = Boolean(useSelector((state)=>state.admin.token));

  return (

      <BrowserRouter>

       <Toaster position="top-center" reverseOrder={false} />
       
      <Routes>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
        {/* 404 Page */}

        {/* Forgot-password */}
        {/* <Route path='/:id/verify/:token' element={<VerifyEmail/>} /> */}
        {/* Forgot-password */}

        {/* Forgot Pass Route*/}
        <Route path='/forgot_password' element={<ForgotPassword/>} />
        {/* Email Verify Route */}
        
        {/* User */}
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={userAuth ? <Navigate to='/'/> : <Login logerName='user' url='login' />}></Route>
        <Route path='/signup' element={userAuth ? <Navigate to='/'/> : <RegisterPage/>}></Route>
        <Route path='/verifyPhone' element={userAuth ? <Navigate to='/'/> : <SignupOtp/>}></Route>
        <Route path='/jobs' element={userAuth ? <JobsPage/> : <Navigate to='/login'/>}></Route>
        <Route path='/jobs/jobview/:jobId' element={userAuth ? <JobSinglePage/> : <Navigate to='/login'/>}></Route>
        <Route path='/profile' element={userAuth ? <ProfilePage/> : <Navigate to='/login'/>}></Route>
        <Route path='/profile/applied_jobs' element={userAuth ? <AppliedJobsPage/> : <Navigate to='/login'/>}></Route>
        <Route path='/login_with_phone' element={userAuth ? <Navigate to='/'/> : <PhoneLogin/>}></Route>
        {/* <Route path='/support' element={userAuth ? <Userpro/> : <Navigate to='/login'/>}></Route> */}
        <Route path='/chats/:companyId' element={userAuth ? <Chatpage/> : <Navigate to='/login'/>}></Route>
        {/* Payment Status Company */}
        <Route path='/payment_successfully' element={<PaymentsuccessUser/>} />
        <Route path='/payment_failed' element={<PaymentFailedUser/>} />
        {/* Payment Status Company */}



        {/* Company  */}
        <Route path='/company/home' element={companyAuth ? <CompanyHomepage/> : <Navigate to='/company/login'/>}></Route>
        <Route path='/company/login' element={companyAuth ? <Navigate to='/company/home'/> : <Login logerName='company' url='company/login' />}></Route>
        <Route path='/company/signup' element={companyAuth ? <Navigate to='/company/home'/> : <CompanyRegisterPage/>}></Route>
        <Route path='/company/joblist' element={companyAuth ? <MyJobs/> : <Navigate to='/company/login'/> }></Route>
        <Route path='/company/profile' element={companyAuth ? <Profile/> : <Navigate to='/company/login'/> }></Route>
        <Route path='/company/chats' element={companyAuth ? <ChatpageCompany/> : <Navigate to='/company/login'/>}></Route>
        <Route path='/company/candidates' element={companyAuth ? <CandidatesPage/> : <Navigate to='/company/login'/>}></Route>
        <Route path='/company/candidates/interviewTimes' element={companyAuth ? <InterViewTime/> : <Navigate to='/company/login'/>}></Route>
        <Route path='/company/candidates/hired_candidates' element={companyAuth ? <HiredCandidates/> : <Navigate to='/company/login'/>}></Route>
        {/* Payment Status Company */}
        <Route path='/company/payment_successfully' element={<PaymentSuccess/>} />
        <Route path='/company/payment_failed' element={<PaymentFailure/>} />
        {/* Payment Status Company */}

        

        {/* Admin */}
        <Route path='/admin' element={adminAuth ? <Navigate to='/admin/dashboard'/> : <AdminLoginPage/>}> </Route>
        <Route path='/admin/dashboard' element={adminAuth ? <DashboardPage/> : <Navigate to='/admin'/>}/>
        <Route path='/admin/categories' element={adminAuth ? <CategoryPage/> : <Navigate to='/admin'/>}/>
        <Route path='/admin/users_list' element={adminAuth ? <UsersPage/> : <Navigate to='/admin'/>}/>
        <Route path='/admin/job_list' element={adminAuth ? <JobListPage/> : <Navigate to='/admin'/>}/>
        

        
      </Routes>
      
      </BrowserRouter>

  )
}

export default App