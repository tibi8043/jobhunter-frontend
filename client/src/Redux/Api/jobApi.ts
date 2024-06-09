// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAllJobResponse,
  IFilterPayLoad,
  IJobPayload,
  IJobResponse,
} from "../interfaces";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: (args, api, extraOptions) => {
    const token = window.localStorage.getItem("token");
    return fetchBaseQuery({
      ...args,
      baseUrl: "http://localhost:3030",
      headers: {
        ...args.headers,
        Authorization: `Bearer ${token}`,
      },
    })(args, api, extraOptions);
  },

  endpoints: (builder) => ({
    createJob: builder.mutation<IJobResponse, IJobPayload>({
      query: (payload) => ({
        url: "/jobs",
        method: "POST",
        body: payload,
      }),
    }),

    getAllJobs: builder.query<IAllJobResponse, void>({
      query: () => ({
        url: `/jobs`,
        method: "GET",
      }),
    }),

    getJobById: builder.query<IJobResponse, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
    }),

    getAllFilteredJobs: builder.query<IAllJobResponse, { filter: string }>({
      query: ({ filter }) => ({
        url: filter,
        method: "GET",
      }),
    }),

    modifyJob: builder.mutation<IJobResponse, { job: IJobPayload; id: string }>(
      {
        query: (payload) => ({
          url: `/jobs/${payload.id}`,
          method: "PATCH",
          body: payload.job,
        }),
      }
    ),

    deleteJob: builder.mutation<IJobResponse, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
    }),

    deleteAllJobs: builder.mutation<IJobResponse[], void>({
      query: () => ({
        url: "/jobs",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useModifyJobMutation,
  useDeleteJobMutation,
  useDeleteAllJobsMutation,
  useGetAllFilteredJobsQuery,
  useGetJobByIdQuery,
} = jobApi;
