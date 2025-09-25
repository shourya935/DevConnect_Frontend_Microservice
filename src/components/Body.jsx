import React, { useEffect } from "react";
import { BASE_URL } from "../ustils/constants";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../ustils/userSlice";
import { useLocation } from "react-router-dom";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/veiw", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status == 401) {
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
    <>
      {!shouldHideNav && <NavBar />}
      <Outlet />
      {!shouldHideNav && <Footer />}
    </>
  );
}

export default Body;
