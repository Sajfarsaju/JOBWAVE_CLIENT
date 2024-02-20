import { useEffect, useState } from "react"
import Axios_Instance from "../../../api/userAxios"
import { Link } from "react-router-dom"
import Navbar from "../../company/home/Navbar"
import Footer from "../home/Footer"
import { useSelector } from "react-redux"
import Spinner from "../../Spinner"
import CandidateNavbar from './candidatesNavbar'


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


      <div className="h-auto flex flex-col items-center justify-center font-dm-sans font-normal mt-[17%] sm:mt-[0%]">

        <div className="h-auto w-full hidden sm:block sm:pt-[15%] md:pt-[15%] lg:pt-[13%] xl:pt-[11%] mb-5">
          <p className="text-2xl lg:text-3xl ml-[15%]">Hired Candidates</p>

        </div>

        <div className="flex flex-col sm:flex-row w-full mb-[10%]">


          <CandidateNavbar />


          <div className="sm:w-3/4 mt-4">

            {/*Start No Hired candidates available */}
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

                <Link to={'/company/candidates/interviewTimes'}>
                  <button className="mt-4 font-serif bg-blue-500 text-white shadow-lg shadow-gray-500 rounded px-4 py-2 hover:bg-blue-600">
                    Go back
                  </button>
                </Link>
              </div>
            )}
            {/*End No Hired candidates available */}

            {/* Spinner */}
            {spinnner ? (
              <Spinner candidatesPages={true} />
            ) : (
              <>

                {/* Card 1 */}
                {hiredCandidate && hiredCandidate.map((candidate, index) => (
                  candidate.status === 'Hired' && (

                    <div key={index} className="lg:w-7/12 xl:w-7/12 p-4 sm:mx-[10%] ">
                      <div className="border bg-sky-50 border-gray-100 w-full sm:mx-auto lg:w-11/12 rounded-xl shadow-sm shadow-slate-200 p-4 relative flex items-center">
                        
                        <div className="flex-shrink-0">
                          <img
                            src={candidate?.candidate?.profile}
                            alt="Profile Image"
                            className=" w-16 h-16 rounded-full" />
                        </div>

                        <div className="flex flex-col flex-grow ml-4 ">
                          <p className="break-all font-normal" style={{ color: 'rgba(0, 4, 74, 1)' }}>Applicant Name: <span className="text-lg sm:text-xl" >{candidate?.candidate?.firstName} {candidate?.candidate?.lastName}</span></p>
                          <p className="break-all font-normal" style={{ color: 'rgba(109, 110, 141, 1)' }}>Applied for: <span className="text-md sm:text-lg">{candidate?.jobId?.jobTitle}</span></p>
                          <p className="break-all font-normal" style={{ color: 'rgba(109, 110, 141, 1)' }}>Status: <span className="text-md sm:text-lg">{candidate?.status}</span></p>
                        </div>
                        {/* </div> */}
                        <div className="flex items-center flex-col sm:flex-row mt-4">
                        </div>
                        <div className="flex items-center flex-col sm:flex-row mt-2">
                          <div className="">
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}