import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { toast } from 'react-hot-toast';
import Axios_Instance from '../api/userAxios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/slice/userSlice';

// import OTPInput, { ResendOTP } from "otp-input-react";


function PhoneLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [confirmObj, setConfirmObj] = useState('');
  const { setUpRecaptcha } = useUserAuth();
  console.log('otp:', otp)
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  var isActive

  //*************************GET OTP***************************************
  const getOtp = async (e) => {
    e.preventDefault();

    // const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

    // if (!phoneRegex.test(number.trim()) || number.trim().length !== 10) toast.error("Enter a valid 10-digit phone number")
    if (number === '' || number.trim().length === 0) {
      return toast('Please enter a valid 10-digit phone number');
    }

    try {
      const Number = number.replace(/^91/, '');

      const backendResponse = await Axios_Instance.post('/phoneLogin', { Number })
      if (backendResponse.status === 200) {

        setName(backendResponse?.data?.name);
        setRole(backendResponse?.data?.role);
        setToken(backendResponse?.data?.token);
        setId(backendResponse?.data?.id);
        isActive = backendResponse?.data?.isActive;

        if (isActive) {
          //* Login with Phone OTP response
          const response = await setUpRecaptcha(number)

          if (response) {
            setConfirmObj(response)
            setIsOpen(false)
          }

        } else {
          toast.error('Your account is blocked')
        }
      }
      // //* Login with Phone OTP response
      // const response = await setUpRecaptcha(number)

      // if (response) {
      //   setConfirmObj(response)
      //   setIsOpen(false)
      // }

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error?.response?.data?.errMsg);

         setTimeout(() => {
          navigate('/signup');
        }, 3000);

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

        dispatch(userLogin({ name, token, role, id }));
        navigate('/')
        toast.success(`Welcome ${name}`);
      } else {
        toast.error(confirmed.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  //*************************END VERIFY OTP***************************************


  return (
    <>
      {isOpen ? (
        <div className='flex justify-center items-center h-screen'>
          <div className='text-center w-96 p-6 bg-white rounded-lg shadow-md shadow-gray-500'>
            <h2 className='mb-3'>Sign in with your phone</h2>
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
          <div className='text-center w-96 p-6 bg-slate-300 rounded-lg shadow-md shadow-gray-500'>
            <form onSubmit={verifyOtp}>
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
  )
}

export default PhoneLogin
