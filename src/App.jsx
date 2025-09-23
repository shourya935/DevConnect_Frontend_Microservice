import Login from "./components/Login";
import { Provider } from 'react-redux'
import appStore from "./ustils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Signup from "./components/signup";

function App() {
  return (
    <Provider store = {appStore}>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/" element={<Feed/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
