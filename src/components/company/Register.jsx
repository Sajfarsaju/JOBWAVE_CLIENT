import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Axios_Instance from '../../api/userAxios';


function Register() {

  // Employer title color
  const color = 'Company'

  // Validate States in India
  const validStatesInIndia = [
    'Karnataka',
    'Kerala',
    'Tamil Nadu',
  ];
  const [states, setStates] = useState('');

  // Validate districts in Kerala
  const validDistrictsInKerala = [
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Ernakulam',
    'Thrissur',
    'Palakkad',
    'Malappuram',
    'Kozhikode',
    'Wayanad',
    'Kannur',
    'Kasaragod',
  ];
  const [districts, setDistricts] = useState('');

  const Navigate = useNavigate();

  // modal state
  // const [openModal, setOpenModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const inputPasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showPassword2, setShowPassword2] = useState(false);
  const inputPasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword) => !prevShowPassword);
  };

  const [confirmPassword, setConfirmPassword] = useState('');
  const [proccessing, setProccessing] = useState(false)
  const [formData, setformData] = useState(
    {
      concernName: "",
      companyName: "",
      email: "",
      phone: "",
      GSTNumber: "",
      password: "",
    }
  );

  const [companyAddress, setCompanyAddress] = useState(
    {
      address: "",
      state: "",
      district: "",
      city: "",
      zip: "",
    }
  )

  const validateFormData = () => {

    const { concernName, companyName, email, phone, GSTNumber, password } = formData;
    const { address, state, district, city, zip } = companyAddress;
    const errors = {};

    // const emailRegex = /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const emailRegex = /^[a-z]{3}[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
    const zipRegex = /^\d{6}$/;
    const GSTRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]{3}$/;

    if (concernName.trim().length < 2 &&
      companyName.trim().length < 2 &&
      email.trim().length === 0 &&
      phone.trim().length !== 10 &&
      GSTNumber.trim().length === 0 &&
      address.trim().length === 0 &&
      state.trim().length === 0 &&
      district.trim().length === 0 &&
      city.trim().length === 0 &&
      zip.trim().length === 0 &&
      password.trim().length === 0 &&
      confirmPassword.trim().length === 0
    ) {
      errors.common = "All fields must be filled";
    }

    if (concernName.trim().length < 2) {
      errors.concernName = "Enter a valid Concern Name";
    } else if (!nameRegex.test(concernName.trim())) {
      errors.concernName = "Concern Name should contain only alphabetic characters";
    }

    if (companyName.trim().length < 2) {
      errors.companyName = "Enter a valid Company Name";
    } else if (!nameRegex.test(companyName.trim())) {
      errors.companyName = "Company Name should contain only alphabetic characters";
    }

    if (!emailRegex.test(email)) errors.email = "Enter a valid email address";
    if (email.trim().length === 0) errors.email = "Enter a valid email address";

    if (!phoneRegex.test(phone.trim()) || phone.trim().length !== 10) errors.phone = "Enter a valid 10-digit phone number";

    if (GSTNumber.trim().length !== 15) errors.GSTNumber = "GST Number should be 15 characters long";
    // if (!GSTRegex.test(GSTNumber)) {
    //   errors.GSTNumber = "Enter a valid GST Number";
    // }


    if (address.trim().length === 0) {

      errors.address = "Enter a valid Address";
    } else if (address.trim().length < 10) {
      errors.address = "Address should be 10 characters long";
    }

    const lowercaseState = state.toLowerCase();
    if (!validStatesInIndia.some(validState => validState.toLowerCase() === lowercaseState)) errors.state = "Enter a valid State";

    // if (district.trim().length < 2) errors.district = "Enter a valid District";
    const lowercaseDistrict = district.toLowerCase();
    if (!validDistrictsInKerala.some(validDistrict => validDistrict.toLowerCase() === lowercaseDistrict)) errors.district = "Enter a valid District";

    if (city.trim().length < 5) errors.city = "Enter a valid City";

    if (!zip.toString().match(zipRegex)) errors.zip = "Enter a valid 6-digit zip code";

    if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 character long";

    } else if (confirmPassword.trim().length === 0) {
      errors.confirmPassword = "Confirm password required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setformData((prevFormData) => (
      {
        ...prevFormData,
        [name]: value
      }
    ));
    setCompanyAddress((prevFormData) => (
      {
        ...prevFormData,
        [name]: value
      }
    ));
    // Confirm pass 
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
    // Update new state in india
    if (name === "state") {
      setStates(value);
    }

    // Update new district in kerala
    if (name === "district") {
      setDistricts(value);
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const errors = validateFormData();

    if (Object.keys(errors).length === 0) {
      setProccessing(true)
      try {

        const response = await Axios_Instance.post('/company/signup', formData, companyAddress);

        if (response.status === 200) {

          toast.success(response.data.message);
          Navigate('/company/login')
        } else {
          setProccessing(false)
        }
      } catch (error) {
        setProccessing(false)
        if (error.response.status === 409) {
          toast.error(error.response.data.errMsg);
        } else {
          console.log(error);
        }
      }

    } else if (errors.common) {
      toast.error(errors.common);

    } else if (errors.concernName) {
      toast.error(errors.concernName);

    } else if (errors.companyName) {
      toast.error(errors.companyName);

    } else if (errors.email) {
      toast.error(errors.email);

    } else if (errors.phone) {
      toast.error(errors.phone);

    } else if (errors.GSTNumber) {
      toast.error(errors.GSTNumber);

    } else if (errors.address) {
      toast.error(errors.address);

    } else if (errors.state) {
      toast.error(errors.state);

    } else if (errors.district) {
      toast.error(errors.district);

    } else if (errors.city) {
      toast.error(errors.city);
    } else if (errors.zip) {
      toast.error(errors.zip);

    } else if (errors.password) {
      toast.error(errors.password);
    } else if (errors.confirmPassword) {
      toast.error(errors.confirmPassword);
    }
  }

  return (
    // <>

    //         <div className="bg-gradient-to-tr from-[#f1f5f9] to-[#cbd5e1] opacity-100 min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
    //         {/* <button className='btn mt-2 bg-blue-500 w-24' onClick={() => setOpenModal(true)}>Open</button>

    // {openModal && ( */}
    //       <div className="bg-gradient-to-tr from-[#e2e8f0] to-[#94a3b8] opacity-100 mx-auto sm:w-full max-w-2xl bg-slate-300 rounded-lg shadow-sm shadow-slate-400 overflow-hidden">
    //         {/* modal close btn */}
    //        {/* <div className="flex justify-end p-2">
    //                   <button
    //                     type="button"
    //                     className="text-slate-700  hover:bg-gray-200 hover:text-gray-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
    //                     onClick={() => setOpenModal(false)}
    //                   >
    //                     <svg
    //                       className="w-5 h-5"
    //                       fill="currentColor"
    //                       viewBox="0 0 20 20"
    //                       xmlns="http://www.w3.org/2000/svg"
    //                     >
    //                       <path
    //                         fillRule="evenodd"
    //                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    //                         clipRule="evenodd"
    //                       />
    //                     </svg>
    //                   </button>
    //                 </div> */}
    //                 {/*  */}
    //         {/* <div className="py-4">
    //           <img
    //             className="mx-auto h-8 w-auto bg-indigo-600"
    //             src="https://tailwindui.com/img/logos/mark.svg?color=white"
    //             alt="JobWave"
    //           />
    //         </div>
    //          */}
    //         <div className="px-6 py-8">
    //         <h2 className="text-xl font-bold leading-9 text-gray-900 text-center">
    //             Are you looking new JobSeeker?!
    //           </h2>
    //           <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
    //             Sign up
    //           </h2>
    //           <div className="mt-7 flex  ">
    //               <div className="w-1/2 pr-2">
    //                 <h1 className='text-center text-lg'><Link to={'/signup'}> Jobseeker </Link></h1>

    //               </div>
    //               <div className=" w-1/2 pr-2 shadow border-t border-blue-900">
    //                 <h1 className={`text-center text-lg ${color === 'Employer' ? 'text-blue-900' : null}`}><Link to={'/company/signup'}> Employer </Link> </h1>

    //               </div>
    //           </div>

    //           <form className="mt-10 space-y-6" onSubmit={handleSubmit} >
    //           <Grid className='justify-center' container spacing={2}>
    //             <Grid item xs={5}>
    //               <TextField
    //                 id="concernName"
    //                 label="Concern Name*"
    //                 variant="standard"
    //                 type="text"
    //                 name='concernName'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={formData.concernName}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={5}>
    //               <TextField
    //                 id="companyName"
    //                 label="Company Name*"
    //                 variant="standard"
    //                 type="text"
    // name='companyName'
    // fullWidth
    // onChange={handleChange}
    // value={formData.companyName}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>


    //             <Grid item xs={5}>
    //               <TextField
    //                 id="emailAddress"
    //                 label="Email Address*"
    //                 variant="standard"
    //                 type="email"
    //                 name='email'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={formData.email}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={5}>
    //               <TextField
    //                 id="phoneNumber"
    //                 label="Phone Number*"
    //                 variant="standard"
    //                 type="text"
    //                 name='phone'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={formData.phone}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={5}>
    //               <TextField
    //                 id="gstNUmber"
    //                 label="GST Number*"
    //                 variant="standard"
    //                 type="text"
    //                 name='GSTNumber'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={formData.GSTNumber}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={5}>
    //               <TextField
    //                 id="companyAddress"
    //                 label="Company Address*"
    //                 variant="standard"
    //                 type="text"
    //                 name='address'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={companyAddress.address}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={3}>
    //               <TextField
    //                 id="state"
    //                 label="State*"
    //                 variant="standard"
    //                 type="text"
    //                 name='state'
    //                 onChange={handleChange}
    //                 value={companyAddress.state}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={2}>
    //               <TextField
    //                 id="district"
    //                 label="District*"
    //                 variant="standard"
    //                 type="text"
    //                 name='district'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={companyAddress.district}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={3}>
    //               <TextField
    //                 id="city"
    //                 label="City*"
    //                 variant="standard"
    //                 type="text"
    //                 name='city'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={companyAddress.city}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>
    //             <Grid item xs={2}>
    //               <TextField
    //                 id="zip"
    //                 label="ZIP*"
    //                 variant="standard"
    //                 type="text"
    //                 name='zip'
    //                 fullWidth
    //                 onChange={handleChange}
    //                 value={companyAddress.zip}
    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid>






    //             {/* Password div */}
    //             {/* <Grid item xs={5}>
    //               <TextField
    //                 id="password"
    //                 label="Password"
    //                 variant="standard"
    //                 name=''
    //                 fullWidth

    //                 InputProps={{
    //                   style: {
    //                     padding: '3px 3px',
    //                   },
    //                 }}
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //               />
    //             </Grid> */}
    //             {/* end */}

    //             <Grid item xs={5}>
    //             <TextField
    //             id="Password"
    //             label="Password"
    //             variant="standard"
    //             name='password'
    //             fullWidth
    //             onChange={handleChange}
    //             value={formData.password}
    //             type={showPassword ? 'text' : 'password'}
    //             InputProps={{
    //               endAdornment: (
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     onClick={inputPasswordVisibility}
    //                     edge="end"
    //                   >
    //                     {showPassword ? <AiFillEyeInvisible/> : <VisibilityIcon />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               ),
    //               style: {
    //                 padding: '3px 3px',
    //               },
    //             }}
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //           />
    //           </Grid>
    //           <Grid item xs={5}>
    //             <TextField
    //             id="ConfirmPassword"
    //             label="Confirm Password"
    //             variant="standard"
    //             name='confirmPassword'
    //             fullWidth
    //             value={confirmPassword}
    //             onChange={handleChange}
    //             type={showPassword2 ? 'text' : 'password'}
    //             InputProps={{
    //               endAdornment: (
    //                 <InputAdornment position="end">
    //                   <IconButton
    //                     onClick={inputPasswordVisibility2}
    //                     edge="end"
    //                   >
    //                     {showPassword2 ? <AiFillEyeInvisible/> :<VisibilityIcon />}
    //                   </IconButton>
    //                 </InputAdornment>
    //               ),
    //               style: {
    //                 padding: '3px 3px',
    //               },
    //             }}
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //           />
    //           </Grid>

    //         </Grid>

    //             <div className="mx-12">
    //               <button
    //                 type="submit"
    //                 className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
    //               >
    //                 Sign up
    //               </button>
    //             </div>
    //           </form>

    //           <p className="mt-6 text-center text-sm leading-5 text-gray-900">
    //             Already a member? <Link to={"/company/login"} className="font-medium text-indigo-600 hover:text-indigo-800">Sign in</Link>
    //           </p>
    //         </div>
    //       </div>
    //       {/* )} */}
    //     </div>
    //     </>
    <div className="container max-w-full mx-auto py-3 px-6 ">
      <div className="max-w-md mx-auto">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="mt-2 shadow-xl shadow-slate-300 p-8 lg:w-auto xl:w-auto sm:w-full mx-auto bg-white rounded-md">
              <div className="mb-3 pb-1 text-left font-base">
                <p className="mb-2 font-dm-sans text-xl font-semibold text-gray-800">
                  Start Your Career With Us!
                </p>
                {/* <p className='font-dm-sans text-gray-700 text-md'>
                  Create your account and explore job opportunities that match your skills and aspirations.
                </p> */}
              </div>

              <form className="" onSubmit={handleSubmit}>

                <div className=" flex">
                  <div className="w-1/2 pr-2 hover:bg-slate-50 hover:text-[#2557a7] border-t border-[#2557a7] rounded-md overflow-hidden">
                    <h1 className="text-center font-dm-sans text-lg p-2">
                      <Link to={'/signup'} className={`block`}>
                        Jobseeker
                      </Link>
                    </h1>
                  </div>

                  <div className={`w-1/2 pr-2 border-t border-[#2557a7] rounded-md overflow-hidden ${color === 'Company' ? 'shadow-lg shadow-slate-100 bg-slate-100' : ''}`}>
                    <h1 className="text-center font-dm-sans text-lg p-2">
                      <Link to={'/company/signup'} className={`block ${color === 'Company' ? 'text-[#2557a7]' : null}`}>
                        Employer
                      </Link>
                    </h1>
                  </div>
                </div>

                <div className="mx-auto max-w-lg">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Concern Name</span>
                      <input
                        type="text"
                        name="concernName"
                        onChange={handleChange}
                        value={formData.concernName}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Company Name</span>
                      <input
                        type="text"
                        name='companyName'
                        onChange={handleChange}
                        value={formData.companyName}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Email</span>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Phone Number</span>
                      <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">GST Number</span>
                      <input
                        type="text"
                        name="GSTNumber"
                        onChange={handleChange}
                        value={formData.GSTNumber}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Address</span>
                      <input
                        type="text"
                        name='address'
                        onChange={handleChange}
                        value={companyAddress.address}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">State</span>
                      <input
                        type="text"
                        name="state"
                        onChange={handleChange}
                        value={formData.state}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">District</span>
                      <input
                        type="text"
                        name="district"
                        onChange={handleChange}
                        value={formData.district}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">City</span>
                      <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        value={formData.city}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">ZIP</span>
                      <input
                        type="text"
                        name="zip"
                        onChange={handleChange}
                        value={formData.zip}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Password</span>
                      <div className="relative">
                        <input
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                          type={showPassword ? 'text' : 'password'}
                          className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
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
                                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c13.79 17.3 26.48 35.59 36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
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
                    <div className="w-full md:w-1/2 px-2 py-1">
                      <span className="block text-sm font-dm-sans text-gray-700">Confirm Password</span>
                      <input
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        type={showPassword2 ? 'text' : 'password'}
                        className="text-md block w-full px-3 py-1.5 rounded-md bg-white border-2 border-gray-200 placeholder-gray-600 shadow-sm focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      />
                      {/* showpass2 icon */}
                      {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-dm-sans leading-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <svg
                              className="h-3.5 text-gray-700"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c13.79 17.3 26.48 35.59 36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
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
                        </div> */}
                      {/* showpass2 icon */}
                    </div>
                  </div>
                  <button
                    type='submit'
                    className="mt-3 font-dm-sans text-md font-semibold bg-[#2557a7] hover:bg-[#1a4a8e] w-full text-white rounded-sm px-6 h-10 block shadow-xl hover:text-white"
                  >
                    {proccessing ? 'Processing...' : 'Signup'}
                  </button>
                  <p className="text-gray-600 text-center font-dm-sans leading-loose mt-4">
                    Already a member? <Link to={"/company/login"} className="text-[#2557a7]">Signin</Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register