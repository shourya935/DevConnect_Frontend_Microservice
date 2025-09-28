import { createSlice } from "@reduxjs/toolkit"

const initialState = [];

const requestsSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => null,
    }
})

export const {addRequests, removeRequests} = requestsSlice.actions
export default requestsSlice.reducer