import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token : null,
    companyName : null,
    id : null,
    role : null
};

const companyAuthSlice = createSlice(
    {
        name : "companyAuth",
        initialState,
        reducers : 
            {
                companyLogin : ( state , action ) => {
                    state.role = action.payload.role;
                    state.token = action.payload.token;
                    state.companyName = action.payload.name;
                    state.id = action.payload.id;
                },
                companyLogout : ( state ) => {
                    state.role = null;
                    state.token = null;
                    state.companyName = null;
                    state.id = null;
            }
        }
    }
);

export const {companyLogin, companyLogout} = companyAuthSlice.actions;


export default companyAuthSlice.reducer;