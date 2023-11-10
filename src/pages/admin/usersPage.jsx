import React, { Suspense } from 'react'
import Navbar from '../../components/admin/Navbar'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../components/ErrorBoundary'
// import UsersList from '../../components/admin/UsersList'

const UsersList = React.lazy(() => import('../../components/admin/UsersList'))

function usersPage() {

  return (
    <>
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=> {}}>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersList />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default usersPage