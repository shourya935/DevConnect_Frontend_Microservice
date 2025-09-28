import React, { useState } from "react";
import { BASE_URL } from "../ustils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../ustils/userSlice";

function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    age: user?.age || "",
    about: user?.about || "",
    skills: user?.skills || [],
    image: null,
  });
  const [skillsInput, setSkillsInput] = useState("");
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

    try {
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("age", formData.age);
      submitData.append("about", formData.about);
      formData.skills.forEach((skill) => submitData.append("skills", skill));
      if (formData.image) submitData.append("image", formData.image);

      const res = await axios.patch(BASE_URL + "/profile/edit", submitData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setError(null);

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = skillsInput.trim();
      if (trimmed && !formData.skills.includes(trimmed)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, trimmed],
        }));
      }
      setSkillsInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Name */}
        <input
          type="text"
          name="firstName"
          placeholder="Full Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        {/* Age */}
        <input
          type="text"
          name="age"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        {/* About */}
        <textarea
          name="about"
          value={formData.about}
          placeholder="Short description..."
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows="3"
          required
        ></textarea>

        {/* Skills */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type skill and press Add (e.g., Data Analytics)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => {
                const trimmed = skillsInput.trim();
                if (trimmed && !formData.skills.includes(trimmed)) {
                  setFormData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, trimmed],
                  }));
                  setSkillsInput("");
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <label className="block">
          <span className="text-sm text-gray-700 mb-1">Profile Picture</span>
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-10/12 max-w-sm text-center">
            <h3 className="text-xl font-bold text-red-600 mb-2">Error!!</h3>
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
  );
}

export default EditProfile;
