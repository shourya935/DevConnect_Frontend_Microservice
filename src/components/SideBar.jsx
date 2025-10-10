import React, { useEffect } from "react";
import axiosInstance from "../ustils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addChats } from "../ustils/chatsSlice";
import { setSelectedUser } from "../ustils/selectedUserSlice";

function SideBar() {
  const dispatch = useDispatch();
  const chats = useSelector((store) => store.chats);
  const selectedUser = useSelector((store) => store.selectedUser);
  const onlineUsers = [];

  const loadChats = async () => {
    try {
      const res = await axiosInstance.get("/message/connections");
      dispatch(addChats(res?.data?.requests));
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486814.png"
          alt="No connections"
          className="w-24 mb-4 opacity-50"
        />
        <p className="text-lg font-semibold mb-1">
          You have No connections to chat
        </p>
        <p className="text-sm">
          Explore the feed page and connect with like-minded people.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full">
      {chats.map((user) => (
        <div key={user._id}>
          <button
            onClick={() => dispatch(setSelectedUser(user))}
            className={`
              w-full p-4 flex items-center gap-4
              hover:bg-gray-100 transition-colors
              ${selectedUser?._id === user._id ? "bg-gray-100" : "bg-white"}
            `}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.photoURL || "/avatar.png"}
                alt={user.firstName}
                className="w-14 h-14 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            <div className="flex-1 text-left min-w-0">
              <div className="text-lg font-semibold text-gray-900 truncate">
                {user.firstName}
              </div>
              <div className="text-sm text-gray-500">
                {onlineUsers.includes(user._id) ? "online" : "offline"}
              </div>
            </div>
          </button>
          <div className="border-b border-gray-200"></div>
        </div>
      ))}
    </div>
  );
}

export default SideBar;