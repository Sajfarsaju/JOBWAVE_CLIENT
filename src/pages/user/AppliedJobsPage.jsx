import React from 'react'
import Navbar from '../../components/user/home/Navbar'
import AppliedJobs from '../../components/user/profile/appliedJobs/AppliedJobs'
import Footer from '../../components/company/home/Footer'

export default function AppliedJobsPage() {
  return (
    <>
        <Navbar/>
        <AppliedJobs/>
        <Footer/>
    </>
  )
}