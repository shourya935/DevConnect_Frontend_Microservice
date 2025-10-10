import Login from "./components/Login";
import { Provider } from 'react-redux'
import appStore from "./ustils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Signup from "./components/Signup";
import Connections from "./components/Connections";
import Requstes from "./components/Requests";
import EditPassword from "./components/EditPassword";
import ChatPage from "./components/chatPage";
import ChatContainer from "./components/ChatContainer";



function App() {
  return (
    <Provider store = {appStore}>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/upgradepassword" element={<EditPassword/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/requests" element={<Requstes/>}/>
        <Route path="/chats" element={<ChatPage/>}/>
        <Route path="/chatcontainer" element={<ChatContainer/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
