import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: null,
    token: null,
    firstName: null,
    id: null,
    isActive: true,
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.role = action.payload.role;
            state.firstName = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id
        },
        userLogout: (state) => {
            state.role = null;
            state.firstName = null;
            state.token = null;
            state.id = null;
        },
        updateUserStatus: (state, action) => {
            console.log(state.isActive)
            state.isActive = action.payload.isActive;
        },

    }
});

export const { userLogin, userLogout , updateUserStatus} = userAuthSlice.actions;

export default userAuthSlice.reducer;