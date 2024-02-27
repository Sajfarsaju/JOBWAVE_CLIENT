import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SingleJobView({ job, isOpenView, setIsOpenView, setSelectedJob }) {

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      {isOpenView && (
        <Transition.Root show={isOpenView} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setIsOpenView}>
            <div className="flex items-start justify-center min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg sm:text-xl leading-6 font-semibold text-gray-900">
                          {job?.jobTitle}
                        </Dialog.Title>
                        <div className="mt-4">
                          <dl className="space-y-5 sm:space-y-4">
                            <div className="flex ">
                              <p className="flex text-sm font-medium text-gray-500">Job Category:</p>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{job?.jobCategory}</dd>
                            </div>
                            <div className="flex ">
                              <dt className="text-sm font-medium text-gray-500">Work Type:</dt>
                              <dd className="ml-2 text-sm text-gray-900">{job?.workType}</dd>
                            </div>
                            <div className="flex ">
                              <dt className="text-sm font-medium text-gray-500">Work Place:</dt>
                              <dd className="ml-2 text-sm text-gray-900">{job?.workplace}</dd>
                            </div>
                            <div className="flex ">
                              <dt className="text-sm font-medium text-gray-500">Salary Range:</dt>
                              <dd className="ml-2 text-sm text-gray-900">{job?.salaryRange}</dd>
                            </div>
                            <div className="flex ">
                              <dt className="text-sm font-medium text-gray-500">Status:</dt>
                              <dd className="ml-2 text-sm text-gray-900">{job?.status}</dd>
                            </div>
                            <div className="flex ">
                              <dt className="text-sm font-medium text-gray-500">Vacancy:</dt>
                              <dd className="ml-2 text-sm text-gray-900">{job?.vacancy}</dd>
                            </div>
                            <div className="sm:flex ">
                              <dt className="text-sm font-medium text-gray-500">Company Description:</dt>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{job?.companyDescription}</dd>
                            </div>
                            <div className="sm:flex ">
                              <dt className="text-sm font-medium text-gray-500">Qualifications:</dt>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{job?.qualifications}</dd>
                            </div>
                            <div className="sm:flex ">
                              <dt className="text-sm font-medium text-gray-500">Job Description:</dt>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{job?.jobDescription}</dd>
                            </div>
                            <div className="sm:flex ">
                              <dt className="text-sm font-medium text-gray-500">Job Responsibilities:</dt>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{job?.jobResponsibilities}</dd>
                            </div>
                            <div className="sm:flex ">
                              <dt className="text-sm font-medium text-gray-500">Benefits:</dt>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{job?.benefits}</dd>
                            </div>
                            <div className="flex ">
                              <dt className="text-sm font-medium text-gray-500">Deadline:</dt>
                              <dd className="ml-2 text-sm text-gray-900 break-all">{formatDate(job?.deadline)}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setIsOpenView(false)
                        setSelectedJob({})
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>


  )
}