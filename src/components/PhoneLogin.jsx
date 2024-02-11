import { useState } from 'react'
import 'react-phone-input-2/lib/style.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Axios_Instance from '../api/userAxios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/slice/userSlice';
import { ResendOTP } from "otp-input-react";
import TextField from '@mui/material/TextField';


function PhoneLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [proccessing, setProccessing] = useState(false)
  const [email, setEmail] = useState('')
  const [userOtp, setUserOtp] = useState('')
  const [otpId, setOtpId] = useState('')
  const [isOpenForm, setIsOpenForm] = useState(true);
  const [isOpenOtpForm, setIsOpenOtpForm] = useState(false)

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  var isActive



  //*************************GET OTP***************************************
  const getOtp = async (e) => {
    e.preventDefault();

    setProccessing(true)
    const emailRegex = /^[a-z]{3}[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log('email;', email)

    if (email === '' || email.trim().length === 0 || !emailRegex.test(email.trim())) {
      setProccessing(false)
      return toast.error('Please enter a valid email');
    }

    try {

      const backendResponse = await Axios_Instance.post('/otpLogin', { email, action: 'sendOtp&SaveOtp' })
      if (backendResponse.status === 200 || backendResponse?.data?.message === "Otp sented your mail") {

        setName(backendResponse?.data?.name);
        setRole(backendResponse?.data?.role);
        setToken(backendResponse?.data?.token);
        setId(backendResponse?.data?.id);
        setOtpId(backendResponse?.data?.otpId)
        isActive = backendResponse?.data?.isActive;

        if (isActive) {
          setIsOpenForm(false)
          setIsOpenOtpForm(true)
          setProccessing(false)
          toast.success(backendResponse.data.message)
          console.log("otp sended");

        } else {
          setProccessing(false)
          toast.error('Your account has been blocked')
        }
      } else {
        setProccessing(false)
      }

    } catch (error) {
      setProccessing(false)
      if (error.response?.status === 401 && error.response?.data?.errMsg === 'Your account has been blocked') {
        toast.error(error?.response?.data?.errMsg);

      } else if (error.response?.data?.errMsg === 'You are not registered with this email. Please proceed to the registration page.') {
        toast.error(error?.response?.data?.errMsg);

        setTimeout(() => {
          navigate('/signup');
        }, 3000);
      } else {
        setProccessing(false)
        toast.error('Please try again later')
        console.log(error)
      }
    }
  };

  //*************************END GET OTP***************************************

  //*************************VERIFY OTP***************************************

  const verifyOtp = async (e) => {
    e.preventDefault();
    setProccessing(true)

    try {
      const response = await Axios_Instance.post('/otpLogin', { userId: id, userOtp, action: 'verifyOtp' })

      if (response.status === 200 || response.data.success) {
        setProccessing(false)
        setUserOtp('')
        dispatch(userLogin({ name, token, role, id }));
        navigate('/')
        toast.success(`Welcome ${name}`);

      } else {
        setProccessing(false)
        toast.error('Something went wrong, please try again')
      }
    } catch (err) {
      setProccessing(false)
       //? If blocked user 
       if (err?.response?.data?.isBlocked) {
        toast.error(err?.response?.data?.errMsg);

      }

      if (err.response?.status === 404) {
        toast.error(err?.response?.data?.errMsg);
      } else {
        toast.error('Something went wrong, please try again')
        console.log(err)
      }
    }
  }
  //*************************END VERIFY OTP***************************************

  //************************* RESEND OTP***************************************

  const resendOtp = async () => {

    try {
      setUserOtp('')
      const response = await Axios_Instance.post('/otpLogin', { email, action: 'resendOtp', otpId })

      if (response.status === 200) {
        toast.success(response.data.message)
      }
    } catch (error) {
       //? If blocked user 
       if (error?.response?.data?.isBlocked) {
        toast.error(error?.response?.data?.errMsg);

      } else {
        setProccessing(false)
        toast.error('Please try again later')
        console.log(error)
      }
    }

  }
  //*************************END RESEND OTP***************************************
 
  const handleChangeOTP = (e) => {
    const newValue = e.target.value;

    if (e.nativeEvent.inputType === 'deleteContentBackward') {

      setUserOtp((prevOtp) => prevOtp.slice(0, -1));

    } else {

      if (newValue.length <= 6) {
        setUserOtp((prevOtp) => {
          const newOtp = prevOtp + newValue;

          return newOtp.slice(0, 6);
        });
      }
    }
    const currentIndex = userOtp.length;
    if (currentIndex < 5 && newValue !== '') {
      document.getElementById(`otp-input-${currentIndex + 1}`).focus();
    }
  };
  return (
    <>

      {isOpenForm && (
        <div className='flex justify-center items-center h-screen bg-slate-100'>
          <div className='text-center w-96 p-10 py-16 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
            <h2 className='mb-8 text-lg font-serif'>Sign in with your email</h2>

            <form onSubmit={getOtp}>
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-black dark:text-black"></label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Entre your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
                  {proccessing ? 'Sending...' : 'Send OTP'}
                </button>

              </div>
            </form>
          </div>
        </div>

      )}

      {isOpenOtpForm && (

        <div className='flex justify-center items-center h-screen bg-slate-100'>
          <div className='text-center px-4 py-16 w-96 p-6 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
            <h2 className='mb-8 text-lg font-serif text-green-500'>Please enter your OTP and proceed to login.</h2>
            <form onSubmit={verifyOtp} className=''>
              <div className='mb-3 space-x-3 flex justify-center items-center' aria-controls='formBasicPhoneNumber'>
                {[...Array(6).keys()].map((index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    margin="normal"
                    id={`otp-input-${index}`}
                    type="text"
                    value={userOtp[index] || ''}
                    onChange={handleChangeOTP}
                    className="w-10  mx-2 text-3xl text-center focus:outline-none"
                    InputProps={{
                      style: {
                        background: '#FFFFFF',
                        borderRadius: '7px',
                        border: '1px solid #BDBDBD',
                      },
                    }}
                  />
                ))}
              </div>

              <div onClick={resendOtp}>
                <ResendOTP className='text-green-500 mt-10' />
              </div>

              <div id='resend-otp'></div>

              <div className='flex justify-center mt-6'>
                <button
                  type='button'
                  className='font-serif border border-red-600 text-red-600 px-2 py-1.5 rounded mr-2 active:bg-red-300'
                  onClick={() => setIsOpenForm(true)}
                >
                  Go back
                </button>
                <button
                  type='submit'
                  className='font-serif border border-green-600 text-green-600 px-2 py-1.5 rounded active:bg-green-300'
                >
                  {proccessing ? 'Verifying...' : 'Verify OTP'}
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
