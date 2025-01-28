import { configureStore } from "@reduxjs/toolkit";

import todoSliceReducer from "../slices/todoSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    todo: todoSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
