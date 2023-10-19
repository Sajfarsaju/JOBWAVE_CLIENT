import React from 'react'
import Navbar from '../../components/admin/Navbar'
import UsersList from '../../components/admin/UsersList'

function usersPage() {

  return (
    <div>
        <Navbar/>
        <UsersList/>
    </div>
  )
}

export default usersPage