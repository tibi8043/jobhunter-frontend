// Define the store
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Slices/authSlice";
import { authApi } from "./Api/authApi";
import { experiencesApi } from "./Api/experiencesApi";
import { jobApi } from "./Api/jobApi";
import { applicantsApi } from "./Api/applicantsApi";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [experiencesApi.reducerPath]: experiencesApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [applicantsApi.reducerPath]: applicantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      experiencesApi.middleware,
      jobApi.middleware,
      applicantsApi.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
