import { useState } from 'react'
import Navbar from '../../components/user/home/Navbar'
import Profile from '../../components/user/profile/Profile'
import Footer from '../../components/user/home/Footer'
function ProfilePage() {
  const [reRender, setReRender] = useState(null)
  return (
    <>
      <Navbar setReRender={setReRender} reRender={reRender} />
      <Profile />
      <Footer/>
    </>
  )
}

export default ProfilePage