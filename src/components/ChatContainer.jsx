import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import axiosInstance from "../ustils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addMessages, appendMessage } from "../ustils/messagesSlice";
import toast from "react-hot-toast";
import ChatContainerSkeleton from "./ChatContainerSkeleton";
import { formatMessageTime } from "../ustils/formatMessageTime";
import { getSocket } from "../ustils/socketSlice";

function ChatContainer() {
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const selectedUser = useSelector((store) => store.selectedUser);
  const messages = useSelector((store) => store.messages);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const loadMessage = async () => {
    setIsMessageLoading(true);
    try {
      const res = await axiosInstance.get(`/message/${selectedUser?._id}`);
      dispatch(addMessages(res.data));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setIsMessageLoading(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedUser?._id) return;
    loadMessage();

    const socket = getSocket();
    if (!socket) {
      console.warn("Socket not connected yet");
      return;
    }

    const handleNewMessage = (newMessage) => {
      if (String(newMessage.senderId?._id ?? newMessage.senderId) === String(user._id)) return;

      const isDuplicate = messages.some((msg) => msg._id === newMessage._id);
      if (isDuplicate) return;

      const incomingSenderId = String(newMessage.senderId?._id ?? newMessage.senderId);
      const incomingReceiverId = String(newMessage.receiverId?._id ?? newMessage.receiverId);
      const isRelevant =
        incomingSenderId === String(selectedUser._id) ||
        incomingReceiverId === String(selectedUser._id);

      if (isRelevant) {
        dispatch(appendMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id]);

  if (isMessageLoading) {
    return (
      <div className="relative h-full flex flex-col bg-base-200">
        <ChatHeader />
        <ChatContainerSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-base-200">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-base-100 border-b">
        <ChatHeader />
      </div>

      {/* Scrollable messages */}
      <div
        ref={messagesContainerRef}
        className="absolute top-[64px] bottom-[70px] left-0 right-0 overflow-y-auto px-4 py-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
      >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              String(message?.senderId?._id ?? message?.senderId) ===
              String(user?._id)
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user?._id
                      ? user?.photoURL
                      : selectedUser?.photoURL
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message?.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message?.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-[200px] rounded-md mb-2"
                />
              )}
              {message?.text && <p>{message?.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Fixed Input */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-base-100 border-t">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
