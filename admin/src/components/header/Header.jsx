import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ListIcon from "@mui/icons-material/List";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../../slice/authSlice";
import { clearAlarm } from "../../slice/chatSlice";
import "./header.scss";

function Header() {
  const dispatch = useDispatch();
  const alarm = useSelector((store) => store.chat.alarm);
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  const logout = () => {
    dispatch(signout());
    navigate("/signin");
  };

  return (
    <div className="header">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <Avatar
              className="avatar"
              onClick={logout}
              src={user?.profileImg}
              alt=""
            />
          </div>
          <div className="item">
            <NotificationsNoneIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item" onClick={()=>dispatch(clearAlarm())}>
            <Link to="/chat" >
              <ChatBubbleOutlineIcon className="icon" />
              <div className="counter">{alarm}</div>
            </Link>
          </div>
          <div className="item">
            <FullscreenIcon className="icon" />
          </div>
          <div className="item">
            <DarkModeIcon className="icon" />
          </div>
          <div className="item">
            <ListIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
