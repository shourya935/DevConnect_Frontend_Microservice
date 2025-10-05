import React, { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;
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
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!userData?._id; // false or true 
  

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch, navigate]);

  const hideNavRoutes = ["/login", "/signup"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!loading && !isLoggedIn) {
    navigate("/login");
    return null;
  }

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
