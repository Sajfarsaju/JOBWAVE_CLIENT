import React, { useState } from 'react'
import { Link, useLocation , useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { companyLogout } from '../../../store/slice/companySlice'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { FaUserLarge, FaBookOpenReader } from 'react-icons/fa6'
import { AiFillHome } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
// import Axios_Instance from '../../../api/userAxios'

function Navbar() {

  const { pathname } = useLocation();

  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { token } = useSelector((state) => state.company);

  const dispatch = useDispatch()
  const logout = () => {
    dispatch(companyLogout());
    navigate('/company/login')
  }

  const createChat = (companyId) => {

        //? Send post req for create chat 
        // Axios_Instance.post('/chats', { compId: companyId, senderRole: "user" }).then((res) => {
        //     console.log("res;", res);
            navigate(`/company/chats`)
        
}

  return (

    <>
      <header className="absolute inset-x-0 top-0 z-10 ">
        <nav className="flex items-center bg-slate-100 shadow-sm justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-10 w-11"
                src="../public/JobWave2-fotor-bg-remover-20230817153930.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">

            <Link
              to="/company/home"
              className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-emerald-700
                    ${pathname === '/company/home' ? 'dark:text-emerald-500 ' : 'text-gray-900 '
                }`}
            >Home
            </Link>
            <Link to="/company/candidates"
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-emerald-700 text-gray-900 "
            >Browse Candidates
            </Link>
            <Link
              to="/company/joblist"
              className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:text-emerald-700
                     ${pathname === '/company/joblist' ? 'dark:text-emerald-500 ' : 'text-gray-900 '
                }`}
            >My Jobs
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex items-center">
            <button onClick={() => createChat()} className="mr-3 text-white flex flex-col rounded-lg ">
                                                                    <div className="p-1.5  rounded-full bg-green-600">
                                                                        <svg
                                                                            className="w-4 h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4"
                                                                            fill="currentColor"
                                                                            viewBox="0 0 20 20"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                                                clipRule="evenodd"
                                                                            ></path>
                                                                        </svg>
                                                                    </div>
                                                                </button>
              <Link 
                className={`${pathname === '/company/profile' ? 'dark:text-emerald-500 ' : 'text-gray-900 '}`}
                to={'/company/profile'}>
                <FaUserLarge className='hover:text-emerald-700'/>
              </Link>
              <span className="ml-3 pb-1">
                {token ? (
                  <Link onClick={logout} className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-700">
                    Logout <span className="text-2xl" aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-700">
                    Login <span className="" aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </span>
            </div>
          </div>

        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-slate-100 shadow-xl px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to={'/company/home'}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50
                    ${pathname === '/company/home' ? 'dark:text-emerald-500 ' : 'text-gray-900 '}`}
                  >
                    <div className="flex items-center">
                      <AiFillHome className="mr-2" />
                      Home
                    </div>
                  </Link>
                  <Link
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <FaUserFriends className="mr-2" />
                      Browse Recruiters
                    </div>
                  </Link>
                  <Link
                    to={'/company/joblist'}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50
                      ${pathname === '/company/joblist' ? 'dark:text-emerald-500 ' : 'text-gray-900 '}`}
                  >
                    <div className="flex items-center">
                      <FaBookOpenReader className="mr-2" />
                      My Jobs
                    </div>
                  </Link>
                  <Link
                    to={'/company/profile'}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50
                      ${pathname === '/company/profile' ? 'dark:text-emerald-500 ' : 'text-gray-900 '}`}
                  >
                    <div className="flex items-center">
                      <FaUserLarge className="mr-2" />
                      Profile
                    </div>
                  </Link>
                  {token ? (
                    <Link
                      onClick={logout}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z" fill="currentColor"></path>
                        </svg>
                        Logout
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  )}
                </div>

                {/* <div className="bg-green-200">
  {token ? (
    <Link
      className="-mx-3  rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center"
      onClick={logout}
      to="/company/login"
    >
      <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z" fill="currentColor"></path>
      </svg>
      Logout
    </Link>
  ) : (
    <Link
      to="/login"
      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >
      Log in
    </Link>
  )}
</div> */}

              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

    </>
  )
}

export default Navbar