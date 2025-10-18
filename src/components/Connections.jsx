import React, { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../ustils/connectionsSlice";
import UserCard, { UserCardWithoutSendButton } from "./UserCard";
import axiosInstance from "../ustils/axiosInstance";
import SidebarSkeleton from "./SidebarSkeleton";

function Connections() {
  const [selectedUser, setSelectedUser] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const loadConnections = async () => {
    try {
      setIsLoading(true)
      const res = await axiosInstance.get("/user/connections");
      dispatch(addConnections(res?.data?.requests));
    } catch (err) {
      console.error("Failed to load connections:", err);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    loadConnections();
  }, []);

  const removeConnection = async (userId) => {
    await axiosInstance.delete(`/user/deleteconnection/${userId}`);
    dispatch(removeConnections(userId));
    setShowModal(false);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  if(isLoading){
    return(
      <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Connections
      </h2>
      <SidebarSkeleton/>
      </>
    )
  }

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486814.png"
          alt="No connections"
          className="w-24 mb-4 opacity-50"
        />
        <p className="text-lg font-semibold mb-1">No connections yet</p>
        <p className="text-sm">
          Explore the Home Page and connect with interested people.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Connections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {connections.map((ele) => (
          <div
            key={ele._id}
            onClick={() => openModal(ele)}
            className="flex items-center p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <img
              src={ele?.photoURL}
              alt="User"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 mr-4"
            />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {ele?.firstName}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>

            {/* User card */}
            <UserCardWithoutSendButton user={selectedUser} />

            {/* Text and button */}
            <div className="mt-0 flex flex-col items-center gap-3">
              <button
                onClick={() => removeConnection(selectedUser._id)}
                className="w-full px-3 py-1 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 active:scale-95 transition-transform duration-150"
              >
                Remove from connections ⊘
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Connections;
