// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAnalytics} from 'firebase/analytics'
import { getAuth , GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCBnmYKgyRgpa8r7FdWR-Sfn2QO1saRsNE",
  authDomain: "jobwave-2fa3f.firebaseapp.com",
  projectId: "jobwave-2fa3f",
  storageBucket: "jobwave-2fa3f.appspot.com",
  messagingSenderId: "106245053484",
  appId: "1:106245053484:web:94a61a8ffe890d9d714589",
  measurementId: "G-VNQYVRVEWB"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const analytics = getAnalytics(app);

const auth = getAuth(app);

export {auth , provider}

export default app