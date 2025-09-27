import React, { useState } from "react";

function UserCard({ user }) {
  if (!user) {
    return <div>No users found</div>; // Or some fallback UI
  }
  const { firstName, age, about, skills = [], photoURL } = user;

  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleAbout = () => setShowFullAbout((prev) => !prev);
  const safeAbout = about || "";
  const isLongAbout = safeAbout.length > 150;
  const displayedAbout = showFullAbout ? safeAbout : safeAbout.slice(0, 150);

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-md overflow-hidden">
      {/* Image container with overlay text */}
      <div className="relative h-[520px] w-full">
        {/* Background image */}
        <img
          src={photoURL || "https://via.placeholder.com/300x500"}
          alt="User Profile"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end text-white">
          {/* Name and age */}
          <h2 className="text-2xl font-bold mb-1">
            {firstName}{" "}
            {age && <span className="text-gray-300 text-lg">({age})</span>}
          </h2>

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

          {/* About with see more */}
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

      {/* Action buttons */}
      <div className="flex justify-center gap-4 p-4 bg-gray-100">
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
          Skip
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Send Request
        </button>
      </div>
    </div>
  );
}

export default UserCard;



export const UserCardWithoutButtons = ({ user }) => {
  const { firstName, age, about, skills = [], photoURL } = user;
  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleAbout = () => setShowFullAbout((prev) => !prev);

  // Truncate about if more than 150 characters (approx 2-3 lines)
  const isLongAbout = (about || "").length > 150;
  const displayedAbout = showFullAbout
    ? about || ""
    : (about || "").slice(0, 150);

  return (
    <>
      <div className="relative h-[520px] w-full">
        {/* Background image */}
        <img
          src={photoURL || "https://via.placeholder.com/300x500"}
          alt="User Profile"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end text-white">
          {/* Name and age */}
          <h2 className="text-2xl font-bold mb-1">
            {firstName}{" "}
            {age && <span className="text-gray-300 text-lg">({age})</span>}
          </h2>

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

          {/* About with see more */}
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
    </>
  );
};

