import { createSlice } from "@reduxjs/toolkit";



const initialState = []

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessages: (state, action) => {
            return action.payload; // Replace all messages
        },
        appendMessage: (state, action) => {
            state.push(action.payload); // Add single message (Redux Toolkit uses Immer)
        },
        clearMessages: () => {
            return []; // Clear messages when user changes
        }
    }
})

export const {addMessages, appendMessage, clearMessages} = messagesSlice.actions
export default messagesSlice.reducer

