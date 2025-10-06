import axiosInstance from "../ustils/axiosInstance";
import React, { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../ustils/requestsSlice";
import UserCard from "./UserCard";

function Requests() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
 

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const loadRequests = async () => {
    try {
      const res = await axiosInstance.get("/user/requests/received"); 
      dispatch(addRequests(res?.data?.requests));
    } catch (err) {
      console.error("Error in fetching requests", err);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const sendReviewRequest = async (status, requestId) => {
    try {
      await axiosInstance.post(`/request/review/${status}/${requestId}`);
  
      setShowModal(null);

      dispatch(removeRequests(requestId))
    } catch (err) {
      console.error("Error in sending ReviewRequest", err);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const selected = selectedUser;
  if (selected) {
    console.log(selectedUser._id); //request id
  }

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486814.png"
          alt="No requests"
          className="w-24 mb-4 opacity-50"
        />
        <p className="text-lg font-semibold mb-1">No connection requests yet</p>
        <p className="text-sm">
          Check back later to see who wants to connect with you.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🔗 Incoming Requests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {requests.map((ele) => (
          <div
            key={ele?.fromUserId._id}
            onClick={() => openModal(ele)}
            className="group relative p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  ele?.fromUserId.photoURL || "https://via.placeholder.com/150"
                }
                alt="User"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {ele?.fromUserId.firstName}
                </p>
                <p className="text-sm text-gray-500">Sent you a request</p>
              </div>
            </div>

            <span
              className="absolute top-2 bg-amber-200  right-2 text-xs px-2 py-1 rounded-full"
            >
              pending
            </span>
            
              <button className="mt-4 w-full py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition">
                View Profile
              </button>
            
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <div className="p-6">
              <UserCard user={selectedUser.fromUserId} />

              <div className="mt-4 flex justify-between gap-4">
                <button
                  className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={() =>
                    sendReviewRequest("accepted", selectedUser._id)
                  }
                >
                  Accept
                </button>
                <button
                  className="flex-1 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                  onClick={() =>
                    sendReviewRequest("rejected", selectedUser._id)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requests;
