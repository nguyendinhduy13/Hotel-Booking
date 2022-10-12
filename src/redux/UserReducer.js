import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export default createSlice({
        name: 'userInfo',
        initialState,
        reducers: {
            saveUserInfo(state, action) {
                state.id = action.payload.id;
                state.fullname = action.payload.fullname;
                state.email = action.payload.email;
                state.password = action.payload.password;
            },
        },
});
