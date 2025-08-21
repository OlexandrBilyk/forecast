import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.openweathermap.org/",
    }),
    endpoints: (builder) => ({
        getWeatherByCity: builder.query({
            query: (city) =>
                `data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        }),
        getHourlyByCity: builder.query({
            query: (city) =>
                `data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
        }), 
    })
});

export const { useLazyGetWeatherByCityQuery, useLazyGetHourlyByCityQuery } = weatherApi;                       