import React, { useState } from "react";
import { BASE_URL } from "../ustils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../ustils/userSlice";

function EditProfile({user}) {
  const [formData, setFormData] = useState({
  firstName: user?.firstName || "",
  age: user?.age || "",
  about: user?.about || "",
  skills: user?.skills || "",
  image: null,
});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("age", formData.age);
    submitData.append("about", formData.about);
    submitData.append("skills", formData.skills);
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", submitData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setError(null);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
          <input
            type="text"
            name="firstName"
            placeholder="Full Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="age"
            placeholder="Your Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="about"
            placeholder="About you"
            value={formData.about}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="skills"
            placeholder="Your Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />

          <label className="block">
            <span className="text-sm text-gray-700 mr-1">Profile Picture</span>
            <label className="w-full mt-1 bg-blue-50 text-blue-600 border border-dashed border-blue-400 px-4 py-2 rounded-md text-center cursor-pointer hover:bg-blue-100">
              Upload Photo
              <input
                type="file"
                name="image"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
            </label>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        {error && (
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
        )}
      </div>
    </>
  );
}

export default EditProfile;
