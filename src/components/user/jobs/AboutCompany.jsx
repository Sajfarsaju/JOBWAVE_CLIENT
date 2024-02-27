import { Link, useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { MdDownloadDone } from 'react-icons/md'
import { IoLocationSharp } from 'react-icons/io5';
import { XMarkIcon } from '@heroicons/react/24/outline'
import Axios_Instance from '../../../api/userAxios';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner';

function AboutCompany() {

  const { companyId } = useParams();

  const [spinner, setSpinner] = useState(true);
  const [companyData, setCompanyData] = useState({});
  const [recentJobs, setRecentJobs] = useState([])
  const [isChatExist, setIsChatExist] = useState(false)

  async function fetchAboutCompany() {
    try {
      const res = await Axios_Instance.get(`/aboutCompany?companyId=${companyId}`)

      if (res.status === 200) {
        setSpinner(false)
        setCompanyData(res.data.company)
        setRecentJobs(res.data.Jobs)
        setIsChatExist(res.data.isChatExist)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAboutCompany()
  }, [])

  const getTimeDifference = (postedDate) => {
    const currentDate = new Date();
    const postedTime = new Date(postedDate);

    const timeDifference = currentDate - postedTime;

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `few seconds ago`
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  //? Checking the job deadline is over or not
  const isDeadlineOver = (deadline) => {
    const currentDate = new Date();
    const jobDeadline = new Date(deadline);
    return currentDate > jobDeadline;
  };
  //?

  const MAX_DESCRIPTION_LENGTH = 100;
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    }


  return (
    <>
      
      {spinner ? (
        <Spinner />
      ) : (
        <div className="min-h-screen bg-white flex flex-col items-center relative font-dm-sans font-normal">
          <div className="min-w-full  lg:h-60 xl:h-60 md:h-40 h-40 relative">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt=""
              className="w-full h-full object-cover transition-transform transform hover:brightness-75"
            />
          </div>

          <div className="w-full h-full lg:flex justify-between relative bg shadow-sm shadow-gray-200">
            <div className="p-4 w-full rounded-lg relative py-10">
              <div className={` bg-white relative shadow-md shadow-gray-400 left-1/2 transform -translate-x-1/2 top-0 lg:-mt-20 xl:-mt-20 -mt-16 md:-mt-12 sm:-mt-8 w-24 h-24 lg:w-36 lg:h-36 xl:w-36 xl:h-36 rounded-full`}>
                <img
                  src={companyData?.profile}
                  alt="" className="cursor-pointer rounded-full w-full h-full lg:w-36 lg:h-36 xl:w-36 xl:h-36 hover:brightness-75" />
              </div>

              <div className="text-center mt-8">

                {/* Card Text Content */}
                <div className='flex justify-center items-center space-x-10 mb-3'>
                  <h2 className="text-xl lg:text-3xl xl:text-3xl font-semibold break-all" style={{ color: 'rgba(0, 4, 74, 1)' }}>{companyData.companyName}</h2>
                  
                </div>

                {isChatExist && (
                  <Link to={`/chats/${companyId}`} className='text-sky-600 sm:text-lg text-base'>Message</Link>
                )}

                {/*Locations lg screens  */}
                <div className="sm:flex items-center justify-center hidden ">
                  <IoLocationSharp className='w-5 h-5 mt-2 text-gray-900' />

                  <p className='mt-3 text-base lg:text-xl xl:text-xl break-all text-gray-900'>
                    {companyData?.companyAddress?.address} , {companyData?.companyAddress?.district} , {companyData?.companyAddress?.state}
                  </p>
                </div>
                {/* Locations small screens   */}
                <div className=" sm:hidden ">
                  <div className='flex items-center justify-center'>

                    <IoLocationSharp className='w-5 h-5 mt-2 text-gray-900' />

                    <p className='mt-3 text-base lg:text-xl xl:text-xl break-all text-gray-900'>
                      {companyData?.companyAddress?.address}
                    </p>
                  </div>
                  <p className='text-gray-900'>{companyData?.companyAddress?.district} , {companyData?.companyAddress?.state}</p>
                </div>
                {/*  */}
                <p className='mt-3 text-base lg:text-xl xl:text-xl break-all text-gray-800'>Email: <span className='font-normal lg:text-xl xl:text-xl text-gray-900'>{companyData?.email}</span></p>

                <p className="mt-3 text-base lg:text-xl xl:text-xl text-gray-800">Phone: <span className='font-normal lg:text-xl xl:text-xl text-gray-900'>{companyData.phone}</span></p>
                <p className='mt-3 text-base lg:text-xl xl:text-xl text-gray-800'>Bio: <span className='font-normal lg:text-xl xl:text-xl text-gray-900'>{companyData?.bio}</span></p>
              </div>

            </div>

          </div>
          <div className={`${recentJobs.length === 0 ? 'mt-0 bg-slate-100' : 'min-h-screen mt-8 '} w-full`}>

            <div className={`${recentJobs.length === 0 ? 'hidden' : 'block'}`}>
              <h1 className='text-center text-xl sm:text-2xl font-semibold' style={{ color: 'rgba(0, 4, 74, 1)' }}>Recent Jobs</h1>
            </div>

            <div className="sm:grid sm:grid-cols-2 gap-2 xl:gap-1 sm:mx-auto p-3">
              {recentJobs.map((job, index) => (

                // group-hover:bg-gradient-to-r from-[#AEC3AE] to-[#CEDEBD]
                <div key={index} className="xl:w-10/12 w-full sm:mx-auto p-4 ">
                  <div className="rounded-xl shadow-sm shadow-slate-300 p-4 relative flex items-center">
                    <div className="flex flex-col flex-grow ml-4 ">

                      {/* ONLY MOBILE SCREENS */}
                      <div className="sm:hidden">
                        <div className='flex flex-col items-start'>
                          <div className='flex items-center space-x-4'>
                            
                            {isDeadlineOver(job.deadline) ? (
                              <p
                                className={`break-all text-lg font-normal sm:text-xl md:text-xl max-w-full mt-2 ${job.appliedStatus ? 'cursor-not-allowed' : ''}`}
                                style={{ color: 'rgba(0, 4, 74, 1)' }}
                              >
                                {job.jobTitle}
                              </p>
                            ) : (
                              <Link
                                to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                className={`break-all text-lg font-normal sm:text-xl md:text-xl max-w-full mt-2 ${job.appliedStatus ? 'cursor-not-allowed' : ''}`}
                                style={{ color: 'rgba(0, 4, 74, 1)' }}
                              >
                                {job.jobTitle}
                              </Link>
                            )}

                          </div>

                          <div className='w-full mt-4 flex justify-between '>
                            <p className="mb-2" style={{ color: 'rgba(0, 4, 74, 1)' }}>{job?.workType} role</p>
                          </div>

                          <div className=''>

                            <p className="mb-2 break-all" style={{ color: 'rgba(109, 110, 141, 1)' }}>Description: {truncateText(job.jobDescription, MAX_DESCRIPTION_LENGTH)}</p>
                            <p className="text-end text-green-600 text-sm font-small">
                              {getTimeDifference(job.createdAt)}
                            </p>
                          </div>

                          <div className="flex items-center space-x-8 mt-4">
                            {job.appliedStatus ? (
                              <span className="text-lime-600 bg-lime-200 px-3 py-1 font-medium rounded-full text-base">
                                Applied
                              </span>
                            ) : (
                              <>
                                {!isDeadlineOver(job.deadline) && (

                                  <Link
                                    to={`/jobs/jobview/${job._id}`}
                                    className={`text-gray-700 font-serif inline text-md font-medium mt-0 mr-1 mb-0 ml-1  
                                    ${job.appliedStatus ? 'text-lg font-bold' : ''}`}
                                    // style={{ color: 'rgba(109, 110, 130, 1)' }}
                                  >
                                    Show more...
                                  </Link>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* END MOBILE SCREENS ONLY*/}

                      {/* Card start */}
                      <div className="w-full lg:h-auto xl:h-auto hidden sm:block">
                        <div className="flex justify-between items-center">
                          {isDeadlineOver(job.deadline) ? (
                            <p
                              className={`break-all text-lg font-normal sm:text-xl md:text-xl max-w-full ${job.appliedStatus ? 'cursor-not-allowed' : ''}`}
                              style={{ color: 'rgba(0, 4, 74, 1)' }}
                            >
                              {job.jobTitle}
                            </p>
                          ) : (
                            <Link
                              to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                              className={`break-all text-lg font-normal sm:text-xl md:text-xl max-w-full ${job.appliedStatus ? 'cursor-not-allowed' : ''}`}
                              style={{ color: 'rgba(0, 4, 74, 1)' }}
                            >
                              {job.jobTitle}
                            </Link>
                          )}

                          <div className="flex-row items-center space-x-2">
                            {job.appliedStatus ? (
                              <span className=" text-lime-600 bg-lime-200 px-3 py-1 font-medium rounded-full text-base">
                                Applied</span>
                            ) : (
                              // Apply Now Button
                              <>
                                {!isDeadlineOver(job.deadline) && (

                                  <Link to={job.appliedStatus ? "#" : `/jobs/jobview/${job._id}`}
                                    className="text-gray-700 px-3 py-2 rounded-md"
                                  >
                                    Show more...
                                  </Link>
                                )}
                              </>
                            )}
                            {/* // Show more Button
                                //     <Link */}
                            {/* //     to={job.appliedStatus ? '#' : `/jobs/jobview/${job._id}`}
                                //     className={`font-serif inline text-md font-medium mt-0 mr-1 mb-0 ml-1  
                                // ${job.appliedStatus ? 'text-lg font-bold' : ''}`}
                                //     style={{ color: 'rgba(109, 110, 130, 1)' }} >
                                //     {job.appliedStatus ? null : 'Show More...'}
                                // </Link> */}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 text-sm mb-2">

                          <p className='break-all' style={{ color: 'rgba(0, 4, 74, 1)' }}>{job?.workType} role</p>
                          <p className='break-all' style={{ color: 'rgba(0, 4, 74, 1)' }}>Dead line:{formatDate(job?.deadline)}</p>

                        </div>

                        <div className=" mt-4 text-sm mb-2">
                          <p className='break-all' style={{ color: 'rgba(109, 110, 141, 1)' }}>{job?.jobDescription}</p>
                          <p className=" text-right text-green-600 text-sm font-small">
                            {getTimeDifference(job.createdAt)}
                          </p>
                        </div>

                      </div>
                      {/* card end */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutCompany