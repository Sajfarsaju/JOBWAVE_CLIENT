import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Axios_Instance from '../../../api/userAxios';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function PlanModal({ setOpenPlanModal, openPlanModal }) {

  const {token} = useSelector((state)=>state.user)

  const handlePayment = async (planAmt, planType) => {
    console.log("planAmt:", planAmt, "planType:", planType)
    try {
      const res = await Axios_Instance.post('/user_plan', { planAmt, planType },
      {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }
  );
        window.location.href = res.data.url ? res.data.url : null;
      

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {openPlanModal && (
        <Transition.Root show={openPlanModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpenPlanModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              {/* bg blur */}
              <div className="flex min-h-full backdrop-blur-sm items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative flex w-full items-center overflow-hidden dark:bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => setOpenPlanModal(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Your modal content goes here */}
                      <div className="bg-white dark:bg-white">
                        <div className="container px-6 py-8 mx-auto">
                          <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-gray-800 text-center md:text-left">
                            Jobseeker Subscription Plans
                          </h1>

                          <div className="mt-4 text-center md:text-left">
                            <span className="inline-block w-40 h-1 bg-green-500 rounded-full"></span>
                            <span className="inline-block w-3 h-1 mx-1 bg-green-500 rounded-full"></span>
                            <span className="inline-block w-1 h-1 bg-green-500 rounded-full"></span>
                          </div>

                          <p className="mt-4 font-medium dark:text-gray-800 text-center md:text-left">
                            Explore our subscription plans for jobseekers and connect with companies.
                          </p>



                          <div className="flex flex-col mt-4 md:flex-row md:justify-between">
                            <div className="max-w-sm mx-auto border rounded-lg mb-8 md:mb-0 md:mr-4 dark:border-gray-900">
                              <div className="p-6">
                                <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-gray-800">
                                  Jobseeker Standard Plan (Monthly)
                                </h2>

                                <p className="mt-4 text-gray-500 dark:text-gray-800">
                                  Unlock standard features for jobseekers and chat with companies on a monthly basis.
                                </p>

                                <h3 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-emerald-600">
                                  ₹1000.00 <span className="text-base font-medium">/Month</span>
                                </h3>

                                <p className="mt-1 text-gray-500 dark:text-gray-800">
                                  Billed monthly
                                </p>

                                <button
                                  onClick={() => handlePayment(1000, 'Monthly')}
                                  className="w-full px-4 py-2 mt-6 tracking-wide dark:text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                  Start Now
                                </button>
                              </div>

                              <hr className="border-gray-200 dark:border-gray-800" />

                              <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-emerald-500">
                                  What’s included:
                                </h3>

                                <div className="mt-8 space-y-4">
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5 text-blue-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>

                                    <span className="mx-4 text-gray-700 dark:text-green-600">
                                      Chat with company recruiters
                                    </span>
                                  </div>

                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5 text-blue-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>

                                    <span className="mx-4 text-gray-700 dark:text-green-600">
                                      Priority customer support
                                    </span>
                                  </div>

                                  {/* <div className="flex items-center">
                                   <svg
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="w-5 h-5 text-blue-500"
                                     viewBox="0 0 20 20"
                                     fill="currentColor"
                                   >
                                     <path
                                       fillRule="evenodd"
                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                       clipRule="evenodd"
                                     ></path>
                                   </svg>

                                   <span className="mx-4 text-gray-700 dark:text-green-600">
                                     Email notifications for new applicants
                                   </span>
                                 </div> */}
                                </div>
                              </div>
                            </div>

                            <div className="max-w-sm mx-auto border rounded-lg dark:border-gray-800">
                              <div className="p-6">
                                <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-gray-800">
                                  Jobseeker 6-Month Subscription Plan
                                </h2>

                                <p className="mt-4 text-gray-500 dark:text-gray-800">
                                  Explore our 6-month subscription plan for jobseekers and connect with companies.
                                </p>

                                <h3 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-emerald-600">
                                  ₹6000.00 <span className="text-base font-medium">/6 Month</span>
                                </h3>

                                <p className="mt-1 text-gray-500 dark:text-gray-800">
                                  Billed one time
                                </p>

                                <button
                                  onClick={() => handlePayment(6000, '6 Month')}
                                  className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                  Start Now
                                </button>
                              </div>

                              <hr className="border-gray-200 dark:border-gray-800" />

                              <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-emerald-500">
                                  What’s included:
                                </h3>

                                <div className="mt-8 space-y-4">
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5 text-blue-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>

                                    <span className="mx-4 text-gray-700 dark:text-green-600">
                                      Chat with company recruiters
                                    </span>
                                  </div>

                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5 text-blue-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>

                                    <span className="mx-4 text-gray-700 dark:text-green-600">
                                      Priority customer support
                                    </span>
                                  </div>

                                  {/* <div className="flex items-center">
                                   <svg
                                     xmlns="http://www.w3.org/2000/svg"
                                     className="w-5 h-5 text-blue-500"
                                     viewBox="0 0 20 20"
                                     fill="currentColor"
                                   >
                                     <path
                                       fillRule="evenodd"
                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                       clipRule="evenodd"
                                     ></path>
                                   </svg>

                                   <span className="mx-4 text-gray-700 dark:text-green-600">
                                     Priority customer support
                                   </span>
                                 </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}

    </>
  )
}