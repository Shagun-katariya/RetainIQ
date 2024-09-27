import { createSlice } from "@reduxjs/toolkit";

// Function to generate a 6-digit random number
const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);

export const rowCountSlice = createSlice({
    name: "rowCounter",
    initialState: [],
    reducers: {
        addRow: (state) => {
            state.push(generateRandomId());
        },
        removeRow: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },
        moveRow: (state, action) => {
            const { dragIndex, hoverIndex } = action.payload;
            const [movedRow] = state.splice(dragIndex-1, 1);
            state.splice(hoverIndex-1, 0, movedRow);
        },
    },
});

export const { addRow, removeRow, moveRow } = rowCountSlice.actions;
export default rowCountSlice.reducer;
