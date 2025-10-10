import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addChats: (state, action) => action.payload,

    }
})

export const {addChats} = chatsSlice.actions
export default chatsSlice.reducer
