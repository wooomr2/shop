import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useToggle from "../../hooks/useToggle";
import axios from "../../utils/axiosInstance";
import "./chat.scss";
import Message from "./message/Message";

function Chat() {
  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [arrivalChatroom, setArrivalChatroom] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [alarm, setAlarm] = useState(0);

  const [chatOpen, toggleChatOpen] = useToggle(false);

  const socket = useRef();
  const scrollRef = useRef();
  const { roles, ...user } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      socket.current = io("ws://localhost:8800");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          chatroom: data.chatroomId,
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
      socket.current.emit("addUser", user);
      socket.current.on("getRoom", (chatroom) => {
        setArrivalChatroom(chatroom);
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setAlarm((prev) => ++prev);
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      currentChatroom?.members
        .map((m) => m._id)
        .includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChatroom]);

  useEffect(() => {
    arrivalChatroom &&
      !chatrooms?.map((room) => room._id).includes(arrivalChatroom._id) &&
      setChatrooms((prev) => [...prev, arrivalChatroom]);
  }, [arrivalChatroom, chatrooms]);

  useEffect(() => {
    const getChatrooms = async () => {
      try {
        const res = await axios.get(`/chatrooms/${user._id}`);
        setChatrooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    user && getChatrooms();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChatroom._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    currentChatroom && getMessages();
  }, [currentChatroom]);

  const addChatroom = async () => {
    try {
      const res = await axios.post(`/chatrooms`, { userId: user._id });

      const addedChatroom = res.data[0];
      const chatroomIds = chatrooms.map((chatroom) => chatroom._id);
      const receiver = addedChatroom.members.find(
        (member) => member._id !== user._id
      );

      if (!chatroomIds.includes(addedChatroom._id)) {
        setChatrooms((prev) => [...prev, addedChatroom]);
        socket.current.emit("sendRoom", {
          senderId: user._id,
          receiverId: receiver._id,
          chatroom: addedChatroom,
        });
      }

      setCurrentChatroom(addedChatroom);
      setAlarm(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      chatroom: currentChatroom._id,
      sender: user._id,
      text: newMessage,
    };

    const receiver = currentChatroom.members.find(
      (member) => member._id !== user._id
    );

    socket.current.emit("sendMessage", {
      chatroomId: currentChatroom._id,
      senderId: user._id,
      receiverId: receiver._id,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  return (
    <div className="chat">
      <div
        className={`chat-btn ${chatOpen ? "open" : ""}`}
        onClick={() => {
          addChatroom(user._id);
          toggleChatOpen();
        }}
      >
        <div className="chat-btn-name">CS</div>
        {alarm > 0 && <div className="chat-btn-alarm">{alarm}</div>}
      </div>

      <div className={`chatBox ${chatOpen ? "open" : ""}`}>
        <div className="chatBox-title">
          <div className="title">
            <p>1:1 문의하기</p>
          </div>
          <div className="close" onClick={toggleChatOpen}>
            <CloseIcon className="close-icon" />
          </div>
        </div>
        <div className="chatBox-content">
          {currentChatroom && (
            <>
              <div className="chatBoxTop">
                {messages.map((m, i) => (
                  <div key={i} ref={scrollRef} className="chatBoxTop-chat">
                    <Message
                      message={m}
                      own={m.sender === user._id}
                      owner={
                        m.sender === user._id
                          ? user
                          : currentChatroom.members.find(
                              (member) => member._id === m.sender
                            )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
