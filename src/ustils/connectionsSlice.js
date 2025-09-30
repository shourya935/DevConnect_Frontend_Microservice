import { createSlice } from "@reduxjs/toolkit"

const initialState = [];

const connectionsSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: (state, action) => {
            const newConnectionsList = state.filter((selectedUser) => selectedUser._id !== action.payload)
            return newConnectionsList
        }
    }
})

export const {addConnections, removeConnections} = connectionsSlice.actions
export default connectionsSlice.reducer