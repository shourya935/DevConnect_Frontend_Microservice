import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionsReducer from "./connectionsSlice"

const appStore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        Connections: connectionsReducer
    }
})

export default appStore