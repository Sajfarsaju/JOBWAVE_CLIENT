import { useState, Fragment, useEffect } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import Axios_Instance from '../../../api/userAxios';

function Section() {

  const { id } = useSelector((state) => state.company);
  const [companyData, setCompanyData] = useState({})

  const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
  ];

  const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
  ];

  const [isOpen, setIsOpen] = useState(false)

  const handlePayment = async (planAmt, planType) => {
    console.log("planAmt:", planAmt, "planType:", planType)
    try {
      await Axios_Instance.post('/company/companyPlan', { planAmt, id, planType },).then((res) => {
        window.location.href = res.data.url ? res.data.url : null;
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    (async function getCompanyData() {

      try {
        const response = await Axios_Instance.get('/company/profile');

        if (response.status === 200) {
          setCompanyData(response.data.company)
        }

      } catch (error) {
        console.log(error);
      }

    })();

  }, []);

  return (
    <>
      {companyData.subscriptionPlan ? (

        <div className=" relative isolate overflow-hidden py-24 sm:py-32">
          <img
            src="https://wallpapers.com/images/featured/consultant-0bb0flkn9zvgvg9v.jpg"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center p"
          />
          <div
            className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div
            className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
            aria-hidden="true"
          >
            <div
              className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl">Work with us</h2>
              <p className="mt-6 text-lg font-medium leading-8 text-blue-900">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-bold leading-7 text-blue-900 sm:grid-cols-2 md:flex lg:gap-x-10">
                {links.map((link) => (
                  <a key={link.name} href={link.href}>
                    {link.name} <span aria-hidden="true">&rarr;</span>
                  </a>
                ))}
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex flex-col-reverse">
                    <dt className="text-base font-semibold leading-7 text-blue-900">{stat.name}</dt>
                    <dd className="text-2xl font-bold leading-9 tracking-tight text-blue-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ) : (

        <section className="bg-gray-100 md:mt-24 sm:mt-32 lg:py-12 lg:-mt-1 xl:-mt-1 lg:flex lg:justify-center">
          <div className="overflow-hidden lg:hover:scale-105 lg:duration-1000 bg-white shadow-lg shadow-gray-400 mt-16 lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
            <div className="lg:w-1/2 lg:py-8">
              <div className="h-64 bg-cover lg:h-full" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1361433464/photo/portraits-of-young-diverse-people.jpg?s=612x612&w=0&k=20&c=7y-hTiVfSWv6Q1dY44wPxAqCYcMQHcDjDKJgIn6sX_o=')` }}></div>
            </div>

            <div className="max-w-xl px-6  py-12 lg:max-w-5xl lg:w-1/2 ">
              <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                Transform Your Hiring Process
              </h2>

              <p className="mt-4 text-gray-800 dark:text-gray-800">
                Is your company ready to <span className="text-blue-600">redefine</span> its workforce strategy? We empower you to
                <span className="text-blue-600">take charge</span>. With our <span className="text-blue-600">innovative</span>
                job posting platform, you can effortlessly attract top talent in the industry. Showcase your company as a
                <span className="text-blue-600">premier</span> employer and <span className="text-blue-600">transform</span> your hiring process.
              </p>

              <p className="mt-4 text-gray-800 dark:text-gray-800">
                Our <span className="text-blue-600">cutting-edge</span> features guarantee that your job listings
                <span className="text-blue-600">shine</span> and reach a broad audience. It's time to
                <span className="text-blue-600">make your mark</span>, unlock new opportunities, and
                <span className="text-blue-600">shape</span> the future of your organization. Join us on this
                <span className="text-blue-600">transformative journey </span> towards success by exploring our
                <span className="text-blue-600"> subscription plans.</span>
              </p>




              <div className="inline-flex w-full mt-6 sm:w-auto">
                <button onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center w-full px-6 py-2 text-md font-semibold text-white duration-300 rounded-lg bg-emerald-600 hover:bg-emerald-500">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      )}



      {isOpen && (

        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
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
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Your modal content goes here */}
                      <div className="bg-white dark:bg-white">
                        <div className="container px-6 py-8 mx-auto">
                          <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-gray-800 text-center md:text-left">
                            Job Post Subscription Plans
                          </h1>

                          <div className="mt-4 text-center md:text-left">
                            <span className="inline-block w-40 h-1 bg-green-500 rounded-full"></span>
                            <span className="inline-block w-3 h-1 mx-1 bg-green-500 rounded-full"></span>
                            <span className="inline-block w-1 h-1 bg-green-500 rounded-full"></span>
                          </div>

                          <p className="mt-4 font-medium dark:text-gray-800 text-center md:text-left">
                            Explore our subscription plans for posting jobs and hire the best candidates.
                          </p>



                          <div className="flex flex-col mt-4 md:flex-row md:justify-between">
                            <div className="max-w-sm mx-auto border rounded-lg mb-8 md:mb-0 md:mr-4 dark:border-gray-900">
                              <div className="p-6">
                                <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-gray-800">
                                  Standard Plan
                                </h2>

                                <p className="mt-4 text-gray-500 dark:text-gray-800">
                                  Get started with our standard job posting plan.
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
                                      Job posting on our platform
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
                                      Invite Jobseekers
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
                                      Email notifications for new applicants
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="max-w-sm mx-auto border rounded-lg dark:border-gray-800">
                              <div className="p-6">
                                <h2 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-gray-800">
                                  Premium Plan
                                </h2>

                                <p className="mt-4 text-gray-500 dark:text-gray-800">
                                  Unlock premium features with our job posting plan.
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
                                      All features from the Standard Plan
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
                                      Featured job listings
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
  );
}

export default Section;
