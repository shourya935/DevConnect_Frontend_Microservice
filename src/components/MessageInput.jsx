import React, { useState, useRef } from "react";
import { Send, Image, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../ustils/axiosInstance";
import { appendMessage } from "../ustils/messagesSlice";

function MessageInput() {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);

  const selectedUser = useSelector((store) => store.selectedUser);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only .jpeg, .jpg, or .png files are allowed");
        return;
      }

      // Validate file size (3MB)
      if (file.size > 3 * 1024 * 1024) {
        alert("File size must be less than 3MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imageFile) {
      return; // Don't send empty messages
    }

    if (!selectedUser?._id) {
      alert("Please select a user to send message");
      return;
    }

    setIsSending(true);

    try {
      const formData = new FormData();

      if (text.trim()) {
        formData.append("text", text.trim());
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axiosInstance.post(
        `/message/${selectedUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Message sent successfully:", response.data);

      const newMessage = {
        ...response.data,
        senderId: user._id,
      };

      // Add the new message to Redux store
     dispatch(appendMessage(newMessage ));

      // Clear form after successful send
      setText("");
      removeImage();
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to send message";
      alert(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 relative inline-block">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-32 rounded-lg border border-gray-300"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Image Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition"
          disabled={isSending}
        >
          <Image size={24} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleImageSelect}
          className="hidden"
        />

        {/* Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message here..."
          className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          disabled={isSending}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={isSending || (!text.trim() && !imageFile)}
          className="p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
