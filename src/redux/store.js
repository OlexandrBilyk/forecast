import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import { weatherApi } from "./weather/weatherApi";
import citiesReducer from "./cities/CitiesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        cities: citiesReducer,
        [weatherApi.reducerPath]: weatherApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware)
})

