import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        currentUser: null
    },
    reducers: {
        login: (state, action) => {
            state.isAuth = true
            state.currentUser = action.payload
            localStorage.setItem("currentUser", JSON.stringify(action.payload));

        },
        logout: (state) => {
            state.isAuth = false
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    }
})

export const { login, logout } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer