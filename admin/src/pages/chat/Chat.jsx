import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { clearAlarm, increaseAlarm } from "../../slice/chatSlice";
import axios from "../../utils/axiosInstance";
import "./chat.scss";
import ChatOnline from "./chatOnline/ChatOnline";
import Chatroom from "./chatroom/Chatroom";
import Message from "./message/Message";

function Chat() {
  const dispatch = useDispatch();

  const [chatrooms, setChatrooms] = useState([]);
  const [currentChatroom, setCurrentChatroom] = useState(null);
  const [arrivalChatroom, setArrivalChatroom] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [alarms, setAlarms] = useState([]);

  const socket = useRef();
  const scrollRef = useRef();
  const { roles, ...user } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      const socketURI = process.env.NODE_ENV === "production" ? `/socket.io` : `ws://localhost:8800`;
      socket.current = io(socketURI);
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          chatroom: data.chatroomId,
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
        setAlarms((prev) => [...prev, data.chatroomId]);
        dispatch(increaseAlarm());
      });
      socket.current.emit("addUser", user);
      socket.current.on("getUsers", (socketUsers) => {
        const users = socketUsers.filter((su) => su.user._id !== user._id);
        setOnlineUsers(users);
      });
      socket.current.on("getRoom", (chatroom) => {
        setArrivalChatroom(chatroom);
      });
    }
  }, []);

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

  const handleTextarea = (e) => {
    if (e.keyCode !== 13) return;

    return handleSubmit(e);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chatrooms">
        <p>채팅방 목록</p>

        <div className="chatrooms-wrapper">
          {chatrooms?.map((c, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentChatroom(c);
                setAlarms((prev) => prev.filter((alarm) => alarm !== c._id));
                dispatch(clearAlarm());
              }}
              className="chatrooms-wrapper-item"
            >
              <Chatroom chatroom={c} />
              <p>알림: {alarms?.filter((alarm) => alarm === c._id).length}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="chatBox">
        {currentChatroom ? (
          <>
            <div className="chatBoxTop">
              {messages.map((m, i) => (
                <div key={i} ref={scrollRef}>
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
                onKeyDown={handleTextarea}
              />
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="noChatroom">채팅방 여세요</span>
        )}
      </div>

      <ChatOnline
        socket={socket}
        user={user}
        onlineUsers={onlineUsers}
        chatrooms={chatrooms}
        setChatrooms={setChatrooms}
        setCurrentChatroom={setCurrentChatroom}
        setAlarms={setAlarms}
      />
    </div>
  );
}

export default Chat;
