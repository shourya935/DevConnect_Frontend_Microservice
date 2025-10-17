import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Bell, MessagesSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../ustils/selectedUserSlice";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch()

  const isActive = (path) => location.pathname === path;

  // Count pending requests
  const pendingRequestsCount =
    requests?.filter((req) => req.status === "interested").length || 0;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/requests", icon: Bell, label: "Requests", badge: pendingRequestsCount },
    { path: "/chats", icon: MessagesSquare, label: "Chats" },
    { path: "/profile", isImage: true, label: "Profile" },
  ];

  // ✅ Handle navigation using navigate()
  const handleNavigation = (path) => {
  if (location.pathname !== path) {
    // ✅ Only clear selectedUser if navigating away from chats
    if (location.pathname === "/chats" && path !== "/chats") {
      dispatch(setSelectedUser(null));
    }
    navigate(path);
  }
};


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex flex-col items-center justify-center flex-1 h-full focus:outline-none"
            >
              <div
                className={`relative flex flex-col items-center ${
                  active ? "text-black" : "text-gray-500"
                }`}
              >
                {item.isImage ? (
                  <div className="relative w-8 h-8">
                    <div
                      className={`w-full h-full rounded-full overflow-hidden ${
                        active ? "ring-2 ring-black" : ""
                      }`}
                    >
                      <img
                        src={
                          user?.photoURL ||
                          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/*  Online indicator
                    {onlineUsers?.includes(user?._id) && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white translate-x-1 translate-y-1" />
                    )} */}
                  </div>
                ) : (
                  <Icon
                    size={28}
                    strokeWidth={active ? 2.5 : 2}
                    className="transition-all"
                  />
                )}

                <span
                  className={`text-xs mt-1 font-medium ${
                    active ? "text-black" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>

                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
