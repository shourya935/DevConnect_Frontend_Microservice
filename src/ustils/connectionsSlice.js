import { createSlice } from "@reduxjs/toolkit"

const initialState = [];

const connectionsSlice = createSlice({
    name: "connections",
    initialState,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: (state, action) => null,
    }
})

export const {addConnections, removeConnections} = connectionsSlice.actions
export default connectionsSlice.reducer