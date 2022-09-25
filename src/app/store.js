import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import teamsSliceReducer from "../features/teams/teamsSlice";
import projectsSliceReducer from "../features/projects/projectsSlice";
import filterSliceReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    teams: teamsSliceReducer,
    projects: projectsSliceReducer,
    filter: filterSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
