import SearchIcon from "@mui/icons-material/Search";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { signout } from "../../slice/authSlice";
import { updateCartItems } from "../../slice/cartSlice";
import BrandMenu from "./brandMenu/BrandMenu";
import "./header.scss";
import Menu from "./menu/Menu";
import SearchInput from "./searchInput/SearchInput";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = sessionStorage.getItem("user");
  const cartItems = useSelector((store) => store.cart.cartItems);
  // const [menuOpen, setMenuOpen] = useState(false);
  // const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, toggleMenuOpen, setMenuOpen] = useToggle(false);
  const [searchOpen, toggleSearchOpen, setSearchOpen] = useToggle(false);
  const [isHovering, setIsHovering] = useState(0);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const onClickNavigate = useCallback(
    (cate) => () => {
      navigate(cate);
    },
    []
  );

  const logout = () => {
    dispatch(updateCartItems(cartItems));
    dispatch(signout());
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="logo-wrapper" onClick={onClickNavigate("/")}>
        <h1>HOW ABOUT OOTD</h1>
      </div>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <div className="navbar-items">
            <NavLink to="/caregories/all">
              <div className="navbar-item" onMouseOver={() => setIsHovering(0)}>
                CATEGORY
              </div>
            </NavLink>
            <div className="navbar-item" onMouseOver={() => setIsHovering(1)}>
              BRAND
            </div>
            <div
              className="navbar-item"
              onClick={onClickNavigate("/lookbooks")}
              onMouseOver={() => setIsHovering(0)}
            >
              LOOKBOOK
            </div>
            <div
              className="navbar-item"
              onClick={onClickNavigate("/collections")}
            >
              COLLECTION
            </div>
          </div>
          <div className={`navbar-items-lg ${menuOpen ? "opened" : ""}`}>
            <div onClick={toggleMenuOpen} className="menuOpen-btn">
              <span className="menuLine"></span>
              <span className="menuLine"></span>
              <span className="menuLine"></span>
            </div>
          </div>

          <div className="navbar-items">
            <div className="navbar-item" onClick={toggleSearchOpen}>
              SEARCH
            </div>
            {user ? (
              <div className="navbar-item" onClick={logout}>
                SIGNOUT
              </div>
            ) : (
              <>
                <div
                  className="navbar-item"
                  onClick={onClickNavigate("/signin")}
                >
                  SIGNIN
                </div>
                <div
                  className="navbar-item"
                  onClick={onClickNavigate("/signup")}
                >
                  SIGNUP
                </div>
              </>
            )}
            <div className="navbar-item" onClick={onClickNavigate("/cart")}>
              CART
              {cartItems.length > 0 ? (
                <div className="navbar-item-cart-counter">
                  &nbsp;{cartItems.length}
                </div>
              ) : null}
            </div>
            <div className="navbar-item" onClick={onClickNavigate("/contact")}>
              CONTACT
            </div>
            <div className="menu-item" onClick={onClickNavigate("/orders")}>
              order
            </div>
            <div className="menu-item" onClick={onClickNavigate("/mypage")}>
              mypage
            </div>
          </div>
          <div className="navbar-items-lg">
            <div className="search-icon-wrapper" onClick={toggleSearchOpen}>
              <SearchIcon className="search-icon" />
            </div>
          </div>
        </div>
      </div>

      {isHovering ? (
        <BrandMenu
          onMouseOver={() => setIsHovering(1)}
          onMouseOut={() => setIsHovering(0)}
          setIsHovering={setIsHovering}
        />
      ) : null}
      {searchOpen && <SearchInput setSearchOpen={setSearchOpen} />}
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

export default Header;
