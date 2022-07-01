import publicURL from "../../utils/publicURL";
import "./message.css";

function Message({ message, own, owner }) {
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            owner.profileImg
              ? publicURL(owner.profileImg)
              : "/assets/Avatar.png"
          }
          alt=""
        />
        <p>{owner.username}</p>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{message.createdAt}</div>
    </div>
  );
}

export default Message;
