import axios from 'axios'
import {store} from '../store/store'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const Axios_Instance  = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
})
Axios_Instance.interceptors.request.use(
    config => {
        const companyState = store.getState().company
        const companyId = companyState.id;
        const userState = store.getState().user;
        const adminState = store.getState().admin;

        const role = config.url.split("/")[1]
        

        if (role==='company') {
            config.headers['Authorization'] = `Bearer ${companyState.token}`;
            config.headers['Company-Id'] = companyId;
        }
        else if (role==='admin') {
            config.headers['Authorization'] = `Bearer ${adminState.token}`;
        }
        else{
            config.headers['Authorization'] = `Bearer ${userState.token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default Axios_Instance