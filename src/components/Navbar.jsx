import React from "react";
import DevConnectLogo from "../assets/DevConnectLogo.png";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left side: Logo */}
      <div className="flex-1">
        <a className="flex items-center gap-2 text-xl font-semibold text-primary">
          <img
            src={DevConnectLogo}
            alt="DevConnect Logo"
            className="h-10 w-10 object-contain"
          />
          DevConnect
        </a>
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
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) }
      </div>
    </div>
  );
};

export default NavBar;
