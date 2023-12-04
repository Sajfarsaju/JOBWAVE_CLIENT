import  { useEffect, useState } from 'react'
import Axios_Instance from '../../../../api/userAxios';
import { Link } from 'react-router-dom';
import Spinner from '../../../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userLogout } from '../../../../store/slice/userSlice';
import toast from 'react-hot-toast';

export default function AppliedJobs() {

  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch()
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {

    (async function getAppliedJobs() {

      try {
        setSpinner(true)
        const response = await axios.get('http://localhost:4005/applied_jobs',{
          headers: {
            'Authorization': `Bearer ${token}`
            // Add other headers if needed
          }
        });

        if (response.status === 200) {
          setSpinner(false)
          setAppliedJobs(response.data.appliedJobs);
        }


      } catch (error) {
        console.log(error);
        if (error.res?.status === 401 || error?.res?.data?.errMsg === 'Your account has been blocked') {
          dispatch(userLogout());
          toast.error(error?.res?.data?.errMsg);
      }
      }
    })()
  }, [])

  return (
    <div className='min-h-auto'>
      {spinner && (
        <Spinner/>
      )}
      {appliedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen ">
          {/* Centered UI */}
          <div className="bg-white p-4 rounded shadow-xl shadow-gray-300 text-center">
            <h1 className="text-3xl font-semibold text-blue-700 mb-4">
              You Have not Applied Yet.
            </h1>
            <p className="text-gray-700 text-xl mb-4">
              It is time to take action! Apply for a job and start your journey.
            </p>
          </div>

        <Link to={'/jobs'}>
          <button
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
            Apply for a Job
          </button>
          </Link>
        </div>
      ) : (
        <section className="relative py-8 sm:py-16 px-4 sm:px-10 lg:px-20 xl:px-32">
          <div className="w-full mb-6">
            <div className="relative min-w-0 w-full mb-6 shadow-md shadow-gray-400 rounded dark:bg-white text-gray-900 overflow-x-auto">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-bold xl:text-xl lg:text-xl text-lg text-gray-900">Your applied job history</h3>
                  </div>
                    <h3 className="font-bold xl:text-xl lg:text-xl text-end text-lg text-green-600">You applied {appliedJobs.length} job</h3>
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
                          company
                        </th>
                        <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-normal font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                          Job Title
                        </th>
                        <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                          They interested
                        </th>
                        {/* <th className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-xs sm:text-sm uppercase whitespace-nowrap font-bold text-center bg-slate-200 text-gray-900 border-slate-300">
                        Action
                      </th> */}
                      </tr>
                    </thead>
                    <tbody>

                      {appliedJobs.map((appliedJob, indx) => (
                        <tr key={appliedJob._id}>
                          <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                            {indx + 1}
                          </td>
                          <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                            <div className="flex items-center justify-center">
                              <img
                                src={appliedJob?.jobId?.companyId?.logo || appliedJob?.jobId?.companyId?.profile}
                                className="h-10 sm:h-12 lg:h-12 w-10 sm:w-12 lg:w-12 rounded-full border"
                                alt="Company Logo"
                              />
                              <p className="ml-2 sm:ml-3 font-bold text-gray-900 text-sm sm:text-sm">
                                {appliedJob?.jobId?.companyId?.companyName}
                              </p>
                            </div>
                          </td>
                          <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-normal p-2 sm:p-3 text-center">
                            {appliedJob?.jobId?.jobTitle}
                          </td>
                          {/* <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          sss
                        </td> */}

                          <td className="text-green-600 px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                            {appliedJob?.status === 'Pending' ? (
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-yellow-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                                <h2 className="text-sm font-normal text-gray-600">{appliedJob?.status}</h2>
                              </div>
                            ) : (
                              <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700"></span>
                                <h2 className="text-sm font-normal text-remeralded-800">{appliedJob?.status}</h2>
                              </div>
                            )}
                          </td>
                          {/* <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-red-300">
                            <h2 className="text-sm font-normal text-red-800">Block</h2>
                          </div>
                        </td> */}

                          {/* <td className="px-2 sm:px-3 lg:px-4 xl:px-6 py-2 sm:py-3 text-sm sm:text-center whitespace-nowrap p-2 sm:p-3 text-center">
                          <div className="inline-flex cursor-pointer items-center px-5 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-green-300">
                          <h2 onClick={()=> unBlockedUser(user?._id)} className="text-sm font-normal text-green-800">Unblock</h2>
                        </div>
                        </td> */}

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}
    </div>
  )
}