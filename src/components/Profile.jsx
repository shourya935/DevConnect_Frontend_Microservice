import React, { useState } from "react";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { UserCardWithoutSendButton } from "./UserCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../ustils/axiosInstance";
import { disconnectSocket } from "../ustils/socketSlice";
import { LogOut, Users } from "lucide-react";

function Profile() {
  const user = useSelector((store) => store.user);
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading user profile...</p>
      </div>
    );
  }

  const handleToggleEditProfile = () => setShowEditForm((prev) => !prev);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`/logout`);
      dispatch(disconnectSocket(user._id));
      navigate("/login");
    } catch (err) {
      console.error(err);
      dispatch(disconnectSocket());
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        
        {/* User Profile Card */}
        <div className="relative w-full">
          {/* My Connections Button */}
          <button
            onClick={() => navigate("/connections")}
            className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 font-medium py-1.5 px-3 rounded-full shadow-md transition z-10"
          >
            <Users size={18} />
            <span className="text-sm">My Connections</span>
          </button>

          {/* Profile Card */}
          <UserCardWithoutSendButton user={user} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={handleToggleEditProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {showEditForm ? "Close Edit Profile(Scroll Down)" : "Edit Profile"}
          </button>
          <button
            onClick={() => navigate("/upgradepassword")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Upgrade Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Edit Profile Form */}
        {showEditForm && (
          <div className="w-full mt-4">
            <EditProfile user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
