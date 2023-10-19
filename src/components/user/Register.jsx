import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import Axios_Instance from '../../api/userAxios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../api/firebase';


// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';



const Register = () => {


  const Navigate = useNavigate()
  // JobSeeker title color
  const color = 'Jobseeker'
  const [msg, setMsg] = useState('')
  const [otpValue, setOtpValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: ""

    }
  );
  const [googleSignupData,setGoogleSignupData] = useState(
    {
      firstName : "",
      lastName : "",
      email : "",
      isEmailVerified : false,
      profile : ""
    }
  );
  console.log("googleSignupData;",googleSignupData)

  const inputPasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateFormData = () => {
    const { firstName, lastName, email, phone, password } = formData;
    const errors = {};

    const emailRegex = /^[a-z]{3}[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

    if (firstName.trim().length < 4) {
      errors.firstName = "Enter a valid First name";

    } else if (!nameRegex.test(firstName.trim()) || !nameRegex.test(lastName.trim())) {
      errors.firstName = "Name should contain only alphabetic characters";
    }

    if (!emailRegex.test(email)) errors.email = "Enter a valid email address";

    if (password.trim().length === 0) errors.password = "Password must be at least 6 character long"

    if (password.trim().length < 6) errors.password = "Password must be at least 6 character long"

    if (!phoneRegex.test(phone.trim()) || phone.trim().length !== 10) errors.phone = "Enter a valid 10-digit phone number";



    return errors;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => (
      {
        ...prevFormData,
        [name]: value,
      }
    ));
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const errors = validateFormData();

    if (Object.keys(errors).length === 0) {
      try {

        const response = await Axios_Instance.post('/signup', formData);

        if (response.status === 200) {
          toast.success(response.data.message);
          Navigate('/login');
        }

      } catch (error) {

        if (error.response.status === 401) {
          toast.error(error.response.data.errMsg);
        } else {
          toast.error("Something went wrong your sign up");
        }
        console.log(error);
      }

    } else if (Object.keys(errors).length === 4) {
      toast.error("All fields must be required");
    } else if (errors.firstName) {
      toast.error(errors.firstName);
    } else if (errors.email) {
      toast.error(errors.email);
    } else if (errors.phone) {
      toast.error(errors.phone);
    } else if (errors.password) {
      toast.error(errors.password);
    }

  }

  const handleGoogleSignup = async () => {
    try {

      const data = await signInWithPopup(auth, provider);
      console.log("data;", data)
      const credentials = GoogleAuthProvider.credentialFromResult(data);

      const user = data.user
      console.log("user;", user)
      const nameParts = user?.displayName.split(' ');
      googleSignupData.email = user?.email;
      googleSignupData.firstName = nameParts[0];
      googleSignupData.lastName = nameParts[1];
      googleSignupData.isEmailVerified = user?.emailVerified;
      googleSignupData.profile = user?.photoURL

      const response = await Axios_Instance.post('google_signup' , googleSignupData );

      if (response.status === 200) {
        toast.success(response.data.message);
        Navigate('/');
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
    <>

      <div className="bg-gradient-to-tr from-[#f1f5f9] to-[#cbd5e1] opacity-100 min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
        {/* <button className='btn mt-2 bg-blue-500 w-24' onClick={() => setOpenModal(true)}>Open</button>

    {openModal && ( */}
        <div className="mx-auto sm:w-full max-w-lg bg-gradient-to-tr from-[#94a3b8] to-[#e2e8f0] opacity-100 rounded-3xl shadow-lg shadow-stone-400 overflow-hidden">
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
          <div className="py-4">
            <img
              className="mx-auto h-8 w-auto bg-indigo-600"
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt="JobWave"
            />
          </div>
          {/* {clicked ? ( */}
          <div className="px-11 py-8">
            <h2 className="text-xl font-bold leading-9 text-gray-900 text-center">
              Are you Looking for Dream Job?!
            </h2>
            <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
              Sign up
            </h2>
            <div className="mt-7 flex ">
              <div className="w-1/2 pr-2 shadow border-t border-blue-900">
                <h1 className={`text-center text-lg ${color === 'Jobseeker' ? 'text-blue-900' : null}`}><Link to={'/signup'}> Jobseeker </Link></h1>

              </div>
              <div className="w-1/2 pr-2">
                <h1 className='text-center text-lg'><Link to={'/company/signup'}> Employer </Link> </h1>

              </div>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit} >

              <Grid className='justify-center' container spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="standard"
                    type="text"
                    name='firstName'
                    onChange={handleChange}
                    value={formData.firstName}
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

                <Grid item xs={10}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="standard"
                    type="text"
                    name='lastName'
                    onChange={handleChange}
                    value={formData.lastName}
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


                <Grid item xs={10}>
                  <TextField
                    id="emailAddress"
                    label="Email Address"
                    variant="standard"
                    type="email"
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
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
                <Grid item xs={10}>
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    type="text"
                    name='phone'
                    onChange={handleChange}
                    value={formData.phone}
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

                <Grid item xs={10}>
                  <TextField
                    id="Password"
                    label="Password"
                    variant="standard"
                    name='password'
                    onChange={handleChange}
                    value={formData.password}
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
                </Grid>
              </Grid>

              <div className="mx-10">
                <button
                  type="submit"
                  className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
                >
                  Signup
                </button>
              </div>
            </form>
            <div className="w-11/12 px-4 mr-1 ml-5 mt-6">
              <div className='bg-gray-500 h-0.5' ></div>
              <Link>
                <button
                  onClick={handleGoogleSignup}
                  className='mt-6 group relative w-full flex justify-center py-2 px-3 border border-transparent text-md font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:border-emerald-700 focus:shadow-outline-indigo active:bg-emerald-800 transition duration-150 ease-in-out'>
                  Signup with Google
                </button>
              </Link>
            </div>

            <p className="mt-6 text-center text-sm leading-5 text-gray-900">
              Already a member? <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-800">Sign in</Link>
            </p>
          </div>
        </div>
        {/* )} */}
      </div>


    </>
  )
}

export default Register