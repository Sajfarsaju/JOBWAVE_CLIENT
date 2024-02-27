import React, { useEffect, useState } from 'react'
import Axios_Instance from '../../api/userAxios';
import { FaEye } from 'react-icons/fa'
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import SingleJobView from './SingleJobView';


export default function Jobs() {

  const [jobList, setJobList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {

    (async function getJobs() {
      setSpinner(true)
      try {
        const response = await Axios_Instance.get('/admin/job_list')
        if (response.status === 200) {
          setSpinner(false)
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
  const [isOpenJobView, setIsOpenJobView] = useState(false);
  const [selectedJob, setSelectedJob] = useState({})

  return (
    <>

      {spinner ? (
        <Spinner />
      ) : (
        <>
          <SingleJobView job={selectedJob} setSelectedJob={setSelectedJob} isOpenJobView={isOpenJobView} setIsOpenJobView={setIsOpenJobView} />

          <div className='min-h-auto font-dm-sans font-normal'>
            <section className="relative py-8 sm:py-16 px-4 sm:px-10 lg:px-20 xl:px-32">
              <div className="w-full mb-6">
                <div className="relative min-w-0 w-full mb-6 shadow-sm shadow-gray-300 rounded dark:bg-white text-gray-900 overflow-x-auto">
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
                                  src={job.companyId?.profile}
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

                                <div className="cursor-pointer inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:text-gray-700">
                                  <FaEye onClick={() => {
                                    setIsOpenJobView(true)
                                    setSelectedJob(job)
                                  }} className="w-6 h-6" />
                                </div>
                              </td>
                              <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                                {job.isPostAccepted ? (
                                  <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                                    <span className="h-1.5 w-1.5 bg-emerald-800"></span>
                                    <h2 className="text-sm font-medium text-emerald-800 uppercase">Approved</h2>
                                  </div>
                                ) : (
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

          </div>
        </>
      )}
    </>
  )
}