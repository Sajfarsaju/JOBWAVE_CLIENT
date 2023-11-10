import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios_Instance from '../../api/userAxios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useUserAuth } from '../../context/UserAuthContext';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { userLogin } from '../../store/slice/userSlice';
// import { userLogin } from '../store/slice/userSlice';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUpRecaptchaForResetPass } = useUserAuth();

  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [NotHide, setNotHide] = useState(true);
  const [confirmObj, setConfirmObj] = useState('');
  console.log('otp:', otp)
  // const [showPassword, setShowPassword] = useState(false);

  // const inputPasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };
  //*************************GET OTP***************************************
  const getOtp = async (e) => {

    e.preventDefault();

    try {
      const Number = number.replace(/^91/, '');
      const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

      if (number === '' || number.trim().length === 0) {
        return toast.error('Please enter a valid 10-digit phone number');
      }
      if (!phoneRegex.test(Number.trim()) || Number.trim().length !== 10) return toast.error("Enter a valid 10-digit phone number");
      
      const verifyPhone = await Axios_Instance.post('/forgot_password', { Number, action: "verifyPhone" });
      
      if (verifyPhone.status === 200) {
        
        //* Login with Phone OTP response
        const response = await setUpRecaptchaForResetPass(number)

        if (response) {
          setConfirmObj(response)
          setIsOpen(false)
        }
      }else{
        toast.error('Not found')
      }

    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("User not found!")
      }else if(error.response?.status === 401 ){
        toast.error("Your account is blocked")
      } else {
        console.log(error)
      }
    }
  };
  //*************************END GET OTP***************************************

  //*************************VERIFY OTP***************************************
  const verifyOtp = async (e) => {

    e.preventDefault()
    let confirmed;
    if (otp === '' || otp === null || otp.trim().length === 0) return toast.error('Enter a valid OTP');

    try {
      confirmed = await confirmObj.confirm(otp)

      if (confirmed) {
        setIsFormOpen(true);
        setNotHide(false)

      } else {
        toast.error(confirmed.message);
      }

    } catch (error) {
      console.log(error);
      if(!confirmed){
        toast.error('Invalid OTP. Please check and try again.');
        
      }
    }
  }
  //*************************END VERIFY OTP***************************************

  //*************************UPDATE USER PASSWORD***************************************
  const handleSubmit = async (e) => {

    e.preventDefault();

    const Number = number.replace(/^91/, '');

    const response = await Axios_Instance.post('/forgot_password  ', { password, Number, action: "updatePassword" })

    if (response.status === 200) {

        navigate('/login')

        setTimeout(() => {
          toast.success(response?.data?.message);
        }, 1000);
      
    }
  }

  //*************************END UPDATE USER PASSWORD***************************************


  return (
    <>
    {NotHide && (
      <>
      {isOpen ? (
        <div className='flex justify-center items-center bg-slate-100 h-screen'>
          <div className='text-center py-24 w-96 p-10  dark:bg-white rounded-sm shadow-lg shadow-gray-400 relative'>
            <div className='flex justify-center'>
            <h1 className='font-bold absolute top-6  text-lg font-serif text text-green-600'>Did you Forgot Password?</h1>
            <h2 className='mb-3 text-md text-green-600 font-semibold font-serif'>Enter your phone number to reset your password.</h2>
            </div>
            <form onSubmit={getOtp}>
              <div className='mb-3' aria-controls='formBasicPhoneNumber'>
                <PhoneInput
                  placeholder='Enter phone number'
                  country={'in'}
                  value={number}
                  onChange={setNumber}
                />
              </div>
              {/* Recaptcha div*/}
              <div id='recaptcha-container' />
              {/*  */}
              <div className='flex justify-center pt-9'>
                <Link to={'/login'}>
                  <button
                    type='button'
                    className='font-serif border border-red-600 text-red-600 px-2 py-1.5 rounded mr-2 active:bg-red-300'
                  >
                    Go back
                  </button>
                </Link>
                <button
                  type='submit'
                  className='font-serif border border-green-600 text-green-600 px-2 py-1.5 rounded active:bg-green-300'
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>

      ) : (
        <div className='flex justify-center items-center bg-slate-100 h-screen'>
          <div className='text-center w-96 py-16 p-5 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
            <form onSubmit={verifyOtp}>
              <h1 className='text-md text-green-600 font-semibold font-serif'>Enter the correct OTP to reset your password</h1>
              <div className='py-6 px-4 mb-3 flex justify-center items-center' aria-controls='formBasicPhoneNumber'>
                <input
                  className='py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full'
                  type='text'
                  placeholder='Enter OTP'
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className='flex justify-center'>
                <button
                  type='button'
                  className='font-serif border border-red-600 text-red-600 px-2 py-1.5 rounded mr-2 active:bg-red-300'
                  onClick={() => setIsOpen(true)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='font-serif border border-green-600 text-green-600 px-2 py-1.5 rounded active:bg-green-300'
                >
                  Verify OTP
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
      </>
)}
      {isFormOpen &&
        <>

          <div className='flex justify-center items-center bg-slate-100 h-screen'>
            <div className='text-center w-96 py-12 p-8 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
              <form onSubmit={handleSubmit}>
                <h1 className='text-lg text-green-600 font-semibold font-serif'>Reset Password</h1>
                <div className='py-6 px-4 mb-3 flex justify-center items-center relative' aria-controls='formBasicPhoneNumber'>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* <button className="text-slate-700 absolute right-6 top-8" onClick={inputPasswordVisibility}>
      {showPassword ? <AiFillEyeInvisible /> : <VisibilityIcon className='w-12 h-12'/>}
      </button> */}
                </div>
                {/* <div className='py-6 px-4 mb-3 flex justify-center items-center relative' aria-controls='formBasicPhoneNumber'>
      <input
        type='password'
        id="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="text-slate-700 absolute right-6 top-8" onClick={''}>
      {showPassword ? <AiFillEyeInvisible /> : <VisibilityIcon />}
      </button>
    </div> */}

                <div className='flex justify-center pt-1'>
                  <button
                    type='submit'
                    className='font-serif border border-green-600 text-green-600 px-2 py-1.5 rounded active:bg-green-300'
                  >
                    Update Password
                  </button>
                </div>

              </form>
            </div>
          </div>
        </>

      }
    </>
  )
}
