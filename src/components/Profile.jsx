import React, { useState } from "react";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import { useSelector } from "react-redux";
import { UserCardWithoutButtons } from "./UserCard";

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
      
      <UserCardWithoutButtons user={user}/>

          <div className="p-6">
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
