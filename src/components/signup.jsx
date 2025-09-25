import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../ustils/constants";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DevConnectLogo from "../assets/DevConnectLogo.png";
import { useDispatch } from "react-redux";
import { addUser } from "../ustils/userSlice";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    about: "",
    skills: "",
    emailID: "",
    password: "",
    image: null,
    gender: "Not Specified",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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

    if (!formData.image) {
      setError(
        "Please upload a profile photo — it’s required for user authenticity."
      );
      return;
    }

    setLoading(true);

    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    // submitData.append("lastName", formData.lastName);
    submitData.append("age", formData.age);
    submitData.append("about", formData.about);
    submitData.append("skills", formData.skills);
    submitData.append("emailID", formData.emailID);
    submitData.append("password", formData.password);
    submitData.append("image", formData.image);
    // submitData.append("gender", formData.gender);

    try {
      const res = await axios.post(BASE_URL + "/signup", submitData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setError(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Image (for Desktop) */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src="https://st4.depositphotos.com/3215143/22272/v/1600/depositphotos_222727096-stock-illustration-young-people-communicate-social-networks.jpg"
          alt="DevConnect illustration"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col items-center justify-start px-6 pt-6 md:pt-10 bg-white text-center w-full md:w-1/2">
        {/* Back Button */}
        <button
          className="flex items-center text-blue-500 mb-2 self-start"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Back to Login</span>
        </button>

        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4 text-left"
        >
          <input
            type="text"
            name="firstName"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="age"
            placeholder="Your Age"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="about"
            placeholder="Short description (e.g., Web Developer)"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (e.g., React, Node.js)"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1">
              Profile Picture <span className="text-red-500">*</span>
            </span>
            <label className="w-full bg-blue-50 text-blue-600 border border-dashed border-blue-400 px-4 py-2 rounded-md text-center cursor-pointer hover:bg-blue-100 transition duration-200 block">
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

          <input
            type="email"
            name="emailID"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Error Popup */}
        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-10/12 max-w-sm text-center">
              <h3 className="text-xl font-bold text-red-600 mb-2">
                Signup Error!!
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
    </div>
  );
};

export default SignUpForm;
