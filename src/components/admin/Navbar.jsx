import React, { useState } from 'react'
import { Link, useNavigate ,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminLogout } from '../../store/slice/adminSlice'



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

      <nav className="bg-slate-100 shadow-lg dark:bg-w-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="lg:flex lg:items-center">
            <div className="flex items-center justify-between">
              <a href="#">
                <img className="w-auto h-6 sm:h-7" src="https://toppng.com/uploads/preview/design-for-logo-11549988276bxsuzsd1y1.png" alt="" />
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

                {/* <div className="relative mt-4 lg:mt-0 lg:mx-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-4 h-4 text-gray-600 dark:text-slate-950" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <input
                  type="text"
                  className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-slate-950 dark:placeholder-slate-950 dark:focus:border-slate-950 lg:w-56 lg:border-transparent dark:bg-white-800 dark:text-slate-950 focus:outline-none focus:border-slate-950"
                  placeholder="Search"
                />
              </div> */}
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


      {/*Slidebar  */}
      {/*
 <div className="fixed flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64  h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar">
  <div className="overflow-y-auto overflow-x-hidden flex bg-green-300 shadow-lg shadow-gray-300 flex-col justify-between flex-grow">
    <ul className="flex flex-col py-4 space-y-1">
      <li>
        <Link to={'/admin/dashboard'} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-400 text-gray-800 hover:text-gray-800 border-l-4 border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                <span class="mx-2 text-sm font-medium">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to={'/admin/categories'} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-400 text-gray-800 hover:text-gray-800 border-l-4 border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>

                <span class="mx-2 text-sm font-medium">Categories</span>
        </Link>
      </li>
      <li>
        <Link to={'/admin/usersList'} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-400 text-gray-800 hover:text-gray-800 border-l-4 border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>

                <span class="mx-2 text-sm font-medium">Users</span>
        </Link>
      </li>
      <li>
        <Link href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-400 text-gray-800 hover:text-gray-800 border-l-4 border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>

                <span class="mx-2 text-sm font-medium">Companies</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-400 text-gray-800 hover:text-gray-800 border-l-4 border-transparent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
          <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
        </Link>
      </li>
    </ul>
    <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2023 #JobWave</p>
  </div>
</div> */}
      {/*  */}
    </>
  )
}

export default Navbar