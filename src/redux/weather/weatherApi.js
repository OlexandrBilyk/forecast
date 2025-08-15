import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.openweathermap.org/data/2.5/",
    }),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query({
            query: (city) =>
                `weather?q=${city}&appid=${apiKey}&units=metric`,
        }),
    }),
});

export const { useLazyGetWeatherByCityQuery } = weatherApi;