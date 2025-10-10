import { createSlice } from "@reduxjs/toolkit";

const selectedUserSlice = createSlice({
    name:"selectedUser",
    initialState: null,
    reducers: {
        setSelectedUser: (state, action) => action.payload,
    }
})


export const {setSelectedUser} = selectedUserSlice.actions
export default selectedUserSlice.reducer
