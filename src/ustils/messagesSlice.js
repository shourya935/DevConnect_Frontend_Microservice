import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessages: (state, action) => action.payload,

    }
})

export const {addMessages} = messagesSlice.actions
export default messagesSlice.reducer