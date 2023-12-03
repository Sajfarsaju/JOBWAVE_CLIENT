import { useState } from 'react'
import Navbar from '../../components/user/home/Navbar'
import JobSection from '../../components/user/jobs/JobSection'
import Footer from '../../components/company/home/Footer'

function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Navbar searchValue={searchQuery} setSearchQuery={setSearchQuery} showSearchield={true} />
      <JobSection searchQuery={searchQuery}/>
      <Footer />
    </>
  )
}

export default JobsPage