import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard, { UserCardWithoutSendButton } from "./UserCard";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((store) => store.user);
  const [showEditForm, setShowEditForm] = useState(false);

  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading user profile...</p>
      </div>
    );
  }

  const handleToggleEditProfile = () => {
    setShowEditForm((prev) => !prev);
  };

  return (
   <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gray-50">
  <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
    {/* User Profile Card */}
    <div className="flex-1">
      <div className="card w-full bg-white shadow-md rounded-lg overflow-hidden">
        <UserCardWithoutSendButton user={user} />
        <div className="p-6">
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <button
              onClick={handleToggleEditProfile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              {showEditForm ? "Close Edit Profile" : "Edit Profile"}
            </button>
            <button
              onClick={() => navigate("/upgradepassword")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Upgrade Password
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column — always rendered for layout consistency */}
    <div className="flex-1 transition-all duration-300">
      {showEditForm ? (
        
          <EditProfile user={user} />
      
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  </div>
</div>
  );
}

export default Profile;
