import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function candidatesNavbar() {

  const { pathname } = useLocation();

  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const filterCandidates = (status) => {

    setSelectedStatus(status);
  };

  return (
    <>
      {/*Start options */}
      {/* <div className="mx-auto w-7/12 flex flex-wrap justify-between  mb-3 bg-slate-50 shadow-sm shadow-slate-300 rounded-md p-2 border-t-2 border-emerald-600">
            
            <div className="hidden sm:flex sm:w-1/4 w-full">
              <div className={`text-lg sm:text-lg font-bold pb-2 rounded-md mx-4 mb-auto ${pathname === '/company/candidates' ? 'border-b-4 border-emerald-500' : ''} `}>
                <Link to={'/company/candidates'}>Pending</Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:w-1/4 w-full">
              <div className={`text-lg sm:text-lg font-bold mx-4 ${pathname === '/company/candidates/interviewTimes' ? 'border-b-4 border-emerald-500' : ''}`}>
                <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:w-1/4 w-full">
              <div className={`text-lg sm:text-lg font-bold mx-4 ${pathname === '/company/candidates/hired_candidates' ? 'border-b-4 border-emerald-500' : ''}`}>
                <Link to={'/company/candidates/hired_candidates'}>Hired Candidates</Link>
              </div>
            </div> */}

      {/* Only mobile screens */}
      {/* <div className="sm:hidden w-full  flex items-center">
              <div className={`text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 mb-auto ${pathname === '/company/candidates' ? 'border-b-4 border-emerald-500' : ''}`}>
                <Link to={'/company/candidates'}>Pending</Link>
              </div>
              <div className={`text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 ${pathname === '/company/candidates/interviewTimes' ? 'border-b-4 border-emerald-500' : ''}`}>
                <Link to={'/company/candidates/interviewTimes'}>Interview time</Link>
              </div>
              <div className={`text-xs sm:text-sm lg:text-base font-bold mx-2 pb-2 ${pathname === '/company/candidates/hired_candidates' ? 'border-b-4 border-emerald-500' : ''}`}>
                <Link to={'/company/candidates/hired_candidates'}>Hired </Link>
              </div>
            </div>
          </div> */}

      {/*End options */}
      <div className="sm:ml-[5%] md:w-1/4 w-full h-full p-4 border-r mt-6">
        <button
          className={`w-full p-2 text-center border ${pathname === '/company/candidates' ? 'border-blue-300 bg-sky-50' : 'border-slate-300 hover:bg-sky-50'}`}

        >
          <Link
            to={'/company/candidates'}

          >
            Pending
          </Link>
        </button>

        <button
          className={`w-full p-2 text-center border ${pathname === '/company/candidates/interviewTimes' ? 'border-blue-300 bg-sky-50' : 'border-slate-300 hover:bg-sky-50'}`}>
          <Link
            to={'/company/candidates/interviewTimes'}>
            Shortlisted
          </Link>
        </button>

        <button
          className={`w-full p-2 text-center border ${pathname === '/company/candidates/hired_candidates' ? 'border-blue-300 bg-sky-50' : 'border-slate-300 hover:bg-sky-50'}`}>
          <Link
            to={'/company/candidates/hired_candidates'}>
            Hired
          </Link>
        </button>
      </div>
    </>
  )
}

export default candidatesNavbar