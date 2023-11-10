import React from 'react'
import { Link } from 'react-router-dom'
import { BiErrorAlt } from "react-icons/bi";

export default function paymentFailure() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="dark:bg-white rounded-sm shadow-lg shadow-gray-300 p-6 md:mx-auto lg:mt-6 xl:mt-6 text-center">
    <svg
      viewBox="0 0 24 22"
      className="text-red-600 w-16 h-16 lg:w-28 lg:h-28 mx-auto my-6"
    >
      <BiErrorAlt />
    </svg>
    <h3 className="text-2xl md:text-base text-gray-900 font-semibold">
      Payment Failed
    </h3>
    <p className="text-gray-600 my-2">
      We're sorry, but there was an issue with your payment.
    </p>
    <p>Please try again or contact customer support for assistance.</p>
    <div className="py-10">
      <Link
        to={'/jobs'}
        className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
      >
        GO BACK
      </Link>
    </div>  
  </div>
</div>

    )
}

