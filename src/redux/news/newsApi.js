import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format, subDays } from "date-fns";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const today = format(new Date(), "yyyy-MM-dd");
const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

const CORS_PROXY = "https://api.allorigins.win/raw?url=";

export const newsApi = createApi({
    reducerPath: "newsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    tagTypes: ["news"],
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({ page = 1, limit = 4, queryText = "Apple" } = {}) => {
                const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
                    queryText
                )}&from=${yesterday}&to=${today}&sortBy=publishedAt&page=${page}&pageSize=${limit}&apiKey=${API_KEY}`;

                return `${CORS_PROXY}${encodeURIComponent(url)}`;
            },
            providesTags: ["news"],
            transformResponse: (response) => {
                if (!response.articles) return [];
                return {
                    ...response,
                    articles: response.articles.filter((article) => article.urlToImage),
                };
            },
        }),
    }),
});

export const { useLazyGetNewsQuery } = newsApi;
