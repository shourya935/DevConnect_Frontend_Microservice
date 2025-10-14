import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import axiosInstance from "../ustils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../ustils/messagesSlice";
import toast from "react-hot-toast";
import ChatContainerSkeleton from "./ChatContainerSkeleton";
import { formatMessageTime } from "../ustils/formatMessageTime";
function ChatContainer() {
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const selectedUser = useSelector((store) => store.selectedUser);
  const messages = useSelector((store) => store.messages);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const loadMessage = async () => {
  setIsMessageLoading(true);
  try {
    const res = await axiosInstance.get(`/message/${selectedUser._id}`);
    dispatch(addMessages(res.data));
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  } finally {
    setIsMessageLoading(false);
  }
};

useEffect(() => {
  if (selectedUser?._id) {
    loadMessage();
  }
}, [selectedUser._id]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <ChatContainerSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col ">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message?.senderId === user?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === user._id
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
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message?.text && <p>{message?.text}</p>}
            </div>
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
    </>
  );
}

export default ChatContainer;
