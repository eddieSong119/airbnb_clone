import { createSlice } from "@reduxjs/toolkit";

const initialState = { display: 'block' }

const modalDisplaySlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        show(state) {
            return state.display = 'block'
        },
        hide(state) {
            return state.display = 'none'
        },
    },
})

// console.log(modalDisplaySlice.state)

export const { show, hide } = modalDisplaySlice.actions;
export default modalDisplaySlice.reducer;