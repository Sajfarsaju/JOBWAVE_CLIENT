import { useEffect, useState , Fragment} from "react"
import Axios_Instance from "../../../api/userAxios"
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"


export default function ListCandidates() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [candidates, setCandidates] = useState([])
  console.log("candidates;", candidates)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    (async function fetchCandidates() {
      try {
        await Axios_Instance.get('/company/candidates').then((res) => {
          setCandidates(res.data.candidates)
        })
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])


  return (
    <>
    {candidates.length > 0 ? (
      <>
     
    <div className="min-h-screen flex flex-col justify-center items-center py-24 -mt-1">

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Candidates</h2>
          </div>

          {/* <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                  ></path>
                </svg>
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div> */}

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">

                <thead>
                  <tr>
                    <th className="px-3 py-3 border-b-2 font-serif border-slate-300 bg-slate-200 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-3 py-3 border-b-2 font-serif border-slate-300 bg-slate-200 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Job title
                    </th>
                    <th className="px-3 py-3 border-b-2 font-serif border-slate-300 bg-slate-200 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Applied at
                    </th>
                    <th className="px-3 py-3 border-b-2 font-serif border-slate-300 bg-slate-200 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Select
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {candidates.map((candidate) => (
                    <>
                      <tr key={candidate._id} >
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-12 h-12">
                              <img
                                className="w-full h-full rounded-md"
                                src={candidate?.applicant?.profile}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 text-lg font-serif whitespace-no-wrap">{candidate?.applicant?.firstName} {candidate?.applicant?.lastName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 font-serif whitespace-no-wrap">{candidate?.jobId?.jobTitle}</p>
                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 font-serif whitespace-no-wrap">
                            {candidate?.createdAt ? new Date(candidate.createdAt).toLocaleDateString() : ''}
                          </p>

                        </td>
                        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                        
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      </div>
      </>
    ):(
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
    )
  }
{/*  */}
{/* <div key={index} className="w-[1128.41px] mx-auto h-20 relative bg-amber-50 rounded-sm shadow-lg dark:shadow-gray-300 border border-amber-300">
<div className="w-9 h-9 left-[21px] top-[21px] absolute rounded-full justify-center items-center inline-flex">
  <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
      <div className="w-10 h-12 relative flex-col justify-start items-start flex">
          <div className="w-10 h-12 relative">
    <img className="" src={candidate?.applicant?.profile} alt="" />
          </div>
      </div>
  </div>
</div>
<div className="w-[198.10px] h-6 left-[73px] top-[13px] absolute text-slate-800 text-lg font-serif font-semibold  leading-normal">{candidate?.applicant?.firstName} {candidate?.applicant?.lastName}</div>
<div className="w-[235.47px] h-[22px] left-[73px] top-[41px] absolute text-slate-800 text-md font-normal font-serif leading-snug">{candidate?.jobId?.jobTitle} / {candidate?.jobId?.workType} </div>
<h1>hello</h1>
<div className="w-[36.94px] h-[22px] left-[955.82px] top-[29px] absolute text-slate-800 text-md font-normal font-serif leading-snug">Jan 4</div>
<div className="w-[70.97px] h-[26px] pl-2.5 pr-[9.64px] pt-[5px] pb-1.5 left-[1008.44px] top-[27px] absolute bg-amber-100 rounded-full justify-center items-center inline-flex">
  <div className="w-[51.33px] h-[15px] text-center text-amber-600 text-md font-medium font-serif leading-[18px]">Featured</div>
</div>
<div className="w-3 h-4 left-[1095.41px] top-[32px] absolute" />
</div>

// 2
<div className="w-[1128.41px] mx-auto h-20 relative bg-slate-100 rounded-sm shadow-lg dark:shadow-gray-300 border border-slate-300 mt-6">

<div className="w-9 h-9 left-[21px] top-[21px] absolute rounded-full justify-center items-center inline-flex">
  <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
      <div className="w-10 h-10 relative flex-col justify-start items-start flex">
          <div className="w-10 h-10 relative">
    <img src="data:image/jpeg;base64,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" alt="" />
          </div>
      </div>
  </div>
</div>
<div className="w-[198.10px] h-6 left-[73px] top-[17px] absolute text-slate-800 text-base font-semibold font-['Inter'] leading-normal">Senior Web App Designer</div>
<div className="w-[235.47px] h-[22px] left-[73px] top-[41px] absolute text-slate-600 text-sm font-normal font-['Inter'] leading-snug">Contract / Remote / New York, NYC</div>
<div className="w-[36.94px] h-[22px] left-[955.82px] top-[29px] absolute text-slate-500 text-sm font-normal font-['Inter'] leading-snug">Jan 4</div>
<div className="w-[70.97px] h-[26px] pl-2.5 pr-[9.64px] pt-[5px] pb-1.5 left-[1008.44px] top-[27px] absolute bg-amber-100 rounded-full justify-center items-center inline-flex">
  <div className="w-[51.33px] h-[15px] text-center text-amber-600 text-xs font-medium font-['Inter'] leading-[18px]">Featured</div>
</div>
<div className="w-3 h-4 left-[1095.41px] top-[32px] absolute" />
</div> */}
  </>


   
  )
}