import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../ustils/constants";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("")

  const navigate = useNavigate()

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
      const res = await axios.patch( 
        BASE_URL +  "/profile/password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          withCredentials: true, // if you're using cookies for auth
        }
      );

      alert("✅ " + res.data + "Please login with new password"); // success message
      navigate("/login")

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const message = ("❌ " + err.response?.data || "Something went wrong");
      setError(message)
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setError(null)

  return (

    <div>
    
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 className="text-xl font-semibold mb-4">Change Password</h3>

      <div className="mb-4">
        <label
          htmlFor="oldPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Current Password
        </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="newPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
    { error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-10/12 max-w-sm text-center">
              <h3 className="text-xl font-bold text-red-600 mb-2">
               Error!!
              </h3>
              <p className="text-gray-800">{error}</p>
              
              <button
                onClick={closeError}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        ) }
            </div>
  );
};

export default EditPassword;
