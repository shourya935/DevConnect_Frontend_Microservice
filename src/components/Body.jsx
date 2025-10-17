import React, { useEffect } from "react";
import axiosInstance from "../ustils/axiosInstance"; 
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../ustils/userSlice";
import { setSelectedUser } from "../ustils/selectedUserSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // Check if token exists
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axiosInstance.get("/profile/veiw"); 
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);



  // Routes where Navbar should be hidden
  const hideNavRoutes = ["/signup", "/chatcontainer"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  // Routes where BottomNavigation should be hidden (login, signup, chatcontainer)
  const hideBottomNavRoutes = ["/login", "/signup", "/chatcontainer"];
  const shouldHideBottomNav = hideBottomNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideNav && <NavBar />}
      <main className="flex-grow pb-20 md:pb-0">
        <Outlet />
      </main>
      {!shouldHideBottomNav && <BottomNavigation />}
    </div>
  );
}

export default Body;