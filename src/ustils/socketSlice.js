import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socket = null;

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnected } = socketSlice.actions;

// --- Socket connection functions (not reducers) ---
export const connectSocket = (userId) => (dispatch) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Socket disconnected");
      dispatch(setConnected(false));
    });
  }
};

export const disconnectSocket = () => (dispatch) => {
  if (socket) {
    socket.disconnect();
    socket = null;
    dispatch(setConnected(false));
  }
};

export const getSocket = () => socket;

export default socketSlice.reducer;
