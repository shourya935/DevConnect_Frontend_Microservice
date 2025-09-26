import React, { useState } from "react";

function UserCard({ user }) {
  const { firstName, age, about, skills = [], photoURL } = user;
  const [showFullAbout, setShowFullAbout] = useState(false);

  const toggleAbout = () => setShowFullAbout(prev => !prev);

  // Truncate about if more than 150 characters (approx 2-3 lines)
  const isLongAbout = about && about.length > 150;
  const displayedAbout = showFullAbout ? about : about.slice(0, 150);

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-md overflow-hidden">
      {/* Profile Image */}
      <figure className="h-64 w-full overflow-hidden">
        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* User Info */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {firstName}{" "}
          {age && <span className="text-gray-500 text-lg">({age})</span>}
        </h2>

        {/* About section with See more */}
        <p className="text-gray-700 mb-2">
          {displayedAbout}
          {isLongAbout && (
            <span
              onClick={toggleAbout}
              className="text-blue-500 ml-1 cursor-pointer font-medium"
            >
              {showFullAbout ? " See less" : "...See more"}
            </span>
          )}
        </p>

        {/* Skills as Pills */}
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
            Skip
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
