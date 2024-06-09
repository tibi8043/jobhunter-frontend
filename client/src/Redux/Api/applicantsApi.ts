// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAllJobResponse,
  IApplicantsForAJob,
  IApplyForAJob,
  IJobPayload,
  IJobResponse,
} from "../interfaces";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  baseQuery: (args, api, extraOptions) => {
    const token = window.localStorage.getItem("token");
    return fetchBaseQuery({
      ...args,
      baseUrl: "http://localhost:3030/applicants",
      jsonContentType: "application/json",
      headers: {
        ...args.headers,
        Authorization: `Bearer ${token}`,
      },
    })(args, api, extraOptions);
  },

  endpoints: (builder) => ({
    applicantsForAJob: builder.query<[IApplicantsForAJob], string>({
      query: (jobId: string) => ({
        url: `?jobId=${jobId}`,
        method: "GET",
      }),
    }),

    applyForAJob: builder.mutation<void, IApplyForAJob>({
      query: (payload) => ({
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }),
    }),

    removeApplyForAJob: builder.mutation<{}, string>({
      query: (jobId: string) => ({
        url: `?jobId=${jobId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useApplicantsForAJobQuery,
  useApplyForAJobMutation,
  useRemoveApplyForAJobMutation,
} = applicantsApi;
