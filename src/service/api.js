import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  keepUnusedDataFor: 15,
  endpoints: (builder) => ({
    getKeyword: builder.query({
      query: (keyword) => `${keyword}`,
    }),
  }),
});

export const { useGetKeywordQuery } = api;
