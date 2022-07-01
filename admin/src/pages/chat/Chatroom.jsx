import publicURL from "../../utils/publicURL";

function Chatroom({ chatroom }) {

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        {chatroom?.members?.map((member, idx) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column" }}>
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
            <span className="chatroomName">{member?.username} </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatroom;
