import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../../store/slice/userSlice'
import Axios_Instance from '../../../api/userAxios'
import Noimg from '../../../assets/empty-img2.png'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from '../../../../public/JobWave2-fotor-bg-remover-20230817153930.png'
import toast from 'react-hot-toast'
import axios from 'axios';



function Navbar({ searchValue, setSearchQuery, reRender, showSearchield}) {

  const navigate = useNavigate()
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(userLogout());
    navigate('/');
    setIsAlertOpen(false)
  }


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const [data, setData] = useState([])

  async function getUser() {
    try {
      const res = await axios.get('http://localhost:4005/profile',{
        headers: {
          'Authorization': `Bearer ${token}`
          // Add other headers if needed
        }
      });
      if(res.status === 200 ){

        setData(res?.data?.user)
      }

    } catch (error) {
      console.log(error);
      if (error.res?.status === 401 || error?.response?.data?.errMsg === 'Your account has been blocked') {
        dispatch(userLogout());
        toast.error(error?.response?.data?.errMsg);
      }
    }
  }
  useEffect(() => {

    getUser()
  }, [reRender])


  return (

    <>

      {/* <nav className="bg-slate-200 shadow-xl dark:bg-w-800 ">
      <div className="container px-40 py-4 mx-auto">
        <div className=" lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <a href="#">
              <img className="w-auto h-10 sm:h-10" src="../public/JobWave2-fotor-bg-remover-20230817153930.png" alt="" />
            </a> */}

      {/* Mobile menu button */}
      {/* <div className="flex lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-500 focus:outline-none focus:text-gray-600 dark:focus:text-gray-500" aria-label="toggle menu">
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
          </div> */}

      {/* <div className={`${isOpen ? 'block' : 'hidden'} mx-16 lg:flex lg:items-center`}>
            <div className="flex flex-col text-gray-600 capitalize dark:text-slate-950 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              <a href="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-cyan-700">User</a>
              <a href="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-cyan-700">downloads</a>
              <a href="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-cyan-700">docs</a>
              <a href="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-cyan-700">support</a>
              <a href="#" className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-cyan-700">blog</a> */}
      {/* Search */}
      {/* <div className="relative mt-4 lg:mt-0 lg:mx-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-4 h-4 text-gray-600 dark:text-slate-950" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                <input
                  type="text"
                  className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-slate-100 border-b border-slate-950 dark:placeholder-slate-950 dark:focus:border-slate-950 lg:w-56 lg:border-transparent dark:bg-white-800 dark:text-slate-950 focus:outline-none focus:border-slate-950"
                  placeholder="Search"
                />
              </div> */}
      {/*  */}
      {/* <div className="flex items-center mt-4 lg:mt-0">
                    <button className="hidden mx-4 text-black transition-colors duration-300 transform lg:block dark:text-gray-700  dark:hover:text-gray-800 focus:text-black dark:focus:text-gray-800 focus:outline-none" aria-label="show notifications">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                        <div className="w-8 h-8 overflow-hidden border-2 border-gray-700 rounded-full">
                            <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />
                        </div> */}

      {/* <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3> */}
      {/* </button>
                    <div>
                    {token ?  <Link className='px-7' onClick={logout} to={'/login'}>Logout</Link> : <Link className='px-7' to={'/login'}>Login</Link>}
                    </div>
                </div>

              
            </div> */}

      {/* <div className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
              <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z">
                  </path>
                </svg>
              </a>
              <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Github">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                  </path>
                </svg>
              </a>
              
            </div> */}
      {/**/}

      {/*  */}
      {/* </div>
        </div>
      </div>
    </nav> */}

      <Disclosure as="nav" className="bg-slate-100 shadow-xl ">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src={Logo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">

                      <Link
                        to="/"
                        className={`rounded-md px-3 py-2 text-md font-serif font-medium hover:text-emerald-700
                    ${pathname === '/' ? 'dark:text-emerald-500 border-b-2 border-emerald-500 ' : 'text-gray-900 '
                          }`}
                      >Home
                      </Link>
                      <Link
                        to="/jobs"
                        className={`rounded-md px-3 py-2 text-md font-serif font-medium hover:text-emerald-700
                     ${pathname === '/jobs' ? 'dark:text-emerald-500 border-b-2 border-emerald-500 ' : 'text-gray-900 '
                          }`}
                      >Browse Jobs
                      </Link>
                      <Link
                        to={'/support'}
                        className={`rounded-md px-3 py-2 text-md font-serif font-medium hover:text-emerald-700 text-gray-900 "
                        ${pathname === '/support' ? 'dark:text-emerald-500 border-b-2 border-emerald-500 ' : 'text-gray-900 '
                          }`}
                      >Support
                      </Link>

                    </div>
                  </div>
                  {/* Search Og*/}
                  {/* <div className="hidden md:block relative md:mt-0 md:mx-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="w-4 h-4 text-gray-600 dark:text-slate-950" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-slate-100 border-b border-slate-950 dark:placeholder-slate-950 dark:focus:border-slate-950 md:w-56 md:border-transparent dark:bg-white-800 dark:text-slate-950 focus:outline-none focus:border-slate-950"
                      placeholder="Search"
                    />
                  </div> */}

                  {/* try search func */}
                  {showSearchield && (

                    <div className="hidden md:block relative md:mt-0 md:mx-4">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-4 h-4 text-gray-600 dark:text-slate-950" viewBox="0 0 24 24" fill="none">
                          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="w-full py-1 pl-10 pr-4 font-serif text-gray-700 placeholder-gray-600 bg-slate-100 border-b border-slate-950 dark:placeholder-slate-950 dark:focus:border-slate-950 md:w-56 md:border-transparent dark:bg-white-800 dark:text-slate-950 focus:outline-none focus:border-slate-950"
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center ">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-600"
                          onClick={() => setSearchQuery('')}
                        >
                          <span className="sr-only"></span>
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  {/*  */}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-900 "
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}


                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={token ? data?.profile : Noimg}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {token ? (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <Link to="/profile" className={`hover:bg-gray-200 flex items-center px-4 py-2 text-sm font-serif text-gray-700 ${pathname === '/profile' ? 'bg-gray-200' : ''}`}>
                              <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="currentColor"></path>
                                <path d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z" fill="currentColor"></path>
                              </svg>
                              Your Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <a href="#" className="hover:bg-gray-200 flex items-center px-4 py-2 text-sm font-serif text-gray-700">
                              <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z" fill="currentColor"></path>
                              </svg>
                              Settings
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <a onClick={() => setIsAlertOpen(true)} href="#" className="hover:bg-gray-200 flex items-center px-4 py-2 text-sm font-serif text-gray-700">
                              <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z" fill="currentColor"></path>
                              </svg>
                              Sign out
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={'/login'}
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-serif text-gray-700')}
                              >
                                Sign in
                              </Link>
                            )}

                          </Menu.Item>
                        </Menu.Items>
                      )}

                    </Transition>
                  </Menu>

                </div>
              </div>
            </div>

            {/* og */}
            {/* <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link to='/' className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium
                      ${pathname === '/' ? 'dark:text-emerald-500 ' : 'text-gray-900 '
                  }`} >Home</Link>
                <Link to='/jobs' className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium
                      ${pathname === '/jobs' ? 'dark:text-emerald-500 ' : 'text-gray-900 '
                  }`} >Browse Jobs</Link>
                <Link className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium
                    `} >Support</Link>
              </div>
            </Disclosure.Panel> */}

            {/* try */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                  to="/"
                  className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium
        ${pathname === '/' ? 'dark:text-emerald-500 ' : 'text-gray-900 '}
      `}
                >
                  Home
                </Link>
                <Link
                  to="/jobs"
                  className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium
        ${pathname === '/jobs' ? 'dark:text-emerald-500 ' : 'text-gray-900 '}
      `}
                >
                  Browse Jobs
                </Link>

                <Link
                  className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium`}
                >
                  Support
                </Link>
                {/* Search */}
                <div className="relative mt-2 mx-3">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-4 h-4  text-gray-600 dark:text-slate-950" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-slate-100 border-b border-slate-950 dark:placeholder-slate-950 dark:focus:border-slate-950 md:w-56 md:border-transparent dark:bg-white-800 dark:text-slate-950 focus:outline-none focus:border-slate-950"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center ">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-600"
                      onClick={() => setSearchQuery('')}
                    >
                      <span className="sr-only"></span>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/*  */}
              </div>
            </Disclosure.Panel>

          </>
        )}
      </Disclosure>

      {isAlertOpen && (
        <div
          className="fixed inset-0 z-20 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform dark:bg-slate-100 rounded-lg shadow-lg shadow-gray-600 rtl:text-right sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="flex items-center justify-center">
                  <span className="mb-4 inline-flex justify-center items-center w-16 h-16 rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                  </span>
                </div>

                <div className="mt-2 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-gray-800">Sign out</h3>
                  <p className="text-gray-700">
                    Are you sure you would like to sign out of your account?
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:flex sm:items-center sm:justify-center">

                <div className="sm:flex sm:items-center">
                  <button
                    onClick={() => setIsAlertOpen(false)}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Navbar