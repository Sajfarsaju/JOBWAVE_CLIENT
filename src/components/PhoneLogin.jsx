import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { toast } from 'react-hot-toast';
import Axios_Instance from '../api/userAxios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/slice/userSlice';
import { ResendOTP } from "otp-input-react";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../api/firebase";
import TextField from '@mui/material/TextField';


function PhoneLogin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [proccessing, setProccessing] = useState(false)
  const [number, setNumber] = useState('');
  console.log('number;', number)
  const [otp, setOtp] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(true);
  const [isOpenOtpForm, setIsOpenOtpForm] = useState(false)
  const [confirmObj, setConfirmObj] = useState('');
  const [isComponentMounted, setComponentMounted] = useState(false);

  const { setUpRecaptcha } = useUserAuth();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  var isActive
  console.log('otp;', otp)

  const handleChangeOTP = (e) => {
    const newValue = e.target.value;

    if (e.nativeEvent.inputType === 'deleteContentBackward') {

      setOtp((prevOtp) => prevOtp.slice(0, -1));

    } else {

      if (newValue.length <= 6) {
        setOtp((prevOtp) => {
          const newOtp = prevOtp + newValue;

          return newOtp.slice(0, 6);
        });
      }
    }
    const currentIndex = otp.length;
    if (currentIndex < 5 && newValue !== '') {
      document.getElementById(`otp-input-${currentIndex + 1}`).focus();
    }
  };

  function onCaptchVerify() {
    console.log('first');
    console.log(window.recaptchaVerifier);
  
    const recaptchaContainer = document.getElementById("recaptcha-container");
  
    if (!window.recaptchaVerifier && recaptchaContainer) {
      console.log('heyyyy');
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {},
        }
      );
  
      console.log("RecaptchaVerifier created:", window.recaptchaVerifier);
    }
  }

  //*************************GET OTP***************************************
  const getOtp = async (e) => {
    e.preventDefault();

    setProccessing(true)


    const Number = number.replace(/^91/, '')

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
          // const response = await setUpRecaptcha(number)
          await onCaptchVerify();

          const formatedNumber = `+${number}`
          console.log('formatedNumber;',formatedNumber)
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, formatedNumber, appVerifier)
            .then((confirmationResult) => {
              if (confirmationResult) {

                setConfirmObj(confirmationResult);
                setIsOpenForm(false)
                setIsOpenOtpForm(true)
                setProccessing(false)
                console.log("otp sended");
              }

            })
            .catch((error) => {
              console.log(error);
            });

          // if (response) {
          //   setConfirmObj(response)
          //   setIsOpenForm(false)
          //   setIsOpenOtpForm(true)
          // }


        } else {
          setProccessing(false)
          toast.error('Your account is blocked')
        }
      }

    } catch (error) {
      setProccessing(false)
      if (error.response?.status === 401) {
        toast.error(error?.response?.data?.errMsg);

        setTimeout(() => {
          navigate('/signup');
        }, 3000);

      } else {
        setProccessing(false)
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
      setProccessing(true)
      confirmed = await confirmObj.confirm(otp)

      if (confirmed) {
        setProccessing(false)
        dispatch(userLogin({ name, token, role, id }));
        navigate('/')
        toast.success(`Welcome ${name}`);
      } else {
        setProccessing(false)
        toast.error(confirmed.message);
        toast.error('Invalid OTP. Please check and try again.');
      }
    } catch (error) {
      setProccessing(false)
      console.log(error)
      if (!confirmed) {
        toast.error('Invalid OTP. Please check and try again.');

      }
    }
  }

  //*************************END VERIFY OTP***************************************

  //************************* RESEND OTP***************************************


  // useEffect(() => {
  //   onCaptchVerify();
  // }, [isOpenForm]);
  //   useEffect(() => {
  //     setComponentMounted(true);
  //     return () => setComponentMounted(false);
  // }, []);

  // useEffect(() => {
  //     if (isComponentMounted) {
  //         onCaptchVerify();
  //     }
  // }, [isComponentMounted]);

  //??? 
  const resendOtp = async () => {
    onCaptchVerify()
    const phoneNumber = `+${number}`;
    console.log('phoneNumber;', phoneNumber)
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult)
        setConfirmObj(confirmationResult);
        console.log("otp sended", confirmationResult);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log('setuprecaptcha:', phoneNumber);

    // const recaptchaVerifier = new RecaptchaVerifier(
    //   auth,
    //   'resend-otp',
    //   {}
    // );
    // recaptchaVerifier.render();
    // return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  }
  //*************************END RESEND OTP***************************************

  return (
    <>
      {/* Recaptcha div*/}
      <div id="recaptcha-container" ></div>
      {/*  */}
      {isOpenForm && (
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
                {/* <input
                  className='py-2  px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full'
                  type='text'
                  placeholder='Enter OTP'
                  onChange={(e) => setOtp(e.target.value)}
                /> */}

                {[...Array(6).keys()].map((index) => (
                  <TextField
                    key={index}
                    variant="outlined"
                    margin="normal"
                    id={`otp-input-${index}`}
                    type="text"
                    value={otp[index] || ''}
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
