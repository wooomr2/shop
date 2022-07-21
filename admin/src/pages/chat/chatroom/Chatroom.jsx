import publicURL from "../../../utils/publicURL";
import "./chatroom.scss";

function Chatroom({ chatroom }) {

  return (
    <div className="chatroom">
    {chatroom?.members?.slice(-1).map((member, idx) => (
      <div key={idx} className="chatroom">
        <img
          className="chatroomImg"
          src={
            member.profileImg
              ? publicURL(member.profileImg)
              : "/assets/Avatar.png"
          }
          alt=""
          width="30"
          height="30"
        />
        <p className="chatroomName">
          <span>{member?.username}</span>님
        </p>
      </div>
    ))}
  </div>
  );
}

export default Chatroom;
