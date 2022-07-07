import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../../slice/authSlice";
import "./menu.scss";

function Menu({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const logout = () => {
    dispatch(signout());
    setMenuOpen(!menuOpen);
  };

  const onNavigate = (path) => () => {
    setMenuOpen(!menuOpen);
    navigate(path);
  };

  return (
    <div className={`menu-container ${menuOpen ? "menuOpen" : ""}`}>
      <div className="menu-items">
        <div className="menu-item" onClick={onNavigate("/categories/all")}>
          CATEGORY
        </div>
        <div className="menu-item" onClick={onNavigate("/brands/DIGAWEL")}>
          BRAND
        </div>
        <div className="menu-item" onClick={onNavigate("/lookbooks")}>
          LOOKBOOK
        </div>
        <div className="menu-item" onClick={onNavigate("/collections")}>
          COLLECTION
        </div>
      </div>
      
      <div className="menu-items">
        {user ? (
          <div className="menu-item" onClick={logout}>
            SIGNOUT
          </div>
        ) : (
          <div className="menu-item" onClick={onNavigate("/signin")}>
            SIGNIN
          </div>
        )}
        <div className="menu-item" onClick={onNavigate("/cart")}>
          CART
        </div>
        <div className="menu-item" onClick={onNavigate("/contact")}>
          CONTACT
        </div>
      </div>
    </div>
  );
}

export default Menu;
