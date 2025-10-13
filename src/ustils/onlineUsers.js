import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const  onlineUsersSlice = createSlice({
    name:"onlineUsers",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => action.payload,
    }
})


export const {setSelectedUser} = onlineUsersSlice .actions
export default onlineUsersSlice .reducer