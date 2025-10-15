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
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

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
  if (currentUser) {
    dispatch(setSelectedUser(currentUser));
  }

  const sendRequest = async (status, toUserId) => {
    try {
      await axiosInstance.post(`/request/send/${status}/${toUserId}`);
      dispatch(removeFeedCard(toUserId));
      setShowMessageInput(false);
      setMessageText("");
    } catch (err) {
      console.error("Error in sending request", err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      alert("Please enter a message");
      return;
    }

    setIsSendingMessage(true);
    try {
      const response = await axiosInstance.post(
        `/message/${currentUser._id}`,
        { text: messageText }
      );

      console.log("✅ Message sent:", response.data);

      // Add user to chat list
      dispatch(addChatUser(currentUser));

      // Show success message
      alert(`Message sent to ${currentUser.firstName}!`);

      // Reset and move to next user
      setMessageText("");
      setShowMessageInput(false);
      // dispatch(removeFeedCard(currentUser._id));
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (!currentUser) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile View */}
      <div className="block md:hidden w-full px-2 py-2">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md w-full h-[700px] overflow-hidden">
          {/* User Card */}
          <div className="w-full flex-grow">
            <UserCard user={currentUser} />
          </div>

          {/* Message Input (Mobile) */}
          {showMessageInput && (
            <div className="w-full px-4 pb-4">
              <div className="flex flex-col gap-2">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Send a message to ${currentUser.firstName}...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    onClick={() => {
                      setShowMessageInput(false);
                      setMessageText("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:bg-gray-400"
                    onClick={handleSendMessage}
                    disabled={isSendingMessage}
                  >
                    {isSendingMessage ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Buttons (Mobile) */}
          {!showMessageInput && (
            <div className="w-full flex flex-col gap-2 px-4 pt-0 pb-4 mb-28">
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-3 font-semibold bg-gray-300 text-gray-800 rounded shadow-md hover:bg-gray-400 active:scale-95 transition-transform duration-150"
                  onClick={() => sendRequest("ignored", currentUser._id)}
                >
                  Skip
                </button>
                <button
                  className="flex-1 px-4 py-3 font-semibold bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 active:scale-95 transition-transform duration-150"
                  onClick={() => sendRequest("interested", currentUser._id)}
                >
                  Send Request
                </button>
              </div>
              <button
                className="w-full px-4 py-3 font-semibold bg-green-500 text-white rounded shadow-md hover:bg-green-600 active:scale-95 transition-transform duration-150"
                onClick={() => setShowMessageInput(true)}
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 justify-center items-center px-6 py-8">
        <div className="w-full max-w-md">
          <UserCard user={currentUser} />
        </div>
      </div>

      <div className="hidden md:flex md:flex-col justify-center items-center gap-4 px-6 py-12 bg-white shadow-inner md:w-1/3">
        {!showMessageInput ? (
          <>
            <button
              className="w-40 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              onClick={() => sendRequest("ignored", currentUser._id)}
            >
              Skip
            </button>

            <button
              className="w-40 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              onClick={() => setShowMessageInput(true)}
            >
              Send Message
            </button>

            <button
              className="w-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => sendRequest("interested", currentUser._id)}
            >
              Send Request
            </button>
          </>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center">
              Message {currentUser.firstName}
            </h3>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={4}
            />
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                onClick={() => {
                  setShowMessageInput(false);
                  setMessageText("");
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:bg-gray-400"
                onClick={handleSendMessage}
                disabled={isSendingMessage}
              >
                {isSendingMessage ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;