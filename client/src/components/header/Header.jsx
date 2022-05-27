import "./header.scss";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ListIcon from "@mui/icons-material/List";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
    // navigate("/");
  };

  return (
    <div className="header">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
          {user ? (
          <div className="item">
            <Avatar
              className="avatar"
              onClick={logout}
              src={user?.profileImg}
              alt=""
            />
          </div>
          ) : (
            <div onClick={()=>navigate("/signin")}>Sign in</div>
          )}
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
          <div className="item" onClick={()=>navigate("/cart")}>
            <ShoppingCartOutlinedIcon className="icon" />
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
