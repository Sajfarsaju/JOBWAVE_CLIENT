import { useEffect, useState } from "react"
import Axios_Instance from "../../../api/userAxios"
import { Link, useLocation } from "react-router-dom"
import Navbar from "../../company/home/Navbar"
import Footer from "../home/Footer"
import { toast } from 'react-hot-toast';
import axios from "axios"
import { useSelector } from "react-redux"
import { Button, Checkbox, IconButton, Tooltip } from "@mui/material"
import Spinner from "../../Spinner"


export default function InterViewTime() {

  const companyId = useSelector((state) => state.company.id);

  const { pathname } = useLocation();
  const [spinnner, setspinnner] = useState(true);
  const [shortlistDetail, setShortlistDetail] = useState([])
  const [reload, setReload] = useState(false)
  const [showHireButtonArray, setShowHireButtonArray] = useState([]);
  const [proccessing, setProccessing] = useState(false);

  useEffect(() => {
    (async function fetchShortlistDetails() {
      try {
        await Axios_Instance.get(`/company/shortlist?companyId=${companyId}`).then((res) => {
          setspinnner(false)
          setShortlistDetail(res.data.shortlistedDetail)
          setShowHireButtonArray(res.data.shortlistedDetail.map(() => false));
        })


      } catch (error) {
        console.log(error)
      }
    })()
  }, [reload]);


  const formattedDateTime = (dateTimeString) => {
    if (!dateTimeString) {
      return ''; // Return an empty string if dateTimeString is not provided
    }

    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format
    };

    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString('en-US', options);
    // const formattedTime = dateTime.toLocaleTimeString('en-US', options);

    return `${formattedDate}`;
  };

  const toggleHireButton = (index) => {
    setShowHireButtonArray(prevArray => {
      const updatedArray = [...prevArray];
      updatedArray[index] = !updatedArray[index];
      return updatedArray;
    });
  };

  const hireCandidate = async (shortlistedId, applicationId) => {

    try {
      setProccessing(true)
      await Axios_Instance.post(`/company/hired`, { shortlistedId, applicationId, newStatus: 'Hired' }).then((res) => {

        if (res.status === 200) {
          toast.success('Hired successfully')
          setProccessing(false)
          setReload(!reload)
        }
      })


    } catch (error) {
      console.log(error)
      setProccessing(false)
    }
  }

  return (
    <>
      <Navbar />
      <>
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
                <div className={`text-lg sm:text-lg font-bold pb-2 rounded-md mx-4 mb-auto 
                        ${pathname === '/company/candidates/interviewTimes' ? 'border-b-4 border-emerald-500' : ''}`}>
                  <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
                </div>
              </div>
              <div className="hidden sm:flex sm:w-1/4 w-full">
                <div className="text-lg sm:text-lg font-bold mx-4">
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
                <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 border-b-2 border-emerald-500">
                  <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2">
                  <Link to={'/company/candidates/hired_candidates'}>Hired</Link>
                </div>
                {/* <div className="text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2">
                    <Link>Rejected </Link>
                  </div> */}
              </div>
            </div>

            {/*End options */}

            <div className="flex flex-wrap w-11/12 ">
              {/* Card 1 */}

              {shortlistDetail && shortlistDetail.map((ShortListCandidate, index) => (


                <div key={ShortListCandidate._id} className="w-full sm:w-1/2 p-5">
                  <div className="bg-teal-50 p-6 rounded-lg shadow-md shadow-slate-400">
                    <h2 className="lg:text-xl xl:text-xl text-md font-bold text-green-600">Shortlist Candidate: {index + 1}</h2>
                    <div className="flex items-center flex-col sm:flex-row space-x-4 mt-2">
                      <img
                        src={ShortListCandidate?.candidate?.profile}
                        alt="Profile Image"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold">Applicant Name: <span>{ShortListCandidate?.candidate?.firstName} {ShortListCandidate?.candidate?.lastName}</span></p>
                        <p className="font-bold">Applied for: <span>{ShortListCandidate?.jobId?.jobTitle}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row mt-4">
                      {/* <p className="font-bold">Applied at: <span>{ShortListCandidate?.createdAt ? new Date(ShortListCandidate.createdAt).toLocaleDateString() : ''}</span></p> */}
                      {/* <button
                        onClick={() => viewCandidateCV(ShortListCandidate.cvUrl)}
                        className="font-serif border border-green-600 text-green-600 active:bg-green-300 px-4 py-2 rounded-md mt-2 mx-auto md:ml-auto sm:mx-0">
                        View CV
                      </button> */}
                    </div>
                    <div className="flex items-center flex-col sm:flex-row mt-2">
                      <div className="">
                        <p className="font-bold">Status: <span>{ShortListCandidate?.status}</span></p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="font-bold break-all">Interview Time: <span>{formattedDateTime(ShortListCandidate?.interViewTime)}</span></p>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Tooltip title="Mark as interview completed">
                        <p className="text-md xl:text-lg lg:text-lg text-green-600">Interview is over?</p>
                      </Tooltip>
                      <Tooltip title="Mark as interview completed">
                        <IconButton onClick={() => toggleHireButton(index)}>
                          <Checkbox />
                        </IconButton>
                      </Tooltip>
                      {showHireButtonArray[index] && (
                        <Button
                          style={{ backgroundColor: '#00ff00' }}
                          variant="contained"
                          onClick={() => hireCandidate(ShortListCandidate._id, ShortListCandidate.applicationId, index)}
                        >
                          {proccessing ? 'Hiring...' : 'Hire'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {shortlistDetail.length < 1 && !spinnner && (

          <div className="flex flex-col items-center justify-center mx-auto">
            {/* Centered UI */}
            <div className="dark:bg-slate-100 p-4 rounded mt-6 text-center">
              <h1 className="lg:text-3xl xl:text-3xl text-xl font-semibold font-serif text-blue-700 mb-4">
                Sorry, No candidates available in the shortlist.
              </h1>
              <p className="text-gray-700 font-semibold xl:text-xl text-md lg:text-xl font-serif mb-4">
                Go back and select your candidate.
              </p>
            </div>

            <Link to={'/company/candidates'}>
              <button className="mt-4 font-serif bg-blue-500 text-white shadow-lg shadow-gray-500 rounded px-4 py-2 hover:bg-blue-600">
                Go back
              </button>
            </Link>
          </div>

        )}


      </>
      <Footer />
    </>
  )
}