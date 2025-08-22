import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;

export const pixabayApi = createApi({
    reducerPath: 'pixabayApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
    endpoints: (builder) => ({
        getNatureImages: builder.query({
            query: () => `?key=${apiKey}&q=nature&image_type=photo&per_page=100`,
        }),
    }),
});

export const { useGetNatureImagesQuery } = pixabayApi;