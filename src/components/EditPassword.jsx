
import React, { useState } from "react";
import axiosInstance from "../ustils/axiosInstance";
const BASE_URL = import.meta.env.VITE_BASE_URL
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const EditPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.patch("/profile/password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }
      );

      alert("✅ " + res.data + " Please login with your new password");
      navigate("/login");

      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const message = "❌ " + (err.response?.data || "Something went wrong");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setError(null);

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-50 px-4">
      {/* Back button */}
      <button
        className="flex items-center mt-2 text-blue-500 mb-6 self-start"
        onClick={() => navigate("/profile")}
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium">Back to Profile</span>
      </button>

      {/* Password form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-5 bg-white shadow-lg rounded-lg px-8 py-10"
      >
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Change Password
        </h3>

        {/* Current Password */}
        <div className="mb-5">
          <label
            htmlFor="oldPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Current Password
          </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-sm text-center">
            <h3 className="text-xl font-bold text-red-600 mb-2">Error!</h3>
            <p className="text-gray-800">{error}</p>
            <button
              onClick={closeError}
              className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPassword;

