import React from 'react';
import NotFoundImg from '../assets/404-not found.jpg'
import { useNavigate } from 'react-router-dom';
// import { TbError404 } from "react-icons/bi";
import { BiErrorAlt } from "react-icons/bi";


const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-extrabold text-indigo-600">404 - Not Found</h1>
      <p className="mt-4 text-xl text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <div className="flex items-center">
        {/* <img
      className="mt-8 w-96 h-48"
      src={NotFoundImg}      alt="404 Error"
    /> */}
        <svg viewBox="0 0 24 22" className="text-red-600 w-40 h-40 mt-6 ml-8">
          <BiErrorAlt />
        </svg>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="rounded-md bg-indigo-600 px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover-bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Go back
      </button>
    </div>

  );
};

export default NotFound;
