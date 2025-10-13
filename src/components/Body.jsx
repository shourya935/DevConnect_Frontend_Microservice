import React, { useEffect } from "react";
import axiosInstance from "../ustils/axiosInstance"; 
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../ustils/userSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    // NEW: Check if token exists
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
        localStorage.removeItem("authToken"); // NEW: Clear invalid token
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

  const hideNavRoutes = ["/login", "/signup", "/chatcontainer"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideNav && <NavBar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!shouldHideNav && <Footer />}
    </div>
  );
}

export default Body;