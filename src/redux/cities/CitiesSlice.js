import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
    name: 'citiesSlice',
    initialState: {
        cities: {}
    },
    reducers: {
        addCity: (state, action) => {
            const { name, country, min, max, humidity, pressure, windSpeed, date, feelsLike, visibility, temp } = action.payload

            const key = name.toLowerCase()

            state.cities[key] = {
                name,
                country,
                temp,
                feelsLike,
                min,
                max,
                humidity,
                pressure,
                windSpeed,
                visibility,
                date: new Date().toISOString()
            };

            localStorage.setItem('cities', JSON.stringify(state.cities))
        },
        delCity: (state, action) => {
            const key = action.payload.toLowerCase()

            delete state.cities[key]
            localStorage.setItem('cities', JSON.stringify(state.cities))

        },
        setCities: (state, action) => {
            state.cities = action.payload
        }
    }
})

export const { addCity, setCities, delCity } = citiesSlice.actions
const citiesReducer = citiesSlice.reducer
export default citiesReducer