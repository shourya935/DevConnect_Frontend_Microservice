import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./ustils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "./ustils/axiosInstance";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Signup from "./components/Signup";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import EditPassword from "./components/EditPassword";
import ChatPage from "./components/ChatPage";
import ChatContainer from "./components/ChatContainer";

import { connectSocket, disconnectSocket } from "./ustils/socketSlice";
import { addUser, removeUser } from "./ustils/userSlice";
import EditProfile from "./components/EditProfile";

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token && !user) {
      axiosInstance
        .get("/profile/view", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(addUser(res.data));
          dispatch(connectSocket(res.data._id));
          window.socketConnected = true;
        })
        .catch((err) => {
          console.error("Auto-login failed:", err);
          // localStorage.removeItem("authToken");
          // dispatch(removeUser());
          // dispatch(disconnectSocket());
        });
    } else if (user && !window.socketConnected) {
      dispatch(connectSocket(user._id));
      window.socketConnected = true;
    }

    return () => {
      dispatch(disconnectSocket());
      window.socketConnected = false;
    };
  }, [dispatch, user]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="upgradepassword" element={<EditPassword />} />
          <Route path="editprofile" element={<EditProfile/>} />
          <Route path="signup" element={<Signup />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="chats" element={<ChatPage />} />
          <Route path="chatcontainer" element={<ChatContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  );
}

export default App;
