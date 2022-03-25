import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=',
  }),
  keepUnusedDataFor: 15,
  endpoints: (builder) => ({
    getKeyword: builder.query({
      query: (keyword) => `${keyword}`,
    }),
  }),
});

export const { useGetKeywordQuery } = api;
