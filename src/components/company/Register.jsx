import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import  TextField  from '@mui/material/TextField'
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
    const color = 'Employer'

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

    const [formData, setformData] = useState(
        {
          concernName : "",
          companyName : "",
          email : "",
          phone : "",
          GSTNumber : "",
          password : "",
        }
      );

      const [companyAddress, setCompanyAddress] = useState(
        {
          address : "",
          state : "",
          district : "",
          city : "",
          zip : "",
        }
      )

      const validateFormData = () => {

        const {concernName , companyName , email ,phone , GSTNumber , password} = formData;
        const {address , state , district , city , zip } = companyAddress;
        const errors = {};

        // const emailRegex = /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailRegex = /^[a-z]{3}[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;
        const zipRegex = /^\d{6}$/;
        const GSTRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]{3}$/;

        if (concernName.trim().length < 2) {
          errors.concernName = "Enter a valid Concern Name";
        } else if (!nameRegex.test(concernName.trim())) {
          errors.concernName = "Concern Name should contain only alphabetic characters";
        }

        if (companyName.trim().length < 2) {
          errors.companyName = "Enter a valid Company Name";
        }else if(!nameRegex.test(companyName.trim())){
          errors.companyName = "Company Name should contain only alphabetic characters";
        }

        if (!emailRegex.test(email)) errors.email = "Enter a valid email address";

        if(!phoneRegex.test(phone.trim()) || phone.trim().length !== 10) errors.phone = "Enter a valid 10-digit phone number";

        if (GSTNumber.trim().length !== 15) errors.GSTNumber = "GST Number should be 15 characters long";
        // if (!GSTRegex.test(GSTNumber)) {
        //   errors.GSTNumber = "Enter a valid GST Number";
        // }
        

        if (address.trim().length < 10) errors.address = "Enter a valid Address";

        const lowercaseState = state.toLowerCase();
        if (!validStatesInIndia.some(validState => validState.toLowerCase() === lowercaseState)) errors.state = "Enter a valid State";

        // if (district.trim().length < 2) errors.district = "Enter a valid District";
        const lowercaseDistrict = district.toLowerCase();
        if (!validDistrictsInKerala.some(validDistrict => validDistrict.toLowerCase() === lowercaseDistrict)) errors.district = "Enter a valid District";

        if (city.trim().length < 5) errors.city = "Enter a valid City";

        if (!zip.toString().match(zipRegex)) errors.zip = "Enter a valid 6-digit zip code";

        if(password.trim().length < 6){
          errors.password = "Password must be at least 6 character long";

        }
        else if(password !== confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
      }

        return errors;
      }

      const handleChange = (ev) => {
        const {name , value} =ev.target;
        setformData((prevFormData) => (
          {
            ...prevFormData,
            [name] : value
          }
        ));
        setCompanyAddress((prevFormData) => (
          {
            ...prevFormData,
            [name] : value
          }
        ));
        // Confirm pass 
        if(name === 'confirmPassword'){
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
      // const handleChange = (ev) => {
      //   const {name , value} =ev.target;
      //   setCompanyAddress((prevFormData) => (
      //     {
      //       ...prevFormData,
      //       [name] : value
      //     }
      //   ));
      // }

      const handleSubmit = async(e) => {
        
        e.preventDefault();
        const errors = validateFormData();

        if(Object.keys(errors).length === 0){

          try {
            
            const response = await Axios_Instance.post('/company/signup' , formData , companyAddress);

            if(response.status === 200 ){

              toast.success(response.data.message);
              Navigate('/company/login')
            }
          } catch (error) {

            if(error.response.status === 409){
              toast.error(error.response.data.errMsg);
            }else{
              toast.error("Something went wrong your sign up");
            }
            console.log(error);
          }

        }else if(Object.keys(errors).length === 10){
          toast.error("All fields must be required");

        }else if(errors.concernName){
          toast.error(errors.concernName);

        }else if(errors.companyName){
          toast.error(errors.companyName);

        }else if(errors.email){
          toast.error(errors.email);

        }else if(errors.phone){
          toast.error(errors.phone);

        }else if(errors.GSTNumber){
          toast.error(errors.GSTNumber);
          
        }else if(errors.address){
          toast.error(errors.address);

        } else if(errors.state){
          toast.error(errors.state);

        }else if(errors.district){
          toast.error(errors.district);

        }else if(errors.city){
          toast.error(errors.city);
        }else if(errors.zip){
          toast.error(errors.zip);

        }else if(errors.password){
          toast.error(errors.password);
        }else if(errors.confirmPassword){
          toast.error(errors.confirmPassword);
        }
      }
    
  return (

        <div className="bg-gradient-to-tr from-[#f1f5f9] to-[#cbd5e1] opacity-100 min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
        {/* <button className='btn mt-2 bg-blue-500 w-24' onClick={() => setOpenModal(true)}>Open</button>

{openModal && ( */}
      <div className="bg-gradient-to-tr from-[#e2e8f0] to-[#94a3b8] opacity-100 mx-auto sm:w-full max-w-2xl bg-slate-300 rounded-lg shadow-2xl shadow-stone-500 overflow-hidden">
        {/* modal close btn */}
       {/* <div className="flex justify-end p-2">
                  <button
                    type="button"
                    className="text-slate-700  hover:bg-gray-200 hover:text-gray-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
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
        
        <div className="px-6 py-8">
        <h2 className="text-xl font-bold leading-9 text-gray-900 text-center">
            Are you looking new JobSeeker?!
          </h2>
          <h2 className="text-2xl font-bold leading-9 text-gray-900 text-center">
            Sign up
          </h2>
          <div className="mt-7 flex  ">
              <div className="w-1/2 pr-2">
                <h1 className='text-center text-lg'><Link to={'/signup'}> Jobseeker </Link></h1>

              </div>
              <div className=" w-1/2 pr-2 shadow border-t border-blue-900">
                <h1 className={`text-center text-lg ${color === 'Employer' ? 'text-blue-900' : null}`}><Link to={'/company/signup'}> Employer </Link> </h1>
    
              </div>
          </div>
    
          <form className="mt-10 space-y-6" onSubmit={handleSubmit} >
          <Grid className='justify-center' container spacing={2}>
            <Grid item xs={5}>
              <TextField
                id="concernName"
                label="Concern Name*"
                variant="standard"
                type="text"
                name='concernName'
                fullWidth
                onChange={handleChange}
                value={formData.concernName}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="companyName"
                label="Company Name*"
                variant="standard"
                type="text"
                name='companyName'
                fullWidth
                onChange={handleChange}
                value={formData.companyName}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          
          
            <Grid item xs={5}>
              <TextField
                id="emailAddress"
                label="Email Address*"
                variant="standard"
                type="email"
                name='email'
                fullWidth
                onChange={handleChange}
                value={formData.email}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="phoneNumber"
                label="Phone Number*"
                variant="standard"
                type="text"
                name='phone'
                fullWidth
                onChange={handleChange}
                value={formData.phone}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="gstNUmber"
                label="GST Number*"
                variant="standard"
                type="text"
                name='GSTNumber'
                fullWidth
                onChange={handleChange}
                value={formData.GSTNumber}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="companyAddress"
                label="Company Address*"
                variant="standard"
                type="text"
                name='address'
                fullWidth
                onChange={handleChange}
                value={companyAddress.address}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="state"
                label="State*"
                variant="standard"
                type="text"
                name='state'
                onChange={handleChange}
                value={companyAddress.state}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="district"
                label="District*"
                variant="standard"
                type="text"
                name='district'
                fullWidth
                onChange={handleChange}
                value={companyAddress.district}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="city"
                label="City*"
                variant="standard"
                type="text"
                name='city'
                fullWidth
                onChange={handleChange}
                value={companyAddress.city}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="zip"
                label="ZIP*"
                variant="standard"
                type="text"
                name='zip'
                fullWidth
                onChange={handleChange}
                value={companyAddress.zip}
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            
                
     
      

            {/* Password div */}
            {/* <Grid item xs={5}>
              <TextField
                id="password"
                label="Password"
                variant="standard"
                name=''
                fullWidth
                
                InputProps={{
                  style: {
                    padding: '3px 3px',
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}
            {/* end */}

            <Grid item xs={5}>
            <TextField
            id="Password"
            label="Password"
            variant="standard"
            name='password'
            fullWidth
            onChange={handleChange}
            value={formData.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={inputPasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <AiFillEyeInvisible/> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                padding: '3px 3px',
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </Grid>
          <Grid item xs={5}>
            <TextField
            id="ConfirmPassword"
            label="Confirm Password"
            variant="standard"
            name='confirmPassword'
            fullWidth
            value={confirmPassword}
            onChange={handleChange}
            type={showPassword2 ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={inputPasswordVisibility2}
                    edge="end"
                  >
                    {showPassword2 ? <AiFillEyeInvisible/> :<VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                padding: '3px 3px',
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </Grid>
          
        </Grid>
       
            <div className="mx-12">
              <button
                type="submit"
                className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm leading-5 text-gray-900">
            Already a member? <Link to={"/company/login"} className="font-medium text-indigo-600 hover:text-indigo-800">Sign in</Link>
          </p>
        </div>
      </div>
      {/* )} */}
    </div>

  )
}

export default Register