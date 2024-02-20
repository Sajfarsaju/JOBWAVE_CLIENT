import React, { useState } from 'react'
import { Link, useNavigate ,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../store/slice/adminSlice'
import jobWaveLogo from '/src/assets/JOBWAVELOGO.png'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const { pathname } = useLocation();


  const dispatch = useDispatch()
  const logout = () => {
    dispatch(adminLogout());
    navigate('/admin')
  }

  return (

    <>

      <nav className="font-dm-sans font-normal bg-slate-100">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center">
            <div className="flex items-center justify-between">
              <a href="#">
                <img className="w-auto h-14 sm:h-14" src={jobWaveLogo} alt="" />
              </a>


              <div className="flex lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-800 dark:text-gray-800 hover:text-gray-800 dark:hover:text-gray-700 focus:outline-none focus:text-gray-600 dark:focus:text-gray-700" aria-label="toggle menu">
                  {!isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center`}>
              <div className="flex flex-col text-gray-600 capitalize dark:text-slate-950 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
                
                <Link to={'/admin/dashboard'} className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4  dark:hover:text-emerald-700
                ${pathname === '/admin/dashboard' ? 'dark:text-emerald-500' : 'dark:text-slate-950'
                }`}>Dashboard</Link>

                <Link to={'/admin/categories'} className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4  dark:hover:text-emerald-700
                ${pathname === '/admin/categories' ? 'dark:text-emerald-500' : 'dark:text-slate-950'
                }`}>Categories</Link>
                
                <Link to={'/admin/users_list'} className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4  dark:hover:text-emerald-700
                ${pathname === '/admin/users_list' ? 'dark:text-emerald-500' : 'dark:text-slate-950' 
                }`}>Users</Link>

                <Link to={'/admin/job_list'} className={`mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 dark:hover:text-emerald-700
                ${pathname === '/admin/job_list' ? 'dark:text-emerald-500' : 'dark:text-slate-950' }  `}>Jobs</Link>
                <Link to={''} className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4  dark:hover:text-emerald-700">blog</Link>

              </div>

              <div className="flex justify-end mt-6 lg:flex lg:mt-0 lg:-mx-2">
                <Link className='' onClick={logout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/*  */}
    </>
  )
}

export default Navbar