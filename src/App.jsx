import Login from "./components/Login";
import { Provider } from 'react-redux'
import appStore from "./ustils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import SignUpForm from "./components/signup";
import Connections from "./components/Connections";



function App() {
  return (
    <Provider store = {appStore}>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/connections" element={<Connections/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
