import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Login from '../../Login';

function Section() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const [openModal, setOpenModal] = useState(false);

  return (

    // <div className='bg-white min-h-screen flex flex-col md:flex-row'>
    //   {/*  */}
    //   {/* {openModal && (
    //   <Login role="user" url="login"/>
    //   )} */}
    //   {/*  */}
    //   <div className='p-4 flex flex-col items-center justify-center md:w-1/2'>
    //     <div className=''>
    //       <h1 className='text-5xl text-center pt-10 md:pt-16 font-medium text-blue-800'>
    //         Find Your Next
    //       </h1>
    //       <h1 className='text-5xl leading-loose font-medium text-blue-800'>
    //         Dream Job
    //       </h1>
    //     </div>
    //     {/* <div className='mt-2'>
    //       <button onClick={()=>setOpenModal(true)} className="px-8 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-800 rounded-lg focus:outline-none focus:ring focus:ring-opacity-80">
    //         open
    //       </button>
    //     </div> */}
    //   </div>
    //   <div className='md:w-1/2'>
    //     <img
    //       src="../public/job Image 2023-09-08 at 11.32.03 AM.jpeg"
    //       alt=""
    //       className='h-full w-full p-24'
    //     />
    //   </div>
    // </div>
    //     <div className="bg-white">
    //     <div className="relative isolate px-6 pt-14 lg:px-8">
    //     <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    //     <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" 
    //     style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
    //     </div>
    //     <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-36">
    //       <div className="text-center">
    //         <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Find your Dream Job</h1>
    //         <p className="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
    //         <div className="mt-10 flex items-center justify-center gap-x-6">
    //           <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
    //           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
    //     <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white mt-1">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="min-h-full flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight font-serif text-gray-900 sm:text-6xl lg:pt-24 hover:scale-105 duration-500">
                Find your Dream Job
              </h1>
              <p className="font-serif mt-6 text-lg leading-8 text-gray-600  hover:scale-105 duration-1000">
                Are you ready to embark on a journey to discover your ideal career path? At JobSeeker,
                we're dedicated to helping you find the job of your dreams. Our platform connects you with opportunities
                that match your skills and aspirations, making the job search process smoother and more rewarding.
              </p>
              {/* <p className=" text-lg leading-6 text-gray-600">
               Join us today to explore a world of possibilities and take the next step toward a brighter future in your career!
               </p> */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to='/jobs'
                  className="font-serif hover:scale-105 duration-1000  flex-none rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold dark:text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  Get started
                </Link>
                <a href="#" className="font-serif text-sm font-semibold hover:scale-105 duration-1000 leading-6 text-gray-900 hover:text-sky-600">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:mt-0">
            <img
              src="https://sophosknowledgeservices.com/wp-content/uploads/2022/01/employee-hiring-banner-cartoon-hr-people-looking-job-candidates-pictures-giant-clipboard-recruitment-team-concept-193108994-1.jpg"
              alt="Job Image"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </div>

  );
}

export default Section;
