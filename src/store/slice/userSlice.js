import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    role: null,
    token: null,
    firstName: null,
    id: null,
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
    }
});

export const { userLogin, userLogout } = userAuthSlice.actions;

export default userAuthSlice.reducer;