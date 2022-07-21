import { useDispatch } from "react-redux";
import { clearAlarm } from "../../../slice/chatSlice";
import axios from "../../../utils/axiosInstance";
import publicURL from "../../../utils/publicURL";
import "./chatOnline.scss";

function ChatOnline({
  socket,
  user,
  onlineUsers,
  chatrooms,
  setChatrooms,
  setCurrentChatroom,
  setAlarms,
}) {
  const dispatch = useDispatch();

  const addChatroom = async (onlineUserId) => {
    try {
      const res = await axios.post(`/chatrooms`, { userId: onlineUserId });

      const addedChatroom = res.data[0];
      const chatroomIds = chatrooms.map((chatroom) => chatroom._id);
      const receiver = addedChatroom.members.find(
        (member) => member._id !== user._id
      );

      if (!chatroomIds.includes(addedChatroom._id)) {
        setChatrooms((prev) => [...prev, res.data[0]]);
        socket.current.emit("sendRoom", {
          senderId: user._id,
          receiverId: receiver._id,
          chatroom: addedChatroom,
        });
      }

      setCurrentChatroom(addedChatroom);
      setAlarms((prev) => prev.filter((alarm) => alarm !== addedChatroom._id));
      dispatch(clearAlarm());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
    <p>접속중</p>

    {onlineUsers?.map((o, i) => (
      <div
        className="chatOnlineFriend"
        key={i}
        onClick={() => addChatroom(o.user._id)}
      >
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={
              o.user.profileImg
                ? publicURL(o.user.profileImg)
                : "/assets/Avatar.png"
            }
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.user.username}</span>
      </div>
    ))}
  </div>
  );
}

export default ChatOnline;
