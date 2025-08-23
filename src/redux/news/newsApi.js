import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format, subDays } from "date-fns";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const today = format(new Date(), "yyyy-MM-dd");
const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://newsapi.org/v2/",
    }),
    tagTypes: ["news"],
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ page = 1, limit = 4 }) =>
                `everything?q=Apple&from=${yesterday}&to=${today}&sortBy=publishedAt&page=${page}&pageSize=${limit}&apiKey=${apiKey}`,
            providesTags: ["news"],
        }),
    }),
});

export const { useLazyGetNewsQuery } = newsApi;