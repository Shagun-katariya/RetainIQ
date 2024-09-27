import { configureStore } from "@reduxjs/toolkit";
import colCountReducer from "./slices/colCount/index";
import rowCountReducer from "./slices/rowCount/index"; // Import the correct reducer for rowCount

export const store = configureStore({
  reducer: {
    rowCount: rowCountReducer, // Use the correct reducer name
    colCount: colCountReducer,
  },
});