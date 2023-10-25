import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios_Instance from '../api/userAxios'
import { companyLogin } from '../store/slice/companySlice';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/slice/userSlice';
import toast from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../api/firebase';



function Login({ logerName, url }) {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // modal state
  // const [openModal, setOpenModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [googleSigninData, setGoogleSigninData] = useState({ email: "" }
  );
  console.log("googleSigninData;", googleSigninData)

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
        const response = await Axios_Instance.post(`/${url}`, FormData);

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
      console.log("data;", data)
      const credentials = GoogleAuthProvider.credentialFromResult(data);

      const user = data.user
      console.log("user;", user)
      googleSigninData.email = user?.email;

      const response = await Axios_Instance.post('google_signin', googleSigninData);

      if (response.status === 200) {
        console.log(response.data)
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

    <div className="bg-gradient-to-tr from-[#f1f5f9] to-[#cbd5e1] opacity-100 min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">

      {/* login nice modal */}
      {/* <button className='btn mt-2 bg-blue-500 w-24' onClick={() => setOpenModal(true)}>Open</button>

{openModal && ( */}

      <div className="bg-gradient-to-tr from-[#94a3b8] to-[#e2e8f0] opacity-100 mx-auto sm:w-full max-w-md rounded-lg shadow-lg shadow-stone-400 overflow-hidden">
        {/* modal close btn */}
        {/* <div className="flex justify-end p-2">
                  <button
                    type="button"
                    className="text-slate-400  hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setOpenModal(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div> */}
        {/*  */}
        <div className="py-6">
          <img
            className="mx-auto h-12 w-14"
            src="../public/JobWave2-fotor-bg-remover-20230817153930.png"
            alt="JobWave"
          />
        </div>

        <div className="px-11 py-8">
          {pathname === '/login' ?
            <h2 className='text-lg font-bold leading-9 text-gray-900 text-center'>Welcome Back, Find your dream Job</h2>
            :
            <h2 className='text-lg font-bold leading-9 text-gray-900 text-center'>Welcome Back, Find your dream Jobseeker</h2>
          }
          <h2 className="text-xl font-bold leading-9 text-gray-900 text-center">
            Sign in
          </h2>

          <form className="mt-14 space-y-4" onSubmit={handleSubmit}>
            <Grid className='justify-center' container spacing={2}>
              <Grid item xs={11}>
                <TextField
                  id="emailAddress"
                  label="Email Address*"
                  variant="standard"
                  value={FormData.email}
                  onChange={handleChange}
                  type="email"
                  name='email'
                  fullWidth
                  InputProps={{
                    style: {
                      padding: '4px 3px',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="Password"
                  label="Password*"
                  variant="standard"
                  value={FormData.password}
                  onChange={handleChange}
                  name='password'
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={inputPasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <AiFillEyeInvisible /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      padding: '4px 3px',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {pathname === '/login' &&
                  <Link to={'/forgot_password'} className='flex justify-end text-sm mt-2 text-gray-900'>Forgot password?</Link>
                }
              </Grid>
            </Grid>
            <div className="mx-4">
              <button
                type="submit"
                className="mt-6 group relative w-full flex justify-center py-2 px-3 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="w-11/12 ml-4 mt-6">
            <div className='bg-gray-500 h-0.5' ></div>
            <Link to={'/login_with_phone'}>
              <button className='mt-6 group relative w-full flex justify-center py-2 px-3 border border-transparent text-md font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:border-emerald-700 focus:shadow-outline-indigo active:bg-emerald-800 transition duration-150 ease-in-out'>
                Sign in with Phone
              </button>
            </Link>
          </div>
          <div className="w-11/12 ml-4 mt-1">
            <p className='text-center'>or</p>
            <Link>
              <button
                onClick={handleGoogleSignin}
                className='mt-2 group relative w-full flex justify-center py-2 px-3 border border-transparent text-md font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:border-emerald-700 focus:shadow-outline-indigo active:bg-emerald-800 transition duration-150 ease-in-out'>
                Sign in with Google
              </button>
            </Link>
          </div>
          {/* <div className="bg-blue-600 max-w-xs mx-auto mt-10 p-2 rounded-lg shadow-md">
      <div className="flex ">
        <div className="w-10 h-10">
          <img src="https://sanantoniotreesurgeons.com/wp-content/uploads/2021/05/Illustration-of-Google-icon-on-transparent-background-PNG.png" alt="Google Logo" 
          className="w-10 h-12" />
        </div>
        <div className=" flex-grow p-2 rounded-r-lg">
          <button className="text-white font-semibold  px-2 w-full">
            Sign in with Google
          </button>
        </div>
      </div>
    </div> */}



          {/* <form className="mt-14 space-y-4" onSubmit={handleSubmit}>
  <div className="grid grid-cols-12 gap-4">
    <div className="col-span-12 sm:col-span-12 "> 
      <label htmlFor="emailAddress" className="text-gray-600 text-sm">
        Email Address*
      </label>
      <input
        id="emailAddress"
        name="email"
        value={FormData.email}
        onChange={handleChange}
        type="email"
        className="w-full border-b border-gray-300 py-2 bg-slate-300 focus:outline-none focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div className="col-span-12 sm:col-span-12 ">
      <label htmlFor="Password" className="text-gray-600 text-sm">
        Password*
      </label>
      <div className="relative">
        <input
          id="Password"
          name="password"
          value={FormData.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          className="w-full border-b border-gray-300 py-2 bg-slate-300 focus:outline-none focus:border-indigo-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={inputPasswordVisibility}
            className="focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div className="mx-3">
    <button
      type="submit"
      className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
    >
      Sign in
    </button>
  </div>
</form> */}



          <p className="mt-8 text-center text-sm leading-5 text-gray-900">
            Not a member?
            <span onClick={navigateSignup} className="px-1 text-indigo-800 hover:text-indigo-600 cursor-pointer">Sign up</span>
          </p>


        </div>
      </div>
      {/* )}  */}
    </div>

    //07.09.23
    // {Login modal}
    // <div className="max-w-2xl mx-auto">
    //   <button
    //     className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     type="button"
    //     onClick={openModal}
    //   >
    //     Toggle login modal
    //   </button>

    //   {isModalOpen && (
    //     <div
    //     id="authentication-modal"
    //     aria-hidden="true"
    //     className="fixed inset-0 overflow-x-hidden overflow-y-auto h-modal md:h-full top-0 left-0 flex justify-center items-center z-50"
    //     >
    //       <div className="relative w-full max-w-md px-4 h-full md:h-auto">
    //         <div className="bg-white rounded-lg shadow relative dark:bg-slate-300">
    //           <div className="flex justify-end p-2">
    //             <button
    //               type="button"
    //               className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
    //               onClick={closeModal}
    //             >
    //               <svg
    //                 className="w-5 h-5"
    //                 fill="currentColor"
    //                 viewBox="0 0 20 20"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //           <form
    //             className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
    //             action="#"
    //           >
    //             <h3 className="text-xl font-medium text-gray-900 dark:text-white">
    //               Sign in to our platform
    //             </h3>
    //             <div>
    //               <label
    //                 htmlFor="email"
    //                 className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
    //               >
    //                 Your email
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 id="email"
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    //                 placeholder="name@company.com"
    //                 required=""
    //               />
    //             </div>
    //             <div>
    //               <label
    //                 htmlFor="password"
    //                 className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
    //               >
    //                 Your password
    //               </label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 id="password"
    //                 placeholder="••••••••"
    //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    //                 required=""
    //               />
    //             </div>
    //             <div className="flex justify-between">
    //               <div className="flex items-start">
    //                 <div className="flex items-center h-5">
    //                   <input
    //                     id="remember"
    //                     aria-describedby="remember"
    //                     type="checkbox"
    //                     className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
    //                     required=""
    //                   />
    //                 </div>
    //                 <div className="text-sm ml-3">
    //                   <label
    //                     htmlFor="remember"
    //                     className="font-medium text-gray-900 dark:text-gray-300"
    //                   >
    //                     Remember me
    //                   </label>
    //                 </div>
    //               </div>
    //               <a
    //                 href="#"
    //                 className="text-sm text-blue-700 hover:underline dark:text-blue-500"
    //               >
    //                 Lost Password?
    //               </a>
    //             </div>
    //             <button
    //               type="submit"
    //               className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //             >
    //               Login to your account
    //             </button>
    //             <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
    //               Not registered?{' '}
    //               <a
    //                 href="#"
    //                 className="text-blue-700 hover:underline dark:text-blue-500"
    //               >
    //                 Create account
    //               </a>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    //   <p className="mt-5">
    //     This modal element is part of a larger, open-source library of Tailwind
    //     CSS components. Learn more by going to the official{' '}
    //     <a
    //       className="text-blue-600 hover:underline"
    //       href="#"
    //       target="_blank"
    //     >
    //       Flowbite Documentation
    //     </a>
    //     .
    //   </p>
    // </div>
  )
}

export default Login