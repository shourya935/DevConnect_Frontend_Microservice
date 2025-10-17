import React, { useState } from "react";




function UserCard({ user, onMessageSent, onSkip, onSendRequest }) {
  const { firstName, age, about, skills = [], photoURL } = user;

  const [showFullAbout, setShowFullAbout] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toggleAbout = () => setShowFullAbout((prev) => !prev);
  const safeAbout = about || "";
  const isLongAbout = safeAbout.length > 150;
  const displayedAbout = showFullAbout ? safeAbout : safeAbout.slice(0, 150);

  const handleSend = async () => {
    if (!messageText.trim()) {
      alert("Please enter a message before sending.");
      return;
    }
    try {
      setIsSending(true);
      await onMessageSent(messageText);
      setMessageText("");
      setShowMessageBox(false);
    } catch (err) {
      console.error("Message send failed:", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full overflow-hidden">
      <div className="relative h-[520px] w-full">
        <img
          src={photoURL || "https://via.placeholder.com/300x500"}
          alt="User Profile"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex flex-col justify-end text-white">
          {/* Header with Send Button */}
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold">
              {firstName}{" "}
              {age && <span className="text-gray-300 text-lg">({age})</span>}
            </h2>

            <button
              onClick={() => setShowMessageBox(!showMessageBox)}
              className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition flex items-center gap-2 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              Message
            </button>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* About */}
          <p className="text-sm text-gray-200 mb-3">
            {displayedAbout}
            {isLongAbout && (
              <span
                onClick={toggleAbout}
                className="ml-1 text-blue-300 cursor-pointer font-medium"
              >
                {showFullAbout ? " See less" : "...See more"}
              </span>
            )}
          </p>

          {/* Textarea Message Input */}
          {showMessageBox && (
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg mb-3">
              <textarea
                rows="3"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Write a message to ${firstName}...`}
                className="w-full text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              ></textarea>

              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    isSending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-pink-500 hover:bg-pink-600"
                  } text-white transition`}
                >
                  {isSending ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={onSkip}
              className="flex-1 py-2.5 font-semibold bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg hover:bg-white/20 active:scale-95 transition-all duration-150 shadow-lg"
            >
              Skip
            </button>
            <button
              onClick={onSendRequest}
              className="flex-1 py-2.5 font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all duration-150 shadow-lg"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}






export function UserCardWithoutSendButton({ user }) {

  const { firstName, age, about, skills = [], photoURL } = user;

  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleAbout = () => setShowFullAbout((prev) => !prev);
  const safeAbout = about || "";
  const isLongAbout = safeAbout.length > 150;
  const displayedAbout = showFullAbout ? safeAbout : safeAbout.slice(0, 150);

  return (
    <div className="bg-white shadow-md rounded-lg w-full overflow-hidden">
  <div className="relative h-[520px] w-full">
    <img
      src={photoURL || "https://via.placeholder.com/300x500"}
      alt="User Profile"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end text-white">
      <h2 className="text-2xl font-bold mb-1">
        {firstName}{" "}
        {age && <span className="text-gray-300 text-lg">({age})</span>}
      </h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-200">
        {displayedAbout}
        {isLongAbout && (
          <span
            onClick={toggleAbout}
            className="ml-1 text-blue-300 cursor-pointer font-medium"
          >
            {showFullAbout ? " See less" : "...See more"}
          </span>
        )}
      </p>
    </div>
  </div>
</div>

  );
}


export default UserCard;