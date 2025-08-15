import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
    name: 'citiesSlice',
    initialState: {
        cities: {}
    },
    reducers: {
        addCity: (state, action) => {
            const { name, country, min, max, humidity, pressure, windSpeed, lastUpdated, feelsLike, visibility } = action.payload

            const key = name.toLowerCase()

            state.cities[key] = {
                name,
                country,
                feelsLike,
                min,
                max,
                humidity,
                pressure,
                windSpeed,
                visibility,
                lastUpdated
            };

            localStorage.setItem('cities', JSON.stringify(state.cities))
        }
    }
})

export const { addCity } = citiesSlice.actions
const citiesReducer = citiesSlice.reducer
export default citiesReducer