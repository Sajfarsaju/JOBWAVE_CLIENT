import { useEffect, useState } from "react"
import Axios_Instance from "../../../api/userAxios"
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import Navbar from "../../company/home/Navbar"
import Footer from "../home/Footer"
import axios from "axios"
import { useSelector } from "react-redux"
import Spinner from "../../Spinner"


export default function HiredCandidates() {

  const companyId = useSelector((state) => state.company.id);

  const [spinnner, setspinnner] = useState(true);
  const [hiredCandidate, setHiredCandidate] = useState([])
  const [reload, setReload] = useState(false)


  useEffect(() => {
    (async function fetchHiredCandidate() {
      try {
        await Axios_Instance.get(`/company/hired?companyId=${companyId}`).then((res) => {
          setspinnner(false)
          setHiredCandidate(res.data.hiredCandidate);
          setReload(!reload)
        })


      } catch (error) {
        console.log(error)
      }
    })()
  }, [reload]);

  return (
    <>
      <Navbar />

      {spinnner ? (

        <Spinner />

      ) : (

        <div className="h-auto flex flex-col items-center justify-center mt-32">

          {/*Start options */}
          <div className="flex flex-wrap mb-3 bg-green-100 shadow-md shadow-slate-400 rounded-md lg:w-10/12 xl:w-10/12 w-11/12 p-3 border-t-4 border-emerald-600">
            {/* For screens greater than 540x720, display options in a single line */}
            <div className="hidden sm:flex sm:w-1/4 w-full">
              <div className="text-lg sm:text-lg font-bold pb-2 rounded-md mx-4 mb-auto">
                <Link to={'/company/candidates'}>Pending</Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:w-1/4 w-full">
              <div className={`text-lg sm:text-lg font-bold pb-2 rounded-md mx-4 mb-auto`}>
                <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:w-1/4 w-full">
              <div className="text-lg sm:text-lg font-bold mx-4 rounded-md border-b-4 border-emerald-500">
                <Link to={'/company/candidates/hired_candidates'}>Hired Candidates</Link>
              </div>
            </div>
            {/* <div className="hidden sm:flex sm:w-1/4 w-full">
                  <div className="text-lg sm:text-lg font-bold mx-4">
                    <Link>Rejected</Link>
                  </div>
                </div> */}

            {/* Only mobile screens */}
            <div className="sm:hidden w-full  flex items-center">
              <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 mb-auto">
                <Link to={'/company/candidates'}>Pending</Link>
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 ">
                <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
              </div>
              <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 border-b-2 border-emerald-500">
                <Link to={'/company/candidates/hired_candidates'}>Hired </Link>
              </div>
              {/* <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2">
                    <Link>Rejected </Link>
                  </div> */}
            </div>
          </div>

          {/*End options */}

          <div className="flex flex-wrap w-11/12 ">
            {/* Card 1 */}
            {hiredCandidate && hiredCandidate.map((candidate, index) => (
              candidate.status === 'Hired' && (

                <div key={candidate._id} className="w-full sm:w-1/2 p-5">
                  <div className="bg-teal-50 p-6 rounded-lg shadow-md shadow-slate-400">
                    <h2 className="lg:text-xl xl:text-xl text-md font-bold text-green-600">Candidate: {index + 1}</h2>
                    <div className="flex items-center flex-col sm:flex-row space-x-4 mt-2">
                      <img
                        src={candidate?.candidate?.profile}
                        alt="Profile Image"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">Applicant Name: <span>{candidate?.candidate?.firstName} {candidate?.candidate?.lastName}</span></p>
                        <p className="font-bold">Applied for: <span>{candidate?.jobId?.jobTitle}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row mt-4">
                    </div>
                    <div className="flex items-center flex-col sm:flex-row mt-2">
                      <div className="">
                        <p className="font-bold">Status: <span>{candidate?.status}</span></p>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      )}

      {hiredCandidate.length < 1 && !spinnner && (
        <div className="flex flex-col items-center justify-center mx-auto">
          {/* Centered UI */}
          <div className="dark:bg-slate-100 p-4 rounded mt-6 text-center">
            <h1 className="lg:text-3xl xl:text-3xl text-xl font-semibold font-serif text-blue-700 mb-4">
              Sorry, No candidates available in the Hired.
            </h1>
            <p className="text-gray-700 font-semibold xl:text-xl text-md lg:text-xl font-serif mb-4">
              Go back and select your candidate.
            </p>
          </div>

          <Link to={'/company/interviewTimes'}>
            <button className="mt-4 font-serif bg-blue-500 text-white shadow-lg shadow-gray-500 rounded px-4 py-2 hover:bg-blue-600">
              Go back
            </button>
          </Link>
        </div>
      )}



      <Footer />
    </>
  )
}