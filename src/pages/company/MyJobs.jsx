import React from 'react'
import JobList from '../../components/company/jobs/JobList'
import Navbar from '../../components/company/home/Navbar'
import Footer from '../../components/company/home/Footer'

function MyJobs() {
  return (
    <>
      <Navbar/>
      <JobList/>
      <Footer/>
    </>
  )
}

export default MyJobs