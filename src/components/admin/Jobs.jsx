import React, { useEffect, useState , Fragment } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Axios_Instance from '../../api/userAxios';
import { FaEye } from 'react-icons/fa'
import toast from 'react-hot-toast';


export default function Jobs() {

    const [jobList, setJobList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        (async function getJobs() {
            try {
                const response = await Axios_Instance.get('/admin/job_list')
                if (response.status === 200) {
                    setJobList(response.data.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        })();

    }, []);

    // const calculateTimeDifference = (approvalTime) => {
    //     const currentTime = new Date();
    //     const approvalDateTime = new Date(approvalTime);
    //     const timeDifference = currentTime - approvalDateTime;
    //     const hoursDifference = timeDifference / (1000 * 60 * 60);
    //     return hoursDifference;
    //   }

    //   const removeExpiredJobs = () => {
    //     const currentTime = new Date();
    //     const updatedJobList = jobList.filter((job) => {
    //       if (job.isPostAccepted) {
    //         const hoursDifference = calculateTimeDifference(job.approvalTime);
    //         return hoursDifference < 24;
    //       }
    //       return true; // Keep unapproved jobs
    //     });
    //     setJobList(updatedJobList);
    //   }
    
    //   useEffect(() => {
    //     // Call removeExpiredJobs function periodically
    //     const interval = setInterval(removeExpiredJobs, 60000); // Check every minute
    //     return () => clearInterval(interval);
    //   }, [jobList]);
    

     // ******************* JOB APPROVE*********************//
    const handleApprove = async (jobId) => {
        try {
            const response = await Axios_Instance.patch('/admin/handle_posted_job', { jobId, action: 'approve_post' });

            if (response.status === 200) {

                const updatedJob = response.data.jobStatus;
                console.log('updatedJob;', updatedJob);

                const jobIndex = jobList.findIndex((job) => job._id === jobId);

                if (jobIndex !== -1) {
                    const updatedJobList = [...jobList];
                    // updatedJobList[jobIndex] = updatedJob;
                    updatedJobList[jobIndex] = { ...updatedJob, approvalTime: new Date() };

                    setJobList(updatedJobList);
                    toast.success('Approved')
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    // ********************END JOB APPROVE*********************//

    // ******************* JOB REJECT  *********************//
    // const handleReject = async (jobId) => {
    //     try {
    //         const response = await Axios_Instance.patch('/admin/handle_posted_job', { jobId, action: 'reject_post' });

    //         if (response.status === 200) {

    //             const updatedJob = response.data.jobStatus;
    //             console.log('updatedJob;', updatedJob);

    //             const jobIndex = jobList.findIndex((job) => job._id === jobId);

    //             if (jobIndex !== -1) {
    //                 const updatedJobList = [...jobList];
    //                 updatedJobList[jobIndex] = updatedJob;

    //                 setJobList(updatedJobList);
    //                 toast.success('Rejected')
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // ********************END JOB REJECT  *********************//


    return (
        <div className='min-h-auto'>
            <section className="relative py-8 sm:py-16 px-4 sm:px-10 lg:px-20 xl:px-32">
                <div className="w-full mb-6">
                    <div className="relative min-w-0 w-full mb-6 shadow-lg shadow-gray-400 rounded dark:bg-white text-gray-900 overflow-x-auto">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-bold text-lg text-gray-900">Job List</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full">
                            <div className="sm:overflow-hidden">
                                <table className="w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                                                No
                                            </th>
                                            <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                                                Company
                                            </th>
                                            <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-normal font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                                                Job Title
                                            </th>
                                            <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                                                Job Category
                                            </th>
                                            <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-normal font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                                                View
                                            </th>
                                            <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {jobList.slice().reverse().map((job, indx) => (
                                            <tr key={job._id}>
                                                <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                                                    {indx + 1}
                                                </td>
                                                <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center flex  items-center">
                                                    <img
                                                        src={job.logo}
                                                        className="h-10 sm:h-12 lg:h-12 w-10 sm:w-12 lg:w-12 rounded-full border"
                                                        alt="..."
                                                    />
                                                    <p className=" ml-2 sm:ml-3 font-bold text-gray-900 text-sm sm:text-sm">
                                                        {job.companyId?.companyName}
                                                    </p>

                                                </td>
                                                <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-normal p-2 sm:p-3 text-center">
                                                    {job.jobTitle}
                                                </td>
                                                <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                                                    {job.jobCategory}
                                                </td>
                                                <td className="text-green-600 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">

                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:text-gray-700">
                                                        <FaEye onClick={() => setIsOpen(true)} className="w-6 h-6" />
                                                    </div>
                                                </td>
                                                <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                                                    {job.isPostAccepted ? (
                                                        <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                                                            <span className="h-1.5 w-1.5 bg-emerald-800"></span>
                                                        <h2 className="text-sm font-medium text-emerald-800 uppercase">Approved</h2>
                                                    </div>
                                                    ):(
                                                        <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                                                        <h2
                                                            onClick={() => handleApprove(job._id)}
                                                            className="text-sm font-normal text-emerald-800">Approve</h2>
                                                    </div>

                                                    )}
                                                    {/* <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-red-300">
                                                        <h2
                                                            onClick={() => handleReject(job._id)}
                                                            className="text-sm font-normal text-red-800">Reject</h2>
                                                    </div> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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

              {/*  */}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition.Root>
)}
        </div>
    )
}