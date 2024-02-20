import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './../../../assets/css/landingPage.css'
import SectionTwo from './SectionTwo';
import Axios_Instance from '../../../api/userAxios';
import DotGrid from './DotGrid';
import SectionThree from './SectionThree';
import SectioFour from './SectioFour';
import { userLogout } from '../../../store/slice/userSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import landingImg from '/src/assets/landingImage-removebg-preview.png'

function Section() {

  // 
  // import _debounce from 'lodash/debounce';

  // const [jobData, setJobData] = useState([]);

  // // Define the debounced version of the fetchJobs function
  // const debouncedFetchJobs = _debounce(async () => {
  //   try {
  //     const res = await Axios_Instance.get('/landingJobs');
  //     if (res.status === 200) {
  //       setJobData(res.data.jobs);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, 1000); // Adjust the delay as needed (e.g., 1000 milliseconds)

  // useEffect(() => {
  //   // Call the debounced function in the useEffect
  //   debouncedFetchJobs();

  //   // Cleanup the debounced function on component unmount
  //   return () => debouncedFetchJobs.cancel();
  // }, []);
  // 
  const dispatch = useDispatch()

  const [JobData, setJobData] = useState([])

  async function fetchJobs() {

    try {
      const res = await Axios_Instance.get('/landingJobs')
      if (res.status === 200) {
        setJobData(res.data.jobs)
      }
    } catch (error) {
      console.log(error)
        //? If blocked user 
        if (error?.response?.data?.isBlocked) {
        dispatch(userLogout());
        toast.error(error.response?.data?.errMsg);
      }
    }
  }
  useEffect(() => {
    fetchJobs()
  }, [])

  return (

    <>
      <div className="bg-slate-100 font-dm-sans ">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          {/* 1st section */}
          <div className="min-h-full flex flex-col md:flex-row relative">
            <div className="md:w-1/2 mt-6 relative">
              <div className="text-center">
                <h1 className="text-rgb-text text-3xl font-normal font-dm-sans sm:text-6xl lg:pt-14 hover:scale-105 duration-500">
                  Find Your Next
                  <span className="block"> Dream Job</span>
                </h1>
                <p className="font-dm-sans mt-3 text-md leading-8 text-light-rgb-text hover:scale-105 duration-1000">
                  Are you ready to embark on a journey to discover your ideal career path? At JobSeeker,
                  we're dedicated to helping you find the job of your dreams. Our platform connects you with opportunities
                  that match your skills and aspirations, making the job search process smoother and more rewarding.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to='/jobs'
                    className="font-dm-sans hover:scale-105 duration-1000 flex-none rounded-md bg-rgb-blue px-3.5 py-2.5 text-sm font-normal dark:text-white shadow-sm hover:bg-rgb-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    Looking for a Job?
                  </Link>
                  <Link
                    to='/jobs'
                    className="font-dm-sans hover:scale-105 duration-1000 flex-none rounded-md bg-rgb-green px-3.5 py-2.5 text-sm font-normal dark:text-white shadow-sm hover:bg-rgb-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    Find Talent <span aria-hidden="true">→</span>
                  </Link>
                </div>

              </div>
              {/* <!-- Grid at the bottom --> */}
              <DotGrid />
              {/* <!-- Grid at the bottom --> */}
            </div>
            {/* <!-- right half --> */}
            <div className="md:w-1/2 md:mt-0 flex items-center justify-center">
              <img
                src={landingImg}
                alt="Job Image"
                className="h-auto w-auto py-14 object-cover"
              />
            </div>
          </div>

          {/*  */}

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
      {/* END */}

      <SectionTwo JobData={JobData} />
      <SectionThree />
      <SectioFour />


    </>

  );
}

export default Section;
