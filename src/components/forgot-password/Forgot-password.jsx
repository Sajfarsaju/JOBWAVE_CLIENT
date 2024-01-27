import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Axios_Instance from '../../api/userAxios'
import { toast } from 'react-hot-toast';
import { TextField } from '@mui/material';
// import { userLogin } from '../store/slice/userSlice';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [isOpenEmailForm, setIsOpenEmailForm] = useState(true);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [NotHideEmailAndOtpForm, setNotHideEmailAndOtpForm] = useState(true);
  const [email, setEmail] = useState('')
  const [proccessing, setProccessing] = useState(false)
  const [otpId, setOtpId] = useState('')
  const [userOtp, setUserOtp] = useState('')

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

      const backendResponse = await Axios_Instance.post('/forgot_password', { email, action: "getOTP&SaveOTP" });

      if (backendResponse.status === 200) {

        setProccessing(false)
        setIsOpenEmailForm(false)
        setOtpId(backendResponse?.data?.otpId)
        toast.success(backendResponse.data.message)

      }

    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("User not found!")
      } else if (error.response?.status === 401) {
        toast.error("Your account is blocked")
      } else {
        console.log(error)
      }
    }
  };
  //*************************END GET OTP***************************************
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

  //*************************VERIFY OTP***************************************
  const verifyOtp = async (e) => {

    e.preventDefault()
    setProccessing(true)
    if (userOtp === '' || userOtp === null || userOtp.trim().length === 0){
      setProccessing(false)
      return toast.error('Enter a valid OTP');
    } 

    try {
      const response = await Axios_Instance.post('/forgot_password', { otpId, userOtp, email, action: "verifyOtp" });

      if (response.status === 200 || response.data.success) {
        setProccessing(false)
        setIsPasswordFormOpen(true);
        setNotHideEmailAndOtpForm(false)

      } else {
        setProccessing(false)
      }
    } catch (error) {
      console.log(error);
      setProccessing(false)
      if (error.response?.status === 401) {
        toast.error(error?.response?.data?.errMsg)
      }
    }
  }
  //*************************END VERIFY OTP***************************************

  //*************************UPDATE USER PASSWORD***************************************
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProccessing(true)
    if (password.trim().length < 6) {
      setProccessing(false)
      return toast.error("Password must be at least 6 character long")

    }
    try {

      const response = await Axios_Instance.post('/forgot_password  ', { password, email, action: "updatePassword" })

      if (response.status === 200) {
        setProccessing(false)
        navigate('/login')

        setTimeout(() => {
          toast.success(response?.data?.message);
        }, 1000);

      } else {
        setProccessing(false)
      }
    } catch (error) {
      console.log(error)
      setProccessing(false)
      if (error.response?.status === 401) {
        toast.error(error?.response?.data?.errMsg)
      }
    }

  }

  //*************************END UPDATE USER PASSWORD***************************************


  return (
    <>
      {NotHideEmailAndOtpForm && (
        <>
          {isOpenEmailForm ? (
            <div className='flex justify-center items-center bg-slate-100 h-screen'>
              <div className='text-center py-24 w-96 p-10  dark:bg-white rounded-sm shadow-lg shadow-gray-400 relative'>
                <div className='flex justify-center'>
                  <h1 className='font-bold absolute top-6  text-lg font-serif text text-green-600'>Did you Forgot Password?</h1>
                  <h2 className='mb-3 text-md text-green-600 font-semibold font-serif'>Enter your email to reset your password.</h2>
                </div>
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
                      {proccessing ? 'Sending...' : 'Send OTP'}
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
                  <div className='mt-4 mb-3 space-x-3 flex justify-center items-center' aria-controls='formBasicPhoneNumber'>
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

                  <div className='flex justify-center'>
                    <button
                      type='button'
                      className='font-serif border border-red-600 text-red-600 px-2 py-1.5 rounded mr-2 active:bg-red-300'
                      onClick={() => setIsOpenEmailForm(true)}
                    >
                      Cancel
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
      )}
      {isPasswordFormOpen &&
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
                </div>

                <div className='flex justify-center pt-1'>
                  <button
                    type='submit'
                    className='font-serif border border-green-600 text-green-600 px-2 py-1.5 rounded active:bg-green-300'
                  >
                    {proccessing ? 'Updating...' : 'Update Password'}
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
