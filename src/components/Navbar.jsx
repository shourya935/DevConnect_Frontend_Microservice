
import React, { useState } from "react";
import DevConnectLogo from "../assets/DevConnectLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../ustils/axiosInstance";
import { removeUser } from "../ustils/userSlice";
import { disconnectSocket } from "../ustils/socketSlice";
import { setSelectedUser } from "../ustils/selectedUserSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const onlineUsers = useSelector((store) => store.onlineUsers)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`/logout`); 
      // localStorage.removeItem("authToken"); // ✅ NEW: Clear token
      // dispatch(removeUser());
      dispatch(disconnectSocket(user._id));
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Even if API fails, clear local state
      // localStorage.removeItem("authToken");
      // dispatch(removeUser());
      dispatch(disconnectSocket());
      navigate("/login");
    }
  };

  const handleLinkClick = (callback) => {
    setIsOpen(false); // close dropdown
    if (callback) callback();
    dispatch(setSelectedUser(null))
  };

  return (
    <div className="navbar  bg-base-100 shadow-sm px-4 h-14">
      {/* Left side: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <img
            src={DevConnectLogo}
            alt="DevConnect Logo"
            className="h-30 w-30 object-contain"
          />
        </Link>
      </div>

      {/* Right side: User Name + Profile */}
      <div className="flex-none flex items-center gap-2">
        
          <>
            <span className="font-medium text-gray-700">
              Welcome {user?.firstName?.split(" ")[0]}
            </span>
            <div className="relative">
              {/* Avatar button */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL  || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
                    alt="User Profile"
                    className="object-cover"
                  />
                  {onlineUsers?.includes(user?._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
                </div>
              </div>
          
             
              {isOpen && user && (
                <ul className="absolute right-0 mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 menu menu-sm">
        
                  <li>
                    <Link
                      onClick={() => handleLinkClick(handleLogout)}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </>
     
      </div>
    </div>
  );
};

export default NavBar;

