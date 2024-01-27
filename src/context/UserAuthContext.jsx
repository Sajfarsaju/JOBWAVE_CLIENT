import { createContext, useContext, useRef } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../api/firebase";
import { io } from 'socket.io-client';


const userAuthContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const socketConnection = io('https://api.jobwave.online')
// export const socketConnection = io("http://localhost:4005/")
export const WebSocketContext = createContext(socketConnection)
export const WebSocketProvider = WebSocketContext.Provider;

export function UserAuthContextProvider({ children }) {
    
    
    return (
        <userAuthContext.Provider value={{ }}>
            {children}
        </userAuthContext.Provider>
    );
};

export function useUserAuth() {
    return useContext(userAuthContext);
}