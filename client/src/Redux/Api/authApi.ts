// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginPayload, ILoginResponse, IUserPayload, IUserResponse,  } from "../interfaces";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030" }),
  endpoints: (builder) => ({
    register: builder.mutation<IUserResponse, IUserPayload>({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (payload) => ({
        url: "/authentication",
        method: "POST",
        body: payload,
      }),      
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
