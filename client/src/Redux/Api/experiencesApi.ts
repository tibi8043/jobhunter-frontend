// api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExperiencePayload, IExperienceResponse } from "../interfaces";

export const experiencesApi = createApi({
  reducerPath: "experiencesApi",
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
    addExperience: builder.mutation<
      IExperienceResponse[],
      IExperiencePayload[]
    >({
      query: (payload) => ({
        url: "/experiences",
        method: "POST",
        body: payload,
      }),
    }),

    getUserExperience: builder.query<IExperienceResponse[], void>({
      query: () => ({
        url: "/experiences",
        method: "GET",
      }),
    }),

    modifyExperience: builder.mutation<
      IExperienceResponse,
      { experience: IExperiencePayload; id: string }
    >({
      query: (payload) => ({
        url: `/experiences/${payload.id}`,
        method: "PATCH",
        body: payload.experience,
      }),
    }),

    deleteExperience: builder.mutation<IExperienceResponse, string>({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
    }),

    deleteAllExperiences: builder.mutation<IExperienceResponse[], void>({
      query: () => ({
        url: "/experiences",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddExperienceMutation,
  useGetUserExperienceQuery,
  useModifyExperienceMutation,
  useDeleteExperienceMutation,
  useDeleteAllExperiencesMutation,
} = experiencesApi;
