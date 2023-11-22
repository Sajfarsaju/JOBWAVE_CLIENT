import { useState } from 'react'
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
  console.log('number:', number)
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  var isActive

  //*************************GET OTP***************************************
  const getOtp = async (e) => {
    e.preventDefault();

    const Number = number.replace(/^91/, '');
    console.log('Number;',Number)
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

    // if (!phoneRegex.test(number.trim()) || number.trim().length !== 10) toast.error("Enter a valid 10-digit phone number")
    if (number === '' || number.trim().length === 0 || !phoneRegex.test(Number.trim())) {
      return toast.error('Please enter a valid 10-digit phone number');
    }

    try {

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
            console.log('otp:', otp)
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
    let confirmed;

    if (otp === '' || otp === null || otp.trim().length === 0) return toast.error('Enter a valid OTP');

    try {

       confirmed = await confirmObj.confirm(otp)
      
      if (confirmed) {

        dispatch(userLogin({ name, token, role, id }));
        navigate('/')
        toast.success(`Welcome ${name}`);
      } else {
        toast.error(confirmed.message);
        toast.error('Invalid OTP. Please check and try again.');
      }
    } catch (error) {
      console.log(error)
      if(!confirmed){
        toast.error('Invalid OTP. Please check and try again.');
        
      }
    }
  }

  //*************************END VERIFY OTP***************************************

  // const resendOtp = () => {
  //   getOtp()
  // }

  return (
    <>
      {isOpen ? (
        <div className='flex justify-center items-center h-screen bg-slate-100'>
          <div className='text-center w-96 p-10 py-16 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
            <h2 className='mb-8 text-lg font-serif'>Sign in with your phone</h2>
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
              <div className='flex justify-center mt-8'>
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
        <div className='flex justify-center items-center h-screen bg-slate-100'>
          <div className='text-center px-4 py-16 w-96 p-6 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
          <h2 className='mb-8 text-lg font-serif text-green-500'>Please enter your OTP and proceed to login.</h2>
            <form onSubmit={verifyOtp} className=''>
              <div className='mb-3 flex justify-center items-center' aria-controls='formBasicPhoneNumber'>
                <input
                  className='py-2  px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full'
                  type='text'
                  placeholder='Enter OTP'
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              {/* <ResendOTP className='text-green-500 ' onClick={getOtp} /> */}

              <div className='flex justify-center mt-6'>
                <button
                  type='button'
                  className='font-serif border border-red-600 text-red-600 px-2 py-1.5 rounded mr-2 active:bg-red-300'
                  onClick={() => setIsOpen(true)}
                >
                  Go back
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
  )
}

export default PhoneLogin
