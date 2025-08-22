import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_NEWS_API_KEY

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://newsapi.org/v2/",
    }),
    tagTypes: ["news"],
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ page = 1, limit = 4 }) =>
                `everything?q=Apple&from=2025-07-22&sortBy=popularity&page=${page}&pageSize=${limit}&apiKey=${apiKey}`,
            providesTags: ["news"],
        }),
    }),
});


export const { useLazyGetNewsQuery } = newsApi