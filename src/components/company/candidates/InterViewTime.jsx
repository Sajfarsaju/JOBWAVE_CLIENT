import { useEffect, useState } from "react"
import Axios_Instance from "../../../api/userAxios"
import { Link, useLocation } from "react-router-dom"
import Navbar from "../../company/home/Navbar"
import Footer from "../home/Footer"
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux"
import { Button, Checkbox, IconButton, Tooltip } from "@mui/material"
import Spinner from "../../Spinner"
import CandidateNavbar from './candidatesNavbar'


export default function InterViewTime() {

  const companyId = useSelector((state) => state.company.id);

  const [spinnner, setspinnner] = useState(true);
  const [shortlistDetail, setShortlistDetail] = useState([])
  const [reload, setReload] = useState(false)
  const [proccessing, setProccessing] = useState(false);

  useEffect(() => {
    (async function fetchShortlistDetails() {
      try {
        await Axios_Instance.get(`/company/shortlist?companyId=${companyId}`).then((res) => {
          if (res) {
            setspinnner(false)
            setShortlistDetail(res.data.shortlistedDetail)
          } else {
            setspinnner(false)
          }
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

  //? START HIRE CANDIDATE
  const [showHireModal, setShowHireModal] = useState(false)
  const [shortlistedId, setShortlistedId] = useState('')
  const [applicationId, setApplicationId] = useState('')

  const hireCandidate = async (shortlistedId, applicationId) => {

    try {
      setProccessing(true)
      await Axios_Instance.post(`/company/hired`, { shortlistedId, applicationId, newStatus: 'Hired' }).then((res) => {

        if (res.status === 200) {
          setShowHireModal(false)
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
  //? END HIRE CANDIDATE

  return (
    <>
      <Navbar />
      <>

        <div className="h-auto flex flex-col items-center justify-center font-dm-sans font-normal mt-[17%] sm:mt-[0%]">

          <div className="h-auto w-full hidden sm:block sm:pt-[15%] md:pt-[15%] lg:pt-[13%] xl:pt-[11%] mb-5">
            <p className="text-2xl lg:text-3xl ml-[15%]">Shortlisted Candidates</p>

          </div>

          <div className="flex flex-col sm:flex-row w-full mb-[10%]">

            <CandidateNavbar />

            <div className="sm:w-3/4 mt-4">

              {/*Start No Shortlisted candidates available */}
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
              {/*End No Shortlisted candidates available */}

              {/* Spinner*/}
              {spinnner ? (
                <Spinner candidatesPages={true} />
              ) : (
                <>
                  {/* Card started */}
                  {shortlistDetail && shortlistDetail.map((ShortListCandidate, index) => (

                    <div key={index} className="lg:w-10/12 xl:w-9/12 p-4 sm:mx-[5%] ">
                      <div className="border bg-sky-50 border-gray-100 w-full sm:mx-auto lg:w-11/12 rounded-xl shadow-sm shadow-slate-200 p-4 relative flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            src={ShortListCandidate?.candidate?.profile}
                            alt="Profile Image"
                            className="hidden sm:block w-16 h-16 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col flex-grow ml-4 ">
                          {/* ONLY MOBILE SCREENS */}
                          <div className="sm:hidden">
                            <div className='flex flex-col items-start'>
                              <div className='flex items-center space-x-4'>
                                <img className="w-12 h-12 rounded-full" src={ShortListCandidate?.candidate?.profile} alt='' />
                                <p
                                  className={`break-all text-xl font-normal max-w-full mt-2`}
                                  style={{ color: 'rgba(0, 4, 74, 1)' }}
                                >
                                  {ShortListCandidate?.candidate?.firstName} {ShortListCandidate?.candidate?.lastName}
                                </p>
                              </div>
                            </div>
                            <p className="mt-4 font-normal break-all text-base" style={{ color: 'rgba(0, 4, 74, 1)' }}>{ShortListCandidate?.jobId?.jobTitle}</p>

                            <p className="font-normal break-all" style={{ color: 'rgba(109, 110, 141, 1)' }}>Interview: <span>{formattedDateTime(ShortListCandidate?.interViewTime)}</span></p>
                            <p className="font-normal text-yellow-600">Status: {ShortListCandidate?.status}</p>
                            <button
                              className="px-10 mt-2 p-1 rounded-sm text-white bg-green-500 active:bg-green-600"
                              onClick={() => setShowHireModal(true)}>
                              Hire
                            </button>
                          </div>
                          {/* END MOBILE SCREENS ONLY*/}
                          {/* Card start */}
                          <div className="w-full lg:h-auto xl:h-auto hidden sm:block">
                            <div className="flex justify-between items-center mb-1">
                              <p
                                className={`break-all sm:text-xl font-medium max-w-full`}
                                style={{ color: 'rgba(0, 4, 74, 1)' }}>
                                {ShortListCandidate?.candidate?.firstName} {ShortListCandidate?.candidate?.lastName}
                              </p>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                              <p className="font-normal break-all text-base " style={{ color: 'rgba(0, 4, 74, 1)' }}>{ShortListCandidate?.jobId?.jobTitle}</p>

                              <p className="text-yellow-600">{ShortListCandidate?.status}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm mt-1">
                              <p className="font-bold break-all">Interview Time: <span>{formattedDateTime(ShortListCandidate?.interViewTime)}</span></p>

                              <button
                                className="p-2 px-8 rounded-sm text-white bg-green-500 active:bg-green-600"
                                onClick={() => {
                                  setShortlistedId(ShortListCandidate._id)
                                  setApplicationId(ShortListCandidate.applicationId)
                                  setShowHireModal(true)
                                }}>
                                Hire
                              </button>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/*  */}
        {showHireModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-10 backdrop-blur-sm">
            <div className="relative mx-3 w-auto my-6 md:mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="mx-2 flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                  <h3 className="text-md md:text-2xl font-semibold">
                    Hire candidate
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto mx-3">
                  <p className="text-gray-500 text-lg leading-relaxed">
                    You can proceed to hire if the interview is over.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">

                  <button
                    className="text-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowHireModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-emerald-500 active:bg-emerald-600 rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => hireCandidate(shortlistedId, applicationId)}
                  >
                    {proccessing ? 'Hiring...' : 'Hire'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
      <Footer />
    </>
  )
}