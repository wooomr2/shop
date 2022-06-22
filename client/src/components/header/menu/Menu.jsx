import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../../../slice/authSlice";
import "./menu.scss";


function Menu({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = sessionStorage.getItem("user");
  
  const logout = () => {
    dispatch(signout());
    setMenuOpen(!menuOpen);
  };

  const onClickNavigate = (page) => () => {
    setMenuOpen(!menuOpen);
    navigate(page);
  };

  return (
    <div className={`menu-container ${menuOpen ? "menuOpen" : ""}`}>
      <div className="menu-items">
        <div className="menu-item" onClick={onClickNavigate("/categories/all")}>
          CATEGORY
        </div>
        <div className="menu-item" onClick={onClickNavigate("/brands/DIGAWEL")}>
          BRAND
        </div>
        <div className="menu-item" onClick={onClickNavigate("/lookbooks")}>
          LOOKBOOK
        </div>
        <div className="menu-item" onClick={onClickNavigate("/collections")}>
          COLLECTION
        </div>
      </div>
      <div className="menu-items">
        {user ? (
          <div className="menu-item" onClick={logout}>
            SIGNOUT
          </div>
        ) : (
          <div className="menu-item" onClick={onClickNavigate("/signin")}>
            SIGNIN
          </div>
        )}
        <div className="menu-item" onClick={onClickNavigate("/cart")}>
          CART
        </div>
        <div className="menu-item" onClick={onClickNavigate("/contact")}>
          CONTACT
        </div>
      </div>
    </div>
  );
}

export default Menu;
