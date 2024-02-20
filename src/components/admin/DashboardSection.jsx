import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { BiDetail } from "react-icons/bi";
import Axios_Instance from '../../api/userAxios';

function DashboardSection() {

    const [usersCount, setUsersCount] = useState('')
    const [companiesCount, setCompaniesCount] = useState('')
    const [jobsCount, setJobsCount] = useState('')

    async function fetchCounts() {
        try {
            await Axios_Instance.get('/admin/dashboard').then((res) => {
                if (res.status === 200) {
                    setUsersCount(res.data.users)
                    setCompaniesCount(res.data.company)
                    setJobsCount(res.data.jobs)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCounts()
    }, [])

    return (

        <div className='min-h-screen font-dm-sans font-normal px-10 sm:px-0 py-14 sm:mt-0'>
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-600 text-center flex justify-center" style={{ color: 'rgba(0, 4, 74, 0.9)' }}>
                Dashboard Overview
            </h1>

            <div className='sm:items-center flex sm:flex-row flex-col sm:justify-evenly py-5'>

                <div className="dark:bg-slate-100 p-4 w-full h-auto sm:w-3/12 sm:h-52 rounded-lg shadow-md shadow-gray-400 relative mb-4 sm:mb-0">
                    <FaUsers className=" w-8 h-8 sm:h-14 sm:w-14 text-blue-600" />
                    <div className="mt-4"> {/* Adjust the margin-left value based on your preference */}
                        <h2 className="text-md sm:text-lg font-bold mb-2" style={{ color: 'rgba(0, 4, 74, 1)' }}>Total Users</h2>
                        <p className="text-xl sm:text-3xl font-extrabold" style={{ color: 'rgba(0, 4, 74, 1)' }}>{usersCount}</p>
                    </div>
                </div>



                {/* Company Count Card */}
                <div className="dark:bg-slate-100 p-4 w-full h-auto sm:w-3/12 sm:h-52 rounded-lg shadow-md shadow-gray-400 relative mb-4 sm:mb-0">
                    <TiBusinessCard className=" w-8 h-8 sm:h-14 sm:w-14 text-blue-600" />
                    <div className="mt-4"> {/* Adjust the margin-left value based on your preference */}
                        <h2 className="text-md sm:text-lg font-bold mb-2" style={{ color: 'rgba(0, 4, 74, 1)' }}>Total Companies</h2>
                        <p className="text-xl sm:text-3xl font-extrabold" style={{ color: 'rgba(0, 4, 74, 1)' }}>{companiesCount}</p>
                    </div>
                </div>

                {/* Sample Count Card */}
                <div className="dark:bg-slate-100 p-4 w-full h-auto sm:w-3/12 sm:h-52 rounded-lg shadow-md shadow-gray-400 relative mb-4 sm:mb-0">
                    <BiDetail className=" w-8 h-8 sm:h-14 sm:w-14 text-blue-600" />
                    <div className="mt-4"> {/* Adjust the margin-left value based on your preference */}
                        <h2 className="text-md sm:text-lg font-bold mb-2" style={{ color: 'rgba(0, 4, 74, 1)' }}>Total Jobs</h2>
                        <p className="text-xl sm:text-3xl font-extrabold" style={{ color: 'rgba(0, 4, 74, 1)' }}>{jobsCount}</p>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default DashboardSection