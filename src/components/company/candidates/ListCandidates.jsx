import { useEffect, useState } from "react"
import Axios_Instance from "../../../api/userAxios"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import ShortListCandidate from "./ShortListCandidate"
import Spinner from "../../Spinner"
import CandidateNavbar from './candidatesNavbar'


export default function ListCandidates() {

  const [spinnner, setspinnner] = useState(true);
  const [viewCv, setViewCv] = useState(false);
  const [CV, setCV] = useState('');
  const [userId, setUserId] = useState('')
  const [jobId, setJobId] = useState('')
  const [applicationId, setApplicationId] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [isOpenShortlistModal, setIsOpenShortlistModal] = useState(false);
  const [relaod, setRelaod] = useState(false)
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    (async function fetchCandidates() {
      try {
        await Axios_Instance.get('/company/candidates').then((res) => {
          setspinnner(false)
          setCandidates(res.data.candidates)
        })
      } catch (error) {
        console.log(error)
      }
    })()
  }, [relaod]);

  const viewCandidateCV = (CV) => {

    setCV(CV);
    setViewCv(true);
  }

  const openShortlistModal = (userId, applicationId, jobId, jobTitle) => {
    setUserId(userId)
    setApplicationId(applicationId)
    setJobId(jobId)
    setJobTitle(jobTitle)
    setIsOpenShortlistModal(true)
  }

  return (
    <>
      {isOpenShortlistModal &&
        <ShortListCandidate
          isOpenShortlistModal={isOpenShortlistModal}
          setIsOpenShortlistModal={setIsOpenShortlistModal}
          userId={userId}
          applicationId={applicationId}
          jobId={jobId}
          jobTitle={jobTitle}
          relaod={relaod}
          setRelaod={setRelaod}
        />}





      <div className="h-auto flex flex-col items-center justify-center font-dm-sans font-normal mt-[17%] sm:mt-[0%]">

        <div className="h-auto w-full hidden sm:block sm:pt-[15%] md:pt-[15%] lg:pt-[13%] xl:pt-[11%] mb-5">
          <p className="text-2xl lg:text-3xl ml-[15%]">Pending Candidates</p>

        </div>

        <div className="flex flex-col sm:flex-row w-full mb-[10%]">
          
          <CandidateNavbar />

          <div className="sm:w-3/4 mt-4">

            {/*Start No candidates available */}
            {candidates.length < 1 && !spinnner && (
              <>
                <div className="flex flex-col items-center justify-center mx-auto">
                  <div className="dark:bg-slate-100 p-4 rounded mt-6 text-center">
                    <h1 className="lg:text-3xl xl:text-3xl text-xl font-semibold font-serif text-blue-700 mb-4">
                      Sorry, No Applied Candidates Yet
                    </h1>
                    <p className="text-gray-700 font-semibold xl:text-xl text-md lg:text-xl font-serif mb-4">
                      Be patient and check back later for applied candidates.
                    </p>
                  </div>

                </div>
              </>
            )}
            {/*End No candidates available */}

            {/* Spinner*/}
            {spinnner ? (
              <Spinner candidatesPages={true} />
            ) : (
              <>
                {/* Cards started*/}
                {candidates && candidates.map((candidate, index) => (
                  candidate.status === 'Pending' && (
                    <>

                      <div key={index} className="lg:w-10/12 xl:w-9/12 p-4 sm:mx-[5%] ">
                        <div className="border border-gray-100 w-full sm:mx-auto bg-sky-50 lg:w-11/12 rounded-xl shadow-sm shadow-slate-200 p-4 relative flex items-center">
                          <div className="flex-shrink-0">
                            <img className="hidden sm:block w-16 h-16 rounded-full" src={candidate?.applicant?.profile} alt='' />
                          </div>
                          <div className="flex flex-col flex-grow ml-4 ">
                            {/* ONLY MOBILE SCREENS */}
                            <div className="sm:hidden">
                              <div className='flex flex-col items-start'>
                                <div className='flex items-center space-x-4'>
                                  <img className="w-12 h-12 rounded-full" src={candidate?.applicant?.profile} alt='' />
                                  <p
                                    className={`break-all text-xl font-normal max-w-full mt-2`}
                                    style={{ color: 'rgba(0, 4, 74, 1)' }}
                                  >
                                    {candidate?.applicant?.firstName} {candidate?.applicant?.lastName}
                                  </p>
                                </div>
                                <p className="mt-4 font-normal break-all text-base" style={{ color: 'rgba(0, 4, 74, 1)' }}>{candidate?.jobId?.jobTitle}</p>
                                <p className="mt-2 break-all font-normal" style={{ color: 'rgba(109, 110, 141, 1)' }}>{candidate?.coverLetter}</p>
                              </div>
                              <div className="flex justify-between mt-4 ">
                                <p className="text-yellow-600">Status: {candidate?.status}...</p>

                                <button onClick={() => viewCandidateCV(candidate.cvUrl)}
                                  className="text-gray-800"
                                >View cv
                                </button>
                              </div>
                              <button
                                className="p-1 rounded-md text-white bg-green-500 mt-4 w-full"
                                onClick={() => openShortlistModal(candidate?.applicant?._id, candidate._id, candidate?.jobId?._id, candidate?.jobId?.jobTitle)}
                              >
                                Select candidte
                              </button>
                            </div>
                            {/* END MOBILE SCREENS ONLY*/}
                            {/* Card start */}
                            <div className="w-full lg:h-auto xl:h-auto hidden sm:block">
                              <div className="flex justify-between items-center">
                                <p
                                  className={`break-all text-2xl font-medium  max-w-full`}
                                  style={{ color: 'rgba(0, 4, 74, 1)' }}>
                                  {candidate?.applicant?.firstName} {candidate?.applicant?.lastName}
                                </p>

                                <div className="flex-row items-center space-x-2">

                                  {/* // View Cv Button */}
                                  <button onClick={() => viewCandidateCV(candidate.cvUrl)}
                                    className="text-gray-800 "
                                  >View cv
                                  </button>
                                </div>
                              </div>

                              <div className="flex justify-between items-center mt-1 text-sm ">
                                <p className="font-normal break-all text-base" style={{ color: 'rgba(0, 4, 74, 1)' }}>{candidate?.jobId?.jobTitle}</p>

                                <p className="text-yellow-600">{candidate?.status}...</p>
                              </div>
                              <div className="flex justify-between items-center mt-1 text-sm ">

                                <p className='w-8/12 break-all font-normal' style={{ color: 'rgba(109, 110, 141, 1)' }}>{candidate?.coverLetter}</p>

                                <button
                                  className="p-2 rounded-sm text-white bg-green-500"
                                  onClick={() => openShortlistModal(candidate?.applicant?._id, candidate._id, candidate?.jobId?._id, candidate?.jobId?.jobTitle)}
                                >
                                  Select candidte
                                </button>
                              </div>
                            </div>
                            {/* card end */}
                          </div>
                        </div>
                      </div>
                    </>
                  )))}
              </>
            )}
          </div>
        </div>
      </div>

      {viewCv && (
        <>
          {/* <div className={`${viewCv ? 'fixed backdrop-blur-sm inset-0 flex items-center justify-center z-10 transition-opacity duration-300' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-96 h-120 md:max-w-md md:max-h-[80vh] mx-auto rounded shadow-lg overflow-hidden z-10 relative">
              
              <div className="relative">
                <div className="modal-content py-16 text-left">
                  <div className="mb-8">
                    <div className="w-full h-full relative">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-700 hover:text-gray-800 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => setViewCv(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      <img
                        className="object-cover w-full h-auto"
                        src={CV} alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm">
            <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-md md:text-2xl font-semibold">
                    Candidate Cv
                  </h3>
                  <button
                        type="button"
                        className="  text-gray-700 hover:text-gray-800"
                        onClick={() => setViewCv(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto mx-3">
                  <img src={CV} alt="" />
                  <div className="flex items-center justify-between mt-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>


  )
}