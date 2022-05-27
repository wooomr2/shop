import "./header.scss";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ListIcon from "@mui/icons-material/List";
import { useDispatch } from "react-redux";
import { signout } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

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
          <div className="item">
            <ChatBubbleOutlineIcon className="icon" />
            <div className="counter">2</div>
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
