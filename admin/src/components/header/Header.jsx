import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout } from "../../slice/authSlice";
import "./header.scss";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const alarm = useSelector((store) => store.chat.alarm);
  const { pathname } = useLocation();
  const title = pathname.split("/")[1] || "Dashboard";

  const logout = () => {
    dispatch(signout());
    navigate("/signin");
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-left-item togglebar">
          <label htmlFor="nav-toggle">
            <DensityMediumIcon className="icon" />
          </label>
        </div>
        <div className="header-left-title">{title}</div>
      </div>
      <div className="header-right">
        <div className="header-right-item">
          <Avatar
            className="avatar"
            onClick={logout}
            src={user?.profileImg}
            alt=""
          />
        </div>
        <div className="header-right-item">
          <NotificationsNoneIcon className="icon" />
          <div className="counter">1</div>
        </div>
        <Link to="/chat" className="header-right-item">
          <ChatBubbleOutlineIcon className="icon" />
          <div className="counter">{alarm}</div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
