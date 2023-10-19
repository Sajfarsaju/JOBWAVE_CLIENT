import React from 'react'
import Jobs from '../../components/admin/Jobs'
import Navbar from '../../components/admin/Navbar'
import Footer from '../../components/company/home/Footer'

export default function jobsPage() {
  return (
    <>
        <Navbar/>
        <Jobs/>
        <Footer/>
    </>
  )
}