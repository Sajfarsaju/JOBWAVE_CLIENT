
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useSelector } from 'react-redux'
import NotFoundPage from './pages/404Page'
import UserRoutes from './routes/UserRoutes'
import CompanyRoutes from './routes/CompanyRoutes'
import AdminRoutes from './routes/AdminRoutes'


function App() {

  const userAuth = Boolean(useSelector((state)=>state.user.token));
  const companyAuth = Boolean(useSelector((state)=>state.company.token));
  const adminAuth = Boolean(useSelector((state)=>state.admin.token));

  return (

    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserRoutes userAuth={userAuth} />} />  
        {/* Company Routes */}
        <Route path="/company/*" element={<CompanyRoutes companyAuth={companyAuth} />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes adminAuth={adminAuth} />} />
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App