import { useState } from 'react'
import Navbar from '../../components/user/home/Navbar'
import JobSection from '../../components/user/jobs/JobSection'
import Footer from '../../components/user/home/Footer'

function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  let showSearchield=true
  return (
    <>
      <Navbar searchValue={searchQuery} setSearchQuery={setSearchQuery} showSearchield={showSearchield} />
      <JobSection searchQuery={searchQuery}/>
      <Footer />
    </>
  )
}

export default JobsPage