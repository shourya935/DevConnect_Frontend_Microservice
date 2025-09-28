import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../ustils/constants";
import { addFeed, removeFeedCard } from "../ustils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  
 
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const currentUser = feed.request[0];

  const getFeed = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/users/feed`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.request);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const sendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedCard(toUserId))
    } catch (err) {
      console.error("Error in sending request", err);
    }
  };

  if (!feed || !feed.request || feed.request.length === 0) {
    return <div>No users found</div>;
  }
 

  
  if (!currentUser) return <div>Loading...</div>;

 

  return (
    <>
      <div className="flex justify-center  mt-4">
        <UserCard user={currentUser} />
      </div>
      <div className="flex justify-center gap-4 p-4 bg-gray-100">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          onClick={() => sendRequest("ignored", currentUser._id)}
        >
          Skip
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => sendRequest("interested", currentUser._id)}
        >
          Send Request
        </button>
      </div>
    </>
  );
};

export default Feed;
