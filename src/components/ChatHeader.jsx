import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {setSelectedUser} from "../ustils/selectedUserSlice";
import { useNavigate } from "react-router-dom";


const ChatHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedUser = useSelector((store) => store.selectedUser)
  const  onlineUsers  = useSelector((store) => store.onlineUsers)

  const handleClose =  () => {
    dispatch(setSelectedUser(null))
    navigate("/chats")

  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser?.photoURL || "/avatar.png"} alt={selectedUser?.firstName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.firstName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={handleClose}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;