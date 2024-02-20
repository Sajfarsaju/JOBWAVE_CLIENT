import { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios_Instance from '../api/userAxios'
import { companyLogin } from '../store/slice/companySlice';
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/slice/userSlice';
import toast from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../api/firebase';
import '../assets/css/login.css'



function Login({ logerName, url }) {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [proccessing, setProccessing] = useState(false)
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [googleSigninData, setGoogleSigninData] = useState({ email: "" }
  );

  const inputPasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateFormData = () => {
    const { email, password } = FormData;
    const errors = {}

    const emailRegex = /^[a-z]{3}[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) errors.email = "Enter a valid email address";


    if (password.trim().length < 6) errors.password = "Password must be at least 6 character long";

    return errors;
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const navigateSignup = () => {
    if (logerName === 'user') {
      navigate('/signup')
    } else if (logerName === 'company') {
      navigate('/company/signup')
    }
  }

  const handleSubmit = async (e) => {

    const errors = validateFormData()
    e.preventDefault();

    if (Object.keys(errors).length === 0) {

      try {
        setProccessing(true)
        const response = await Axios_Instance.post(`/${url}`, FormData);

        if (response.status === 200) {
          setProccessing(false)
          const name = response?.data?.name;
          const role = response?.data?.role;
          const token = response?.data?.token;
          const id = response?.data?.id;
          const isActive = response?.data?.isActive;

          if (role === 'user') {

            if (isActive) {
              dispatch(userLogin({ name, token, role, id }));
              navigate('/');
              toast.success(`Welcome ${name}`);
            } else {
              setProccessing(false)
              toast.error('Your account has been blocked')
            }

          } else if (role === 'company') {
            dispatch(companyLogin({ name, token, id, role }));
            toast.success(`Welcome ${name}`);
            navigate('/company/home');
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setProccessing(false)
          toast.error(error?.response?.data?.errMsg)
        } else {
          setProccessing(false)
          console.log(error)
        }
      }
    } else if (Object.keys(errors).length === 2) {
      toast.error("Enter all fields");
    } else if (errors.email) {
      toast.error(errors.email);
    } else if (errors.password) {
      toast.error(errors.password);
    }
  }

  const handleGoogleSignin = async () => {
    try {

      const data = await signInWithPopup(auth, provider);

      const credentials = GoogleAuthProvider.credentialFromResult(data);

      const user = data.user

      googleSigninData.email = user?.email;

      const response = await Axios_Instance.post('google_signin', googleSigninData);

      if (response.status === 200) {

        const name = response?.data?.name;
        const role = response?.data?.role;
        const token = response?.data?.token;
        const id = response?.data?.id;
        const isActive = response?.data?.isActive;

        if (role === 'user') {

          if (isActive) {
            dispatch(userLogin({ name, token, role, id }));
            navigate('/');
            toast.success(`Welcome ${name}`);
          } else {
            toast.error('Your account has been blocked')
          }

        } else if (role === 'company') {
          dispatch(companyLogin({ name, token, id, role }));
          toast.success(`Welcome ${name}`);
          navigate('/company/home');
        }
      }

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error?.response?.data?.errMsg)
      } else {
        console.log(error)
      }
    }
  }


  return (
    <div className='flex '>

      {/*  */}
      {/* <div className="flex flex-col mt-32 ml-20 h-96" style={{ backgroundImage: 'url("/src/assets/JOBWAVE.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}> */}
      <div className="hidden sm:flex md:flex flex-col h-max w-full mt-24 ml-20 font-dm-sans">
        <div className='-mb-28 w-full flex items-center justify-center'>
          <img className='w-40 h-40' src="/src/assets/JOBWAVELOGO.png" alt="Logo" />
        </div>
        <div className='mt-0 w-full flex items-start justify-center'>
          <img className='w-full' src="/src/assets/work-working-transparent.gif" alt="GIF" />
        </div>
      </div>

      <div className="container max-w-full mx-auto py-10 px-3 md:py-5 md:px-6 ">
        <div className="max-w-sm md:mx-auto lg:mr-20 xl:mr-20">
          <div className="relative flex flex-wrap">

            <div className="w-full relative">
              <div className=" mt-2 shadow-xl shadow-slate-300 p-8 lg:max-w-[400px] md:max-w-[400px] xl:max-w-[400px] sm:max-w-[300px] mx-auto bg-white rounded-md">
                {pathname === '/login' && (

                  <Link to="/" className="text-[#2557a7] flex items-center text-sm mb-2">
                    <FaLongArrowAltLeft className='h-4 w-4' />
                    Back to home
                  </Link>
                )}

                {pathname === '/login' ? (
                  <div className="mb-1 md:mb-3 pb-1 text-left font-base">
                    <p className="mb-2 font-dm-sans text-base md:text-xl font-semibold text-gray-800">
                      Ready to take the next step?
                    </p>
                    <p className='font-dm-sans text-gray-700 text-sm md:text-base'>
                      Sign in and explore your account.
                    </p>

                  </div>
                ) : (
                  <div className="md:mb-5 pb-1 text-left text-base">
                    <p className="mb-2 font-dm-sans text-xl font-semibold text-gray-800">
                      Ready to take the next step?
                    </p>
                    <p className='font-dm-sans text-gray-700 text-md'>
                      Log in to your employer account to manage your company's hiring process. Access tools to post jobs, review applications, and connect with candidates. Enhance your recruitment with our comprehensive suite of features.
                    </p>


                  </div>
                )}

                <form className="mt-2 md:mt-6" onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-lg">
                    <div className="py-1 md:py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">Email</span>
                      <input
                        value={FormData.email}
                        onChange={handleChange}
                        type="email"
                        name='email'
                        className="text-md block px-3 py-1.5 rounded-md w-full bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="py-1 md:py-2">
                      <span className="px-1 text-sm font-dm-sans text-gray-700">Password</span>
                      <div className="relative">
                        <input
                          placeholder=""
                          type={showPassword ? 'text' : 'password'}
                          value={FormData.password}
                          onChange={handleChange}
                          name='password'
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
                    {pathname === '/login' && (

                      <div className="flex justify-end">
                        <label className="block text-gray-700 font-normal font-dm-san text-xs md:text-sm my-1">
                          <Link
                            to={'/forgot_password'}
                            className=" cursor-pointer tracking-tighter text-gray-700"
                          >
                            <span>Forgot Password?</span>
                          </Link>
                        </label>
                      </div>
                    )}
                    <button
                      type='submit'
                      className="mt-3 md:mt-5 font-dm-sans text-lg font-semibold bg-[#2557a7] hover:bg-[#1a4a8e] w-full text-white rounded-sm px-6 h-10 block shadow-xl hover:text-white"
                    >
                      {proccessing ? 'Signing...' : 'Sign in'}
                    </button>

                    {logerName === 'user' && (
                      <div className=" flex items-center mt-2 md:mt-4">
                        <div className="border-t border-stone-300 w-full"></div>
                        <div className="mx-4 text-slate-500 text-base font-dm-sans leading-loose">or</div>
                        <div className="border-t border-stone-300 w-full"></div>
                      </div>
                    )}

                  </div>
                </form>
                {/*  */}
                {logerName === 'user' && (
                  <button
                    onClick={handleGoogleSignin}
                    className="active:bg-slate-200 w-full h-10 border-2 border-gray-200 rounded-sm text-gray-700 uppercase font-dm-sans leading-none mt-4 flex items-center justify-center sm:justify-start px-4"
                  >
                    <svg className="h-7 w-7 md:h-7 md:w-7 lg:h-8 lg:w-10 mr-2 md:mr-4 lg:mr-6" viewBox="0 0 40 40">
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                      <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                      <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.0150 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                    </svg>
                    <span className='text-xs md:text-sm lg:text-sm font-dm-sans self-center'>Continue with Google</span>
                  </button>
                )}

                {logerName === 'user' && (
                  <Link
                    to={'/login_with_otp'}
                    className="active:bg-slate-200 w-full h-10 border-2 border-gray-200 rounded-sm text-gray-700 uppercase font-dm-sans leading-none mt-4 flex items-center justify-center sm:justify-start px-4"
                  >
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/free-google-mail-new-4762011-3955524.png?f=webp"
                      alt="Google Logo"
                      className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 mr-2 md:mr-4 lg:mr-6"
                    />
                    <span className='text-xs md:text-sm lg:text-sm font-dm-sans self-center'>Continue with Otp</span>
                  </Link>
                )}

                <p className="text-gray-600 text-center font-dm-sans leading-loose mt-5">
                  Not a member? <span onClick={navigateSignup} className="cursor-pointer text-[#2557a7]">Signup</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login