import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
    name: 'citiesSlice',
    initialState: {
        cities: {}
    },
    reducers: {
        addCity: (state, action) => {
            const { name, country, min, isFavorite, icon, coord, max, humidity, pressure, windSpeed, feelsLike, visibility, temp } = action.payload

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
                coord,
                icon,
                isFavorite: isFavorite || false,
                date: new Date().toISOString(),
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
        },
        changeFavorite: (state, action) => {
            const { name } = action.payload
            const key = name.toLowerCase()

            if (state.cities[key]) {
                state.cities[key].isFavorite = !state.cities[key].isFavorite
            }

            localStorage.setItem('cities', JSON.stringify(state.cities))
        }
    }
})

export const { addCity, setCities, delCity, changeFavorite } = citiesSlice.actions
const citiesReducer = citiesSlice.reducer
export default citiesReducer