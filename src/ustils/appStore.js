import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionsReducer from "./connectionsSlice"
import requestsReducer from "./requestsSlice"
import chatsReducer from "./chatsSlice"
import selectedUserReducer from "./selectedUserSlice"
import messagesReducer from "./messagesSlice"
import onlineUsersReducer from "./onlineUsers"


const appStore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
        chats: chatsReducer,
        selectedUser: selectedUserReducer,
        messages: messagesReducer,
        onlineUsers: onlineUsersReducer
    }
})

export default appStore