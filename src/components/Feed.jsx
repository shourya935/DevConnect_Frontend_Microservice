import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeedCard } from "../ustils/feedSlice";
import axiosInstance from "../ustils/axiosInstance";
import UserCard from "./UserCard";
import { setSelectedUser } from "../ustils/selectedUserSlice";
import { addChatUser } from "../ustils/chatsSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axiosInstance.get("/users/feed");
        console.log("🔁 FEED API Response:", res.data);
        dispatch(addFeed(res.data.request));
      } catch (err) {
        console.error("🛑 Feed API Error:", err);
      }
    };

    getFeed();
  }, [dispatch]);

  if (!feed || feed.length === 0) {
    return <div className="text-center mt-10">No users found!!</div>;
  }

  const currentUser = feed[0];

  const sendRequest = async (status, toUserId) => {
    try {
      await axiosInstance.post(`/request/send/${status}/${toUserId}`);
      dispatch(removeFeedCard(toUserId));
    } catch (err) {
      console.error("Error in sending request", err);
    }
  };

  const handleSendMessage = async (messageText) => {
    try {
      const response = await axiosInstance.post(
        `/message/${currentUser._id}`,
        { text: messageText }
      );

      console.log("✅ Message sent:", response.data);

      // Add user to chat list
      dispatch(addChatUser(currentUser));

      // Show success message
      alert(`Message sent to ${currentUser.firstName}!, Now ${currentUser.firstName} is added in your chats`);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
      throw err;
    }
  };

  if (!currentUser) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile View */}
      <div className="block md:hidden w-full px-2 py-2">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md w-full h-[700px] overflow-hidden">
          <div className="w-full flex-grow">
            <UserCard 
              user={currentUser} 
              onSkip={() => sendRequest("ignored", currentUser._id)}
              onSendRequest={() => sendRequest("interested", currentUser._id)}
              onMessageSent={handleSendMessage}
            />
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 justify-center items-center px-6 py-8">
        <div className="w-full max-w-md">
          <UserCard 
            user={currentUser} 
            onSkip={() => sendRequest("ignored", currentUser._id)}
            onSendRequest={() => sendRequest("interested", currentUser._id)}
            onMessageSent={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;