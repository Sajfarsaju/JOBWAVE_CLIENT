import { useEffect, useState } from 'react'
import Navbar from '../home/Navbar';
import Footer from '../../company/home/Footer';
import { useSelector } from 'react-redux';
import Axios_Instance from '../../../api/userAxios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { FiDelete } from 'react-icons/fi'
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IoIosArrowDropright } from "react-icons/io";
import Spinner from '../../Spinner';
import { Input, InputAdornment } from '@mui/material';


function userpro() {

  const { token } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  // console.log('userData;', userData)
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('');
  const [reloadProfile, setReloadProfile] = useState(false);
  const [proccessing, setProccessing] = useState(false);
  const [spinnner, setspinnner] = useState(true);
  const userId = useSelector((state) => state.user.id)


  const [showPassword, setShowPassword] = useState(false);

  const inputPasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    async function getUser() {
      const res = await Axios_Instance.get('/profile');
      if (res.status === 200) {
        setspinnner(false)
        setUserData(res.data.user);
      }
    }

    getUser();
  }, [reloadProfile])


  const [isDropdownOpenArray, setIsDropdownOpenArray] = useState([false, false, false]);

  const toggleDropdown = (index) => {
    const updatedArray = [...isDropdownOpenArray];
    updatedArray[index] = !updatedArray[index];
    setIsDropdownOpenArray(updatedArray);
  };


  return (
    <>
      <Navbar />
      {/* <div className="flex items-center justify-center h-screen relative">
        <img
          className="absolute lg:top-6 xl:top-6 top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 mb-8"
          src="/public/JobWave2-fotor-bg-remover-20230817153930.png"
          alt="Logo"
        />
        <div className=" w-96 relative bg-white p-8 shadow-xl shadow-slate-300">
          
          <div className=" text-center text-slate-500 text-base font-dm-sans uppercase leading-none mb-8">
            Log In
          </div>
          <form className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="text-indigo-950 text-base font-dm-sans capitalize leading-relaxed block">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                className="w-full h-12 border border-stone-300 rounded px-3 leading-relaxed focus:outline-none focus:ring focus:border-blue-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-indigo-950 text-base font-dm-sans capitalize leading-relaxed block">
                Password
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="w-full h-12 border border-stone-300 rounded px-3 leading-relaxed focus:outline-none focus:ring focus:border-blue-700"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={inputPasswordVisibility} edge="end">
                      {showPassword ? <AiFillEyeInvisible /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-blue-700 rounded text-white uppercase font-dm-sans leading-none"
            >
              Log In
            </button>
            <div className="flex items-center mt-4">
              <div className="border-t border-stone-300 w-full"></div>
              <div className="mx-4 text-slate-500 text-base font-dm-sans leading-loose">or</div>
              <div className="border-t border-stone-300 w-full"></div>
            </div>
            <button
              type="button"
              className="w-full h-11 border-2 border-gray-200 rounded text-gray-700 uppercase font-dm-sans leading-none mt-4 flex items-center justify-center"
            >
              <img src="your-google-image-url" alt="Google" className="mr-2" />
              Continue with Google
            </button>
            <p className="text-slate-500 text-base font-dm-sans leading-loose mt-4">
              Already have an account? <span className="text-blue-700">Login</span>
            </p>
          </form>
        </div>
      </div> */}

      <div className="container max-w-full mx-auto py-10 px-6 ">

        <div className="max-w-sm mx-auto lg:mr-20 xl:mr-20">
          <div className="relative flex flex-wrap">
            <div className="w-full relative">
              <div className=" mt-2 shadow-xl shadow-slate-300 p-8 lg:max-w-[400px] md:max-w-[400px] xl:max-w-[400px] sm:max-w-[300px]  mx-auto bg-white rounded-md">
                <div className="mb-5 pb-1 text-left font-base">
                <p className="mb-2 font-dm-sans text-xl font-semibold text-gray-800">
                Start Your Career With Us!
</p>
<p className='font-dm-sans text-gray-700 text-md'>
  Create your account and explore job opportunities that match your skills and aspirations.
</p>
                </div>

                <form className="mt-8">
                  <div className="mx-auto max-w-lg">
                    <div className="py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">First name</span>
                      <input
                        placeholder=""
                        type="text"
                    name='firstName'
                        className="text-md block px-3 py-1.5 rounded-md w-full bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">Last name</span>
                      <input
                        placeholder=""
                        type="text"
                    name='lastName'
                        className="text-md block px-3 py-1.5 rounded-md w-full bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">Email</span>
                      <input
                        placeholder=""
                        type="email"
                    name='email'
                        className="text-md block px-3 py-1.5 rounded-md w-full bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">Phone number</span>
                      <input
                        placeholder=""
                        type="text"
                        name='phone'
                        className="text-md block px-3 py-1.5 rounded-md w-full bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">Password</span>
                      <div className="relative">
                        <input
                          placeholder=""
                          type={showPassword ? 'text' : 'password'}
                          className="text-md block px-3 py-1.5 rounded-md w-full bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-dm-sans leading-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (

                            <svg
                              className="h-3.5 text-gray-700"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="h-3.5 text-gray-700"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path
                                fill="currentColor"
                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type='submit'
                      className="mt-3 font-dm-sans text-lg font-semibold bg-[#2557a7] hover:bg-[#1a4a8e] w-full text-white rounded-sm px-6 h-10 block shadow-xl hover:text-white"
                    >
                      Singup
                    </button>
                    <div className=" flex items-center mt-4">
                      <div className="border-t border-stone-300 w-full"></div>
                      <div className="mx-4 text-slate-500 text-base font-dm-sans leading-loose">or</div>
                      <div className="border-t border-stone-300 w-full"></div>
                    </div>
                    {/*  */}
                    <button
                      type="button"
                      className="active:bg-slate-200 w-full h-10 border-2 border-gray-200 rounded-sm text-gray-700 uppercase font-dm-sans leading-none mt-4 flex items-center justify-center sm:justify-start px-4"
                    >
                      <svg className="h-7 w-7 md:h-7 md:w-7 lg:h-8 lg:w-10 mr-2 md:mr-4 lg:mr-6" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.0150 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                      </svg>
                      <span className='text-xs md:text-sm lg:text-sm font-dm-sans self-center'>Signup with Google</span>
                    </button>
                    {/*  */}
                    <p className="text-gray-600 text-center font-dm-sans leading-loose mt-4">
                    Already a member? <Link to={"/login"} className="text-[#2557a7]">Signin</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default userpro