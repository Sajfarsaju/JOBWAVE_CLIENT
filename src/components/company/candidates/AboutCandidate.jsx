import { Link, useParams } from 'react-router-dom'
import Axios_Instance from '../../../api/userAxios';
import { useEffect, useState } from 'react';
import Spinner from '../../Spinner';

function AboutCandidate() {

  const { userName, userId } = useParams();
  const [spinner, setSpinner] = useState(true)
  const [userData, setUserData] = useState({})

  async function fetchAboutCandidate() {
    try {
      const res = await Axios_Instance.get(`/company/viewUserProfile?userId=${userId}`)

      if (res.status === 200) {
        setUserData(res.data.user)
        setSpinner(false)
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAboutCandidate()
  }, [])

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  return (
    <div className='xl:mt-[4%] mt-16 lg:mt-[6%]'>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="md:p-4 flex flex-wrap font-normal font-dm-sans " >
          {/* Left Side - User Profile & Bio & Skills*/}
          <div className="w-full lg:w-2/6 p-4 xl:ml-[5%]">
            <div className="dark:bg-green-50 p-4 relative rounded-xl shadow-lg shadow-slate-300">

              <img
                src={userData?.profile}
                alt="User Profile"
                className="w-32 h-32 mx-auto rounded-full hover:brightness-75"
              />
              <p className="text-center mt-4 text-lg md:text-xl font-bold text-black">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="text-center mt-4 text-sm md:text-base font-normal mx-[5%]">
                {userData?.bio}
              </p>

              {/*Start Skills start */}
              <div className='flex justify-between items-center mt-10 mx-[5%]'>
                <h2 className='text-md md:text-2xl font-semibold'>Skills</h2>

              </div>
              <div className="border-t border-gray-300 mb-6 mx-[5%] mt-2"></div>
              <div className="flex flex-wrap mt-6 mx-[5%]">
                <>
                  {userData?.skills.length < 1 && (
                    <h1 className='text-gray-800'>Skills not available</h1>
                  )}
                </>
                {userData?.skills &&
                  userData?.skills.map((skill, index) => (
                    <div
                      key={index} // Ensure each skill has a unique key
                      className="flex items-center justify-between bg-green-500 text-white px-3 py-2 md:px-4 rounded-lg mb-2 mr-1"
                    >
                      <span className="text-xs md:text-base font-normal">{skill}</span>

                    </div>
                  ))}
              </div>
              {/*End Skills start */}
            </div>
          </div>
          {/* End Left Side - User Profile & Bio & Skills*/}

          {/*Start Right Side - User Information */}
          <div className="w-full lg:w-3/5 p-4">
            {/*Start Job Seeker Information */}
            <div className="dark:bg-green-50 rounded-xl shadow-lg shadow-slate-300 p-6 relative">
              <h2 className="text-md md:text-2xl font-semibold mb-4">Basic Information</h2>

              <div className="border-t border-gray-300 mb-4"></div>

              {/* Name Email, Phone, Location, CTC, Age */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">

                <div className='mt-4' >
                  <p className="text-sm md:text-base font-normal text-black mb-1">
                    Name
                  </p>
                  <p className="text-black text-sm md:text-base md:font-semibold break-all">{userData.firstName} {userData.lastName}</p>
                </div>
                <div className='mt-4' >
                  <p className="text-sm md:text-base font-normal text-black mb-1">Email</p>
                  <p className="text-black text-sm md:text-base md:font-semibold break-all">{userData.email}</p>
                </div>
                <div className='mt-4' >
                  <p className="text-sm md:text-base font-normal text-black mb-1">Phone</p>
                  <p className={`text-black break-all ${userData?.phone ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'}`}>{userData.phone ? userData.phone : 'Not provided'}</p>
                </div>

                {/* Location, CTC, Age */}
                <div className='mt-4'>
                  <p className="text-sm md:text-base font-normal text-black mb-1">Location</p>
                  <p className={`text-black ${userData.location ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'} break-all mb-3`}>
                    {userData.location ? userData.location : 'Not provided'}
                  </p>
                </div>

                <div className='mt-4'>
                  <p className="text-sm md:text-base font-normal text-black mb-1">Current CTC</p>
                  <p className={`text-black ${userData?.currentCTC ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'} break-all mb-3`}>
                    {userData?.currentCTC ? `${userData?.currentCTC} LPA` : 'Not provided'}
                  </p>
                </div>

                <div className='mt-4'>
                  <p className="text-sm md:text-base font-normal text-black mb-1">Age</p>
                  <p className={`text-black ${userData.age ? 'text-sm md:text-base md:font-semibold' : 'text-sm md:text-base font-normal'} break-all mb-3`}>
                    {userData.age ? `${userData.age} Years` : 'Not provided'}
                  </p>
                </div>

              </div>
            </div>
            {/*End Job Seeker Information */}

            {/*Start Experience Card */}
            <div className="mt-8 dark:bg-green-50 p-4 rounded-xl shadow-lg shadow-slate-300">
              <div className='flex justify-between items-center mx-2 md:mx-[1%] mb-2'>
                <h2 className="text-md md:text-2xl font-semibold break-all">Experience</h2>

              </div>
              <div className="border-t border-gray-300 mb-6 mx-2 md:mx-[1%] mt-2"></div>

              <div className="mb-4 mx-2 md:mx-[1%]">
                <>
                  {userData?.experienceDetails.length < 1 && (
                    <h1 className='text-gray-800'>Experiences not available</h1>
                  )}
                </>
                {userData?.experienceDetails &&
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {userData?.experienceDetails.map((experience, index) => (
                      <div key={index} className="border p-4">
                        <div className="flex justify-between">

                          <p className="font-semibold mb-2 text-sm md:text-base">
                            <span className="text-gray-800 font-medium">
                              Position: </span>{experience?.experienceTitle}
                          </p>
                        </div>
                        {/*Start Mobile screen only  */}
                        <div className="md:hidden block text-sm break-all font-medium">

                          <p className="mt-3">
                            <span className="text-gray-800">
                              Company: </span>{experience?.expCompany}
                          </p>
                          <p className="mt-3">
                            <span className="text-gray-800">
                              Place: </span>{experience?.expCompLocation}
                          </p>
                          <p className="mt-3">
                            <span className="text-gray-800">
                              Started: </span>{`${formatDate(experience?.expStartDate)}`}
                          </p>
                          <p className="mt-3">
                            <span className="text-gray-800">
                              Ended: </span>{`${formatDate(experience?.expEndDate)}`}
                          </p>
                        </div>
                        {/*End Mobile screen only  */}

                        <div className="flex flex-row mb-2">
                          <p className="hidden sm:block mr-2">
                            <span className="text-gray-800 font-medium md:text-base sm:text-sm">
                              Company: </span>{experience?.expCompany} -
                          </p>
                          <p className="hidden sm:block">{experience?.expCompLocation}</p>
                        </div>
                        <p className="hidden sm:block break-all mb-2">
                          <span className="text-gray-800 font-medium md:text-base sm:text-sm">
                            Time period: </span>
                          {`${formatDate(experience?.expStartDate)} - ${formatDate(experience?.expEndDate)}`}
                        </p>
                        {/* <div className="border-t border-gray-300"></div> */}
                      </div>
                    ))}
                  </div>
                }

              </div>
            </div>
            {/*End Experience Card */}

          </div>
          {/* End Right Side - User Information */}
        </div>
      )}
    </div>
  )
}

export default AboutCandidate