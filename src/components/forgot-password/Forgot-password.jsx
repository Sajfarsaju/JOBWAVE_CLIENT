import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios_Instance from '../../api/userAxios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useUserAuth } from '../../context/UserAuthContext';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux'
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
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [isActive, setIsActive] = useState(true)
  // var isActive

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

      const verifyPhone = await Axios_Instance.post('/forgot-password', { Number, action: "verifyPhone" });

      if (verifyPhone.status === 200) {

        //* Login with Phone OTP response
        const response = await setUpRecaptchaForResetPass(number)

        if (response) {
          setConfirmObj(response)
          setIsOpen(false)
        }
      }

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error?.response?.data?.errMsg)
      } else {
        console.log(error)
      }
    }
  };
  //*************************END GET OTP***************************************

  //*************************VERIFY OTP***************************************
  const verifyOtp = async (e) => {

    e.preventDefault()

    if (otp === '' || otp === null || otp.trim().length === 0) return toast.error('Enter a valid OTP');

    try {
      const confirmed = await confirmObj.confirm(otp)

      if (confirmed) {
        setIsFormOpen(true);
        setNotHide(false)

      } else {
        toast.error(confirmed.message);
      }

    } catch (error) {
      console.log(error)
    }
  }
  //*************************END VERIFY OTP***************************************

  //*************************UPDATE USER PASSWORD***************************************
  const handleSubmit = async (e) => {

    e.preventDefault();

    const Number = number.replace(/^91/, '');

    const response = await Axios_Instance.post('/forgot-password', { password, Number, action: "updatePassword" })

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
        <div className='flex justify-center items-center h-screen'>
          <div className='text-center py-14 w-96 p-6 bg-gray-100 rounded-lg shadow-md shadow-gray-500 relative'>
            <h1 className='font-bold absolute top-4 left-9 text-md font-mono text text-yellow-600'>Did you Forgot Password?</h1>
            <h2 className='mb-3 text-sm text-yellow-600 font-semibold font-mono'>Enter your phone number to reset your password.</h2>
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
              <div className='flex justify-center'>
                <Link to={'/login'}>
                  <button
                    type='button'
                    className='bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded mr-2'
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded'
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>

      ) : (
        <div className='flex justify-center items-center h-screen'>
          <div className='text-center w-96 py-8 p-6 bg-gray-100 rounded-lg shadow-md shadow-gray-500'>
            <form onSubmit={verifyOtp}>
              <h1 className='text-sm text-yellow-600 font-semibold font-mono'>Enter the correct OTP to reset your password</h1>
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
                  className='bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded mr-2'
                  onClick={() => setIsOpen(true)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded'
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

          <div className='flex justify-center items-center h-screen'>
            <div className='text-center w-96 py-8 p-6 bg-gray-100 rounded-lg shadow-md shadow-gray-500'>
              <form onSubmit={handleSubmit}>
                <h1 className='text-md text-yellow-600 font-semibold font-mono'>Reset Password</h1>
                <div className='py-6 px-4 mb-3 flex justify-center items-center' aria-controls='formBasicPhoneNumber'>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='flex justify-center'>
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded'
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
