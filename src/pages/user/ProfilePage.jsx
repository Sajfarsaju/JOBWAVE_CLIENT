import React, { useState } from 'react'
import Navbar from '../../components/user/home/Navbar'
import Profile from '../../components/user/profile/Profile'
import Footer from '../../components/company/home/Footer'
function ProfilePage() {
  const [reRender, setReRender] = useState(null)
  return (
    <>
      <Navbar setReRender={setReRender} reRender={reRender} />
      <Profile setReRender={setReRender} reRender={reRender}/>
      <Footer/>
    </>
  )
}

export default ProfilePage