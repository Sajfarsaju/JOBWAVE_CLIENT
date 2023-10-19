import React,{ createContext, useContext, useEffect, useState } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../api/firebase";


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {

    function setUpRecaptcha(number) {
        const formattedPhoneNumber = `+${number}`;
        console.log('setuprecaptcha:',formattedPhoneNumber)
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {}
        );
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth , formattedPhoneNumber , recaptchaVerifier);

    }
    function setUpRecaptchaForResetPass(number) {
        console.log('prrr')
        const formattedPhoneNumber = `+${number}`;
        console.log('setUpRecaptchaForResetPass:',formattedPhoneNumber)
        const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {}
        );
        recaptchaVerifier.render()
        return signInWithPhoneNumber(auth , formattedPhoneNumber , recaptchaVerifier);

    }
    return (
        <userAuthContext.Provider value={{ setUpRecaptcha , setUpRecaptchaForResetPass }}>
            {children}
        </userAuthContext.Provider>
    );
};

export function useUserAuth() {
    return useContext(userAuthContext);
}