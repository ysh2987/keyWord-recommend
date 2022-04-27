import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://keywordsearch-ysh2987.herokuapp.com/api/',
  }),
  keepUnusedDataFor: 15,
  endpoints: (builder) => ({
    getKeyword: builder.query({
      query: (keyword) => `${keyword}`,
    }),
  }),
});

export const { useGetKeywordQuery } = api;
