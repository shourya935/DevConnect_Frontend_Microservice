import React, { useState } from "react";

function UserCard({ user }) {

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



