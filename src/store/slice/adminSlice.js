import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    role : null,
    token : null,
    name : null,
};

const adminAuthSlice = createSlice(
    {
        name : 'adminAuth',
        initialState,
        reducers : 
            {
                adminLogin : ( state , action ) => {
                    state.role = action.payload.role;
                    state.token = action.payload.token;
                    state.name = action.payload.name;
            },
                adminLogout : (state) => {
                    state.role = null
                    state.token = null;
            }
        }    
    }
);

export const {adminLogin, adminLogout} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;