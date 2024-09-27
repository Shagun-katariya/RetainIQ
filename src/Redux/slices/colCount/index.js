import { createSlice } from "@reduxjs/toolkit";

export const ColCountSlice = createSlice({
    initialState: 2,
    name: "colCounter",
    reducers: {
        increament: (state) => state + 1,
        decreamentCol: (state) => state - 1,
    },
});

export const {decreamentCol, increament} = ColCountSlice.actions;
export default ColCountSlice.reducer;