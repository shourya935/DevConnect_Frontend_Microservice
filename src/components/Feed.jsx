import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL
import { addFeed, removeFeedCard } from "../ustils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.request)); 
      } catch (err) {
        console.error(err);
      }
    };

    getFeed();
  }, [dispatch]);

  if (!feed || feed.length === 0) {
    return <div className="text-center mt-10">No users found</div>;
  }

  const currentUser = feed[0]; 

  const sendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedCard(toUserId));
    } catch (err) {
      console.error("Error in sending request", err);
    }
  };

  if (!currentUser) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile View */}
      <div className="block md:hidden w-full px-2 py-2">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md w-full h-[700px] overflow-hidden">
          {/* User Card */}
          <div className="w-full flex-grow">
            <UserCard user={currentUser} />
          </div>

          {/* Buttons */}
          <div className="w-full flex gap-4 px-4 pt-0 pb-4 mb-28">
            <button
              className="w-1/2 px-4 py-3 font-semibold bg-gray-300 text-gray-800 rounded shadow-md hover:bg-gray-400 active:scale-95 transition-transform duration-150"
              onClick={() => sendRequest("ignored", currentUser._id)}
            >
              Skip
            </button>
            <button
              className="w-1/2 px-4 py-3 font-semibold bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 active:scale-95 transition-transform duration-150"
              onClick={() => sendRequest("interested", currentUser._id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 justify-center items-center px-6 py-8">
        <div className="w-full max-w-md">
          <UserCard user={currentUser} />
        </div>
      </div>

      <div className="hidden md:flex md:flex-col justify-center items-center gap-4 px-6 py-12 bg-white shadow-inner md:w-1/3">
        <button
          className="w-40 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          onClick={() => sendRequest("ignored", currentUser._id)}
        >
          Skip
        </button>
        <button
          className="w-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => sendRequest("interested", currentUser._id)}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default Feed;
