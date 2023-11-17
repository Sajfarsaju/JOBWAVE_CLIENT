import { useEffect, useState } from "react"
import Axios_Instance from "../../../api/userAxios"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import ShortListCandidate from "./ShortListCandidate"


export default function ListCandidates() {

  const [spinnner, setspinnner] = useState(true);
  const [viewCv, setViewCv] = useState(false);
  const [CV, setCV] = useState('');
  const [userId, setUserId] = useState('')
  const [jobId, setJobId] = useState('')
  const [applicationId, setApplicationId] = useState('')
  const [isOpenShortlistModal, setIsOpenShortlistModal] = useState(false);
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
  }, []);

  const viewCandidateCV = (CV) => {

    setCV(CV);
    setViewCv(true);
  }

const openShortlistModal = (userId , applicationId ,jobId) => {
 
  setUserId(userId)
  setApplicationId(applicationId)
  setJobId(jobId)
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
      /> }

      {candidates.length > 0 && (
        <>
          <div className="h-auto flex flex-col items-center justify-center mt-32">

            {/*Start options */}
            <div className="flex flex-wrap mb-3 bg-green-100 shadow-md shadow-slate-400 rounded-md lg:w-10/12 xl:w-10/12 w-11/12 p-3 border-t-4 border-emerald-600">
              {/* For screens greater than 540x720, display options in a single line */}
              <div className="hidden sm:flex sm:w-1/4 w-full">
                <div className="text-lg sm:text-lg font-bold pb-2 rounded-md mx-4 mb-auto border-b-4 border-emerald-500">
                  <Link to={''}>Pending</Link>
                </div>
              </div>
              <div className="hidden sm:flex sm:w-1/4 w-full">
                <div className="text-lg sm:text-lg font-bold mx-4">
                  <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
                </div>
              </div>
              {/* <div className="hidden sm:flex sm:w-1/4 w-full">
                <div className="text-lg sm:text-lg font-bold mx-4">
                  <Link>Hired candidates</Link>
                </div>
              </div>
              <div className="hidden sm:flex sm:w-1/4 w-full">
                <div className="text-lg sm:text-lg font-bold mx-4">
                  <Link>Rejected</Link>
                </div>
              </div> */}

              {/* Only mobile screens */}
              <div className="sm:hidden w-full  flex items-center">
                <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 mb-auto border-b-2 border-emerald-500">
                  <Link to={''}>Pending</Link>
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2">
                  <Link>Interview time</Link>
                </div>
                {/* <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2">
                  <Link>Hired </Link>
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2">
                  <Link>Rejected </Link>
                </div> */}
              </div>
            </div>

            {/*End options */}

            <div className="flex flex-wrap w-11/12 ">
              {/* Card 1 */}
              {candidates.map((candidate, index) => (
                candidate.status === 'Pending' && (

                <div key={candidate._id} className="w-full sm:w-1/2 p-5">
                  <div className="bg-teal-50 p-6 rounded-lg shadow-md shadow-slate-400">
                    <h2 className="lg:text-xl xl:text-xl text-md font-bold text-green-600">Candidate: {index + 1}</h2>
                    <div className="flex items-center flex-col sm:flex-row space-x-4 mt-2">
                      <img
                        src={candidate?.applicant?.profile}
                        alt="Profile Image"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">Applicant Name: <span>{candidate?.applicant?.firstName} {candidate?.applicant?.lastName}</span></p>
                        <p className="font-bold">Applied for: <span>{candidate?.jobId?.jobTitle}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row mt-4">
                      <p className="font-bold">Applied at: <span>{candidate?.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : ''}</span></p>
                      <button
                        onClick={() => viewCandidateCV(candidate.cvUrl)}
                        className="font-serif border border-green-600 text-green-600 active:bg-green-300 px-4 py-2 rounded-md mt-2 mx-auto md:ml-auto sm:mx-0">
                        View CV
                      </button>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row mt-2">
                      <div className="">
                        <p className="font-bold">Status: <span>{candidate?.status}</span></p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-bold break-all">Cover Letter: <span>{candidate?.coverLetter}</span></p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <p className="text-md xl:text-lg lg:text-lg text-green-600">Go to Hiring Process!</p>
                      <p
                        onClick={()=>openShortlistModal(candidate?.applicant?._id , candidate._id , candidate?.jobId?._id)}
                        className="cursor-pointer font-serif border font-semibold text-md xl:text-lg lg:text-lg underline text-blue-600 hover:text-blue-500 ml-3">
                        Let's Go?
                      </p>
                    </div>
                  </div>
                </div>
                )
              ))}

            </div>
          </div>
        </>
      )}

      {spinnner && (
        <div className='space-x-4 flex items-center justify-center min-h-screen' >
          <span className='sr-only'>Loading...</span>
          <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-500 border-b-green-700 rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
          <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-500 border-b-green-700 rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
          <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-500 border-b-green-700 rounded-full animate-bounce'></div>
        </div>
      )}


      {candidates.length < 1 && (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Centered UI */}
            <div className="dark:bg-slate-100 p-4 rounded shadow-md shadow-gray-500 text-center">
              <h1 className="lg:text-3xl xl:text-3xl text-xl font-semibold font-serif text-blue-700 mb-4">
                Sorry, No Applied Candidates Yet
              </h1>
              <p className="text-gray-700 font-semibold xl:text-xl text-md lg:text-xl font-serif mb-4">
                Be patient and check back later for applied candidates.
              </p>
            </div>

            <Link to={'/company/home'}>
              <button className="mt-4 font-serif bg-blue-500 text-white shadow-lg shadow-gray-500 rounded px-4 py-2 hover:bg-blue-600">
                Go back
              </button>
            </Link>
          </div>
        </>
      )}


      {viewCv && (
        <>
          <div className={`${viewCv ? 'fixed backdrop-blur-sm inset-0 flex items-center justify-center z-10 transition-opacity duration-300' : 'hidden'}`}>
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-96 h-120 md:max-w-md md:max-h-[80vh] mx-auto rounded shadow-lg overflow-hidden z-10 relative">
              {/* Modal content */}
              <div className="relative">
                <div className="modal-content py-16 text-left">
                  <div className="mb-8">
                    <div className="w-full h-full relative">
                      <button
                        type="button"
                        className="absolute right-4 top-4 text-red-600 hover:text-red-700 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
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
          </div>

        </>
      )}

    </>


  )
}