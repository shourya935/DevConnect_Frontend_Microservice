import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../ustils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../ustils/connectionsSlice";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.Connections);

  const loadConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res?.data?.requests));
  };
  console.log(connections);

  useEffect(() => {
    loadConnections();
  }, []);
  return (
    <>
    <div>Your Connections:-</div>

    {
        connections.map((ele) => (
            <div className="flex mt-5 ml-5 bg-gray-400">
        
      <div className="w-10 mr-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img
          src={ele?.photoURL}
          key={ele._id}
          alt="User Profile"
          className="object-cover"
        />
      </div>
      <span className="font-medium text-gray-700"
      key={ele._id}
      >
            {ele?.firstName}
            </span>
    </div>
        ))
    }
    </>
  );
}

export default Connections;
