import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.clinicaltrialskorea.com/api/v1/search-conditions/',
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (keword) => `?name=${keword}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPostsQuery } = api;
