import React, { useState } from "react";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((store) => store.user);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditPasswordForm, setShowEditPasswordForm] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading user profile...</p>
      </div>
    );
  }

  const { firstName, age, about, skills = [], photoURL } = user;

  const toggleAbout = () => setShowFullAbout((prev) => !prev);
  const isLongAbout = about && about.length > 150;
  const displayedAbout = showFullAbout ? about : about.slice(0, 150);

  const handleToggleEditProfile = () => {
    setShowEditForm((prev) => !prev);
  };

  const handleToggleEditPassword = () => {
    setShowEditPasswordForm((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gray-50">
      <div className="card w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
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
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <button
              onClick={handleToggleEditProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {showEditForm ? "Close Edit Profile" : "Edit Profile"}
            </button>

            <button
              onClick={handleToggleEditPassword}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              {showEditPasswordForm ? "Close Password Form" : "Edit Password"}
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render Edit Profile form */}
      {showEditForm && (
        <div className="w-full max-w-md mt-8 transition-all duration-300">
          <EditProfile user={user} />
        </div>
      )}

      {/* Conditionally render Edit Password form */}
      {showEditPasswordForm && (
        <div className="w-full max-w-md mt-8 transition-all duration-300">
          <EditPassword />
        </div>
      )}
    </div>
  );
}

export default Profile;
