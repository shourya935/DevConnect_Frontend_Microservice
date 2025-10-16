import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const  onlineUsersSlice = createSlice({
    name:"onlineUsers",
    initialState,
    reducers: {
        addOnlineUser: (state,action) => {
            return action.payload
        },
        removeOnlineUser: (state,action) => {
            return null;
        }
        
    }
})


export const {addOnlineUser,removeOnlineUser} = onlineUsersSlice .actions
export default onlineUsersSlice .reducer