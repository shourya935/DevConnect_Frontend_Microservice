import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        addChats: (state, action) => action.payload,
         addChatUser: (state, action) => {
      const newUser = action.payload;
      
      // Check if user already exists in chat list
      const exists = state.find(user => user._id === newUser._id);
      
      if (!exists) {
        // Add to beginning of array (most recent)
        return [newUser, ...state];
      }
      
      return state;
    }

    }
})

export const {addChats,  addChatUser} = chatsSlice.actions
export default chatsSlice.reducer
