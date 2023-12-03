import { useState, useEffect, useRef } from 'react'
import 'react-phone-input-2/lib/style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotFoundPage from '../../pages/404Page'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { auth } from "../../api/firebase";
import { ResendOTP } from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { TextField } from '@mui/material';
import Axios_Instance from '../../api/userAxios';

export default function SignupOtp() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const [formDataState, setFormDataState] = useState(state?.formData || {});

    const [showOtpForm, setShowOtpForm] = useState(state?.showOtpForm)

    const [otp, setOtp] = useState('');
    const [confirmObj, setConfirmObj] = useState('');
    const [proccessing, setProccessing] = useState(false)
    const [isComponentMounted, setComponentMounted] = useState(false);

    const isRecaptchaRendered = useRef(false);

    // const setUpRecaptcha = (number) => {
    //     if (!isRecaptchaRendered.current) {
    //         const formattedPhoneNumber = `+${number}`;
    //         console.log('setuprecaptcha:', formattedPhoneNumber);
    //         const recaptchaVerifier = new RecaptchaVerifier(
    //             auth,
    //             'recaptcha-container',
    //             {}
    //         );
    //         recaptchaVerifier.render();
    //         isRecaptchaRendered.current = true;
    //         return signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);
    //     }
    // }

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => { },
                    "expired-callback": () => { },
                }
            );
        }
    }

    useEffect(() => {
        setComponentMounted(true);
        return () => setComponentMounted(false);
    }, []);

    useEffect(() => {
        if (isComponentMounted) {
            onCaptchVerify();
            getOtp();
        }
    }, [isComponentMounted]);


    //*************************GET OTP***************************************
    async function getOtp() {

        try {
            //* Login with Phone OTP response

            onCaptchVerify()

            const number = `+91${formDataState.phone}`
            console.log('number;', number)

            const appVerifier = window.recaptchaVerifier;

            signInWithPhoneNumber(auth, number, appVerifier)
                .then((confirmationResult) => {
                    if (confirmationResult) {

                        setConfirmObj(confirmationResult);
                        console.log("otp sended");
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
            // const response = await setUpRecaptcha(number)
            // console.log('response;', response)
            // if (response) {
            //     setConfirmObj(response)
            //     // setIsOpenOtpForm(true)
            //     console.log('otp:', otp)
            // }

        } catch (error) {
            console.log(error)

        }
    }
    //*************************END GET OTP***************************************

    //*************************VERIFY OTP***************************************
    const verifyOtp = async (e) => {

        e.preventDefault();

        let confirmed;

        if (otp === '' || otp === null || otp.trim().length === 0) return toast.error('Enter a valid OTP');

        try {
            setProccessing(true)
            confirmed = await confirmObj.confirm(otp)

            if (confirmed) {

                const response = await Axios_Instance.post('/signup', formDataState);

                if (response.status === 200) {
                    setProccessing(false)
                    toast.success(response.data.message)
                    navigate('/login')
                }

            } else {
                setProccessing(false)
                toast.error(confirmed.message);
                // toast.error('Invalid OTP. Please check and try again.');
            }
        } catch (error) {
            setProccessing(false)
            console.log(error)
            if (!confirmed) {
                toast.error('Invalid OTP. Please check and try again.');
            }
            if (error.response.status === 401) {
                toast.error(error.response.data.errMsg);
            }
        }
    }

    //*************************END VERIFY OTP***************************************


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


    const resendOtp = async () => {
        await onCaptchVerify()
        const phoneNumber = `+91${formDataState.phone}`
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


    return (
        <>

            {showOtpForm ? (

                <div className='flex justify-center items-center h-screen bg-slate-100'>
                    <div className='text-center px-4 py-16 w-96 p-6 dark:bg-white rounded-sm shadow-lg shadow-gray-400'>
                        <h2 className='mb-8 text-lg font-serif text-green-500'>Please enter your OTP and proceed to login.</h2>
                        {/* {isOpenOtpForm ? ( */}
                        <form className='' onSubmit={verifyOtp}>
                            <div className='mt-4 mb-3 space-x-3 flex justify-center items-center' aria-controls='formBasicPhoneNumber'>
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
                                    // onClick={verifyOtp}
                                    type='submit'
                                    className='font-serif border border-green-600 text-green-600 px-2 py-1.5 rounded active:bg-green-300'
                                >
                                    {proccessing ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>

                        </form>
                        {/* // ) : (
                        //     <> */}
                        {/* Recaptcha div*/}
                        <div id='recaptcha-container' />
                        {/*  */}
                        {/* //     </>
                        // )} */}
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