import publicURL from "../../utils/publicURL";
import moment from "moment";
import "moment/locale/ko";
import "./message.scss";

function Message({ message, own, owner }) {
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">

        <div className="messageTop-user">
          <img
            className="messageImg"
            src={
              owner?.profileImg ? publicURL(owner?.profileImg) : "/favicon.ico"
            }
            alt=""
          />
          <div className="messageUsername">{owner?.username || "HAO"}<span>님</span></div>
        </div>

        <div className="messageText">
          {message?.text?.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
      <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
    </div>
  );
}

export default Message;
