// Define the store
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Slices/authSlice";
import { authApi } from "./Api/authApi";
import { experiencesApi } from "./Api/experiencesApi";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [experiencesApi.reducerPath]: experiencesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()      
      .concat(authApi.middleware, experiencesApi.middleware),      
});

export default store;
