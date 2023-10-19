import { configureStore } from "@reduxjs/toolkit";
import {persistStore , persistReducer , FLUSH , REHYDRATE , PAUSE , PERSIST , PURGE , REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userAuthSlice from "./slice/userSlice";
import companySlice from "./slice/companySlice";
import adminSlice from "./slice/adminSlice";
import jobApplicationSlice from './slice/jobApplicationSlice';

const UserPersistConfig = { key: "userAuth", storage, version: 1 };
const CompanyPersistConfig = { key: "companyAuth", storage, version: 1 };
const AdminPersistConfig = { key : "adminAuth" , storage , version : 1};
const JobApplicationPersistConfig = { key : "jobApplications" , storage , version : 1};


const userAuthPersistedReducer = persistReducer(UserPersistConfig , userAuthSlice);
const companyPersistedReducer = persistReducer(CompanyPersistConfig , companySlice);
const AdminPersistReducer = persistReducer(AdminPersistConfig , adminSlice)
const JobApplicationPersist = persistReducer(JobApplicationPersistConfig , jobApplicationSlice)

export const store = configureStore ({
    reducer : {
        user : userAuthPersistedReducer,
        company : companyPersistedReducer,
        admin : AdminPersistReducer,
        jobApplications: JobApplicationPersist,

    },
    middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware ({
        serializableCheck : {
            ignoreActions: [FLUSH , REHYDRATE , PAUSE , PERSIST , PURGE , REGISTER],
        },
    }),
});

export const persistor = persistStore(store);