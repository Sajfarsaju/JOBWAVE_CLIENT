import React from 'react'

function ErrorFallback( {error , resetErrorBoundary} ) {
  return (
     <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md shadow-gray-500 w-1/2 ">
        <div className="text-red-600 text-lg font-semibold mb-2">
          Oops! Something went wrong
        </div>
        <p className="text-gray-600 mb-2">Error Details:</p>
        <pre className="text-red-800 text-sm mb-5 max-h-40 overflow-y-auto ">
        An unexpected error occurred. Please try again later.
        </pre>
        <div className="text-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback