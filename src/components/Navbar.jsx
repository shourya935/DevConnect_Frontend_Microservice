import React from "react";
import DevConnectLogo from "../assets/DevConnectLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../ustils/constants";
import { removeUser } from "../ustils/userSlice";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/logout",{}, {withCredentials:true})
      dispatch(removeUser())
      navigate("/login")
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left side: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <img
            src={DevConnectLogo}
            alt="DevConnect Logo"
            className="h-15 w-15 object-contain"
          />
        </Link>
      </div>

      {/* Right side: User Profile */}
      <div className="flex-none">
        {user &&  (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        ) }
      </div>
    </div>
  );
};

export default NavBar;
