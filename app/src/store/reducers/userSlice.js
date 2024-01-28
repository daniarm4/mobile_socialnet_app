import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../api/userAPI";


const initialState = {
    isAuth: false,
    username: null  
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(checkAuth.matchFulfilled, (state, action) => {
            state.isAuth = true;
            state.username = action.payload.username;
        }),
        builder.addMatcher(checkAuth.matchRejected, (state, action) => {
            state.isAuth = false;
            state.username = null;
        })
    }
})

export default userSlice.reducer;
