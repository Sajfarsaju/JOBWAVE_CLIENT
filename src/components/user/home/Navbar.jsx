import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../../../store/slice/userSlice'
import Axios_Instance from '../../../api/userAxios'
import Noimg from '../../../assets/empty-img2.png'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import jobWaveLogo from '/src/assets/JOBWAVELOGO.png'
import toast from 'react-hot-toast'



function Navbar({ searchValue, setSearchQuery, reRender, showSearchield }) {

  const navigate = useNavigate()
  const { pathname } = useLocation();
  const [isAlertOpen, setIsAlertOpen] = useState(false)

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
      const res = await Axios_Instance.get('/profile');
      if (res.status === 200) {

        setData(res?.data?.user)
      }

    } catch (error) {
      console.log(error);
      //? If blocked user 
      if (error?.response?.data?.isBlocked) {
        toast.error(error?.response?.data?.errMsg);
      }
    }
  }
  useEffect(() => {

    getUser()
  }, [reRender])


  return (

    <>

      <Disclosure as="nav" className="bg-slate-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className='sm:hidden mx-auto max-w-full flex justify-end items-end w-3/5 '>
                  <img src={jobWaveLogo} alt="" className="w-20 h-20" />
                </div>

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
                <div className="hidden sm:block w-24 h-24 items-center">
                  <img
                    className=""
                    src={jobWaveLogo}
                    alt="Your Company"
                  />
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
                        to={'#'}
                        className={`rounded-md px-3 py-2 text-md font-serif font-medium hover:text-emerald-700 text-gray-900 "
                        ${pathname === '/chats' ? 'dark:text-emerald-500 border-b-2 border-emerald-500 ' : 'text-gray-900 '
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
                        className="w-full py-2 pl-10 pr-4 font-serif text-gray-700 placeholder-gray-600 bg-slate-100 border-b border-slate-950 dark:placeholder-slate-950 dark:focus:border-slate-950 md:w-56 md:border-transparent dark:bg-white-800 dark:text-slate-950 focus:outline-none focus:border-slate-950"
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

            {/* MOBILE VIEW */}
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
                  to={'#'}
                  className={`hover:text-emerald-700 block rounded-md px-3 py-2 text-base font-medium`}
                >
                  Support
                </Link>
                {/* Search */}
                {showSearchield && (
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
                )}
                {/*  */}
              </div>

            </Disclosure.Panel>
            {/*END MOBILE VIEW */}

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