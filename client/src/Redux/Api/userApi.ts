import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserResponse } from "../interfaces";

export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: (args, api, extraOptions) => {
    const token = window.localStorage.getItem("token");
    return fetchBaseQuery({
      baseUrl: "http://localhost:3030",
    })(args, api, extraOptions);
  },
  endpoints: (builder) => ({
    getUserData: builder.query<IUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDataQuery } = userApi;
