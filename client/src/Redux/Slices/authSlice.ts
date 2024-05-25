import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { IUser, IAuthState, ILoginResponse } from "../interfaces";

// Define a type for the slice state
const initialState: IAuthState = {
  user: JSON.parse(window.localStorage.getItem("user") || "null") || null,
  token: window.localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginResponse>) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      window.localStorage.setItem("user", JSON.stringify(action.payload.user));
      window.localStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
    },
  },
  selectors: {
    selectIsAuthenticated: (state) => !!state.user,
  },
});

export const { login, logout } = authSlice.actions;
export const { selectIsAuthenticated } = authSlice.selectors;
