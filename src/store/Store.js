import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/TaskSlice"
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
},
});