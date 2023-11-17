import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SingleJobView({ job, isOpenView, setIsOpenView }) {
  
  return (
    <>
      {isOpenView && (
        <Transition.Root show={isOpenView} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setIsOpenView}>
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

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
              <div className="mx-auto text-center flex justify-center md:px-2 lg:px-4"> {/* Center the modal */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel className="transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                    <div className="relative overflow-hidden dark:bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => setIsOpenView(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <div>
                        <h1 className="text-3xl font-semibold  mb-4">
                          <span className="text-lg font-semibold text-blue-700">Job Title:</span> {job.jobTitle}
                        </h1>
                        <p className="text-lg ">
                          <span className="text-lg font-semibold text-blue-700">Company Description:</span> {job.companyDescription}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Deadline:</span> {job.deadline}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Job Category:</span> {job.jobCategory}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Work Type:</span> {job.workplace}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Salary Range:</span> {job.salaryRange}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Status:</span> {job.status}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Vacancy:</span> {job.vacancy}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Qualifications:</span> {job.qualifications}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Job Description:</span> {job.jobDescription}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Job Responsibilities:</span> {job.jobResponsibilities}
                        </p>
                        <p className="text-lg">
                          <span className="text-lg font-semibold text-blue-700">Benefits:</span> {job.benefits}
                        </p>
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