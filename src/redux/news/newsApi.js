import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format } from "date-fns";

const apiKey = import.meta.env.VITE_NEWS_API_KEY
const today = format(new Date(), "yyyy-MM-dd");

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://newsapi.org/v2/",
    }),
    tagTypes: ["news"],
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ page = 1, limit = 4 }) =>
                `everything?q=Apple&from=${today}&page=${page}&pageSize=${limit}&apiKey=${apiKey}`,
            providesTags: ["news"],
        }),
    }),
});


export const { useLazyGetNewsQuery } = newsApi