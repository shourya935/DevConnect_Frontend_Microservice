import React, { useEffect } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL
import axios from "axios";
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
    try {
      const res = await axios.get(BASE_URL + "/profile/veiw", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
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

  const hideNavRoutes = ["/login", "/signup"];
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
