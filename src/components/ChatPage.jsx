import React, { useEffect } from "react";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { useNavigate, useLocation } from "react-router-dom";
import { setSelectedUser } from "../ustils/selectedUserSlice";

function ChatPage() {
  const selectedUser = useSelector((store) => store.selectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Reset selected user whenever chat page mounts
  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, [dispatch]);

  // ✅ Fix: Navigate to chatcontainer only if you’re on /chats AND mobile AND user selected
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobile && selectedUser && location.pathname === "/chats") {
      navigate("/chatcontainer");
    }
  }, [selectedUser]);

 
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex items-center justify-center pt-2 px-2 sm:px-4 lg:pt-20">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar */}
            <div
              className={`w-full lg:w-80 xl:w-96 border-r border-gray-200 
    ${selectedUser ? "hidden lg:block" : "block"}`}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-white">
                  <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                </div>
                <div className="flex-1 overflow-hidden">
                  <SideBar />
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={`flex-1 ${
                selectedUser ? "block lg:flex" : "hidden lg:flex"
              }`}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
