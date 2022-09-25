import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text : ''
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changeText: (state, action) => {
            state.text = action.payload;
        }
    },
});

export default filterSlice.reducer;
export const { changeText } = filterSlice.actions;
