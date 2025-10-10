import React, { useEffect } from 'react';
import NoChatSelected from './NoChatSelected';
import ChatContainer from './ChatContainer';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
  const selectedUser = useSelector((store) => store.selectedUser);
  const navigate = useNavigate();

  // Handle mobile navigation
  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    
    if (isMobile && selectedUser) {
      // Navigate to chat container on mobile
      navigate('/chatcontainer');
    }
  }, [selectedUser, navigate]);

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex items-center justify-center pt-16 px-2 sm:px-4 lg:pt-20">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar - Always visible on desktop, only when no selected user on mobile */}
            <div className={`
              w-full lg:w-80 xl:w-96 
              border-r border-gray-200
              ${selectedUser ? 'hidden lg:block' : 'block'}
            `}>
              <div className="h-full flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                </div>
                
                {/* Sidebar Content */}
                <div className="flex-1 overflow-hidden">
                  <SideBar />
                </div>
              </div>
            </div>

            {/* Chat Area - Hidden on mobile when no user selected */}
            <div className={`
              flex-1 
              ${!selectedUser ? 'hidden lg:flex' : 'hidden'}
              lg:flex
            `}>
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;