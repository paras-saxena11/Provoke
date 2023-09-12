import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000",
  baseUrl: "https://provoke-bwjt.onrender.com",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = apiSlice;
export default apiSlice;
