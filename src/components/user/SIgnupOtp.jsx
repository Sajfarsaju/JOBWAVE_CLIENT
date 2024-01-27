import { useState } from 'react'
import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFoundPage from '../../pages/404Page'
import { toast } from 'react-hot-toast';
import { ResendOTP } from "otp-input-react";
import { TextField } from '@mui/material';
import Axios_Instance from '../../api/userAxios';

export default function SignupOtp() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [formDataState, setFormDataState] = useState(state?.formData || {});

    const [showOtpForm, setShowOtpForm] = useState(state?.showOtpForm)

    const [proccessing, setProccessing] = useState(false)
    // ?
    const [userOtp, setUserOtp] = useState('')

    //************************* RESEND OTP***************************************
    const resendOtp = async () => {

        try {
            formDataState.action = 'resendOtp'
            setUserOtp('')
            const response = await Axios_Instance.post('/signup', formDataState)

            if (response.status === 200) {
                toast.success(response.data.message)
            }
        } catch (error) {

            setProccessing(false)
            toast.error('Please try again later')
            console.log(error)

        }

    }
    //*************************END RESEND OTP***************************************

    //*************************VERIFY OTP***************************************
    const verifyOtp = async (e) => {
        e.preventDefault();

        setProccessing(true)
        if (userOtp === '' || userOtp === null || userOtp.trim().length === 0){
            setProccessing(false)
            return toast.error('Enter a valid OTP');
          } 

        try {
            formDataState.action = 'verifyOTP&saveData'
            formDataState.userOtp = userOtp

            const response = await Axios_Instance.post('/signup', formDataState)



            if (response.status === 200) {
                setProccessing(false)
                toast.success(response.data.message)
                navigate('/login')
            } else {
                setProccessing(false)
                toast.error('Something went wrong, please try again')
            }
        } catch (error) {
            console.log(error)
            setProccessing(false)
            if (error.response?.status === 401) {
                toast.error(error?.response?.data?.errMsg);
            } else {
                toast.error('Something went wrong, please try again')
                console.log(error)
            }
        }

    };

    //*************************END VERIFY OTP***************************************


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

            {showOtpForm ? (

                <div className='flex justify-center items-center h-screen bg-slate-100'>
                    <div className='text-center px-4 py-16 w-96 p-6 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
                        <h2 className='mb-8 text-lg font-serif text-green-500'>Please enter your OTP and proceed to login.</h2>
                        
                        <form className='' onSubmit={verifyOtp}>
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

                            <div onClick={resendOtp}>
                                <ResendOTP className='text-green-500 mt-150' />
                            </div>

                            <div className='flex justify-center mt-6'>
                                <Link to={'/signup'}>
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
                                    {proccessing ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            ) : (
                <>
                    <NotFoundPage />
                </>
            )}
        </>
    )
}