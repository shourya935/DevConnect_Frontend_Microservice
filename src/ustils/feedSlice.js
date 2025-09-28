import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
   initialState: {
    request: [],
  },
  reducers: {
    addFeed: (state, action) => {
        state.request = action.payload.request;
    },
    removeFeedCard: (state, action) => {
        state.request = state.request.filter(user => user._id !== action.payload);
       
    }
  },
});

export const { addFeed, removeFeedCard } = feedSlice.actions;
export default feedSlice.reducer;
