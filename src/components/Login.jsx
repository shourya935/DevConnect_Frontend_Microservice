import React, { useState } from "react";
import DevConnectLogo from "../assets/DevConnectLogo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../ustils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../ustils/constants";
import PopupModal from "./PopupModel"; // import modal

function Login() {
  const [emailID, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(null); // holds popup config
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailID, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";

      if (message.includes("Email ID does not exist")) {
        // show "Can't find account" popup
        setPopup({
          title: "Can't find account",
          message: `We can't find an account with ${emailID}. Try another email address or create a new account.`,
          buttons: [
            {
              label: "Try again",
              onClick: () => setPopup(null), // close popup
              primary: true,
            },
            {
              label: "Create new account",
              onClick: () => navigate("/signup"), // redirect
              primary: false,
            },
          ],
        });
      } else if (message.includes("Incorrect Password")) {
        // show "Incorrect password" popup
        setPopup({
          title: "Incorrect password",
          message: "The password you entered is incorrect. Please try again.",
          buttons: [
            {
              label: "OK",
              onClick: () => setPopup(null), // close popup
              primary: true,
            },
          ],
        });
      } else {
        alert(message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 pt-10 bg-white text-center">
      {/* Language */}
      <div className="w-full mb-4">
        <p className="text-sm mr-4 text-gray-500 text-center">English (UK)</p>
      </div>

      {/* Logo */}
      <div className="mb-10">
        <div className=" w-40 h-40 mx-auto rounded-full flex items-center justify-center">
          <img src={DevConnectLogo} alt="DevConnect Logo" className=" mx-auto" />
        </div>
      </div>

      {/* Inputs */}
      <input
        type="email"
        value={emailID}
        onChange={(e) => setEmailId(e.target.value)}
        placeholder="Email address"
        className="w-full max-w-xs px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full max-w-xs px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Login Button */}
      <button
        className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition duration-300"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* Create Account Button */}
      <button
        onClick={() => navigate("/signup")}
        className="w-full max-w-xs mt-18 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition duration-300"
      >
        Create new account
      </button>

      {/* Popup Modal */}
      {popup && <PopupModal {...popup} onClose={() => setPopup(null)} />}
    </div>
  );
}

export default Login;
