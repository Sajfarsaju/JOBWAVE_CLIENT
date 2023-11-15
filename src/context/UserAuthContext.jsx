import  { createContext, useContext } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../api/firebase";
import { io } from 'socket.io-client';
// import { BACKEND_URL } from '../constants/userAPI';


const userAuthContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const socketConnection = io('https://api.jobwave.online')
// export const socketConnection = io("http://localhost:4005/")
export const WebSocketContext = createContext(socketConnection)
export const WebSocketProvider = WebSocketContext.Provider;

export function UserAuthContextProvider({ children }) {

    function setUpRecaptcha(number) {
        const formattedPhoneNumber = `+${number}`;
        console.log('setuprecaptcha:', formattedPhoneNumber)
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {}
        );
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);

    }
    function setUpRecaptchaForResetPass(number) {

        const formattedPhoneNumber = `+${number}`;
        console.log('setUpRecaptchaForResetPass:', formattedPhoneNumber)
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {}
        );
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier);

    }
    return (
        <userAuthContext.Provider value={{ setUpRecaptcha, setUpRecaptchaForResetPass }}>
            {children}
        </userAuthContext.Provider>
    );
};

export function useUserAuth() {
    return useContext(userAuthContext);
}