import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

import './header.scss';
import { clearFeatures } from "../../slice/productSlice";
import { signout } from "../../slice/authSlice";
import Search from "./search/Search";
import Menu from "./menu/Menu";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const { cartItems } = useSelector((store) => store.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const onClickNavigate = useCallback((cate) => () => {
    if (cate === "/categories/all" || "/brands")
      dispatch(clearFeatures());
    navigate(cate);
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(signout());
  }, []);

  const onClickMenuOpen = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen])

  const onClickSearchOpen = useCallback(() => {
    setSearchOpen(!searchOpen);
  }, [searchOpen]);

  return (
    <div className="header-container">
      <div className="logo-wrapper" onClick={onClickNavigate("/")}>
        <h1>HOW ABOUT OOTD</h1>
      </div>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <div className="navbar-items">
            <div className="navbar-item" onClick={onClickNavigate("/categories/all")}>
              CATEGORY
            </div>
            <div className="navbar-item" onClick={onClickNavigate("/brands")}>
              BRANDS
            </div>
            <div className="navbar-item" onClick={onClickNavigate("/lookbooks")}>
              LOOKBOOK
            </div>
          </div>
          <div className={`navbar-items-lg ${menuOpen ? "opened" : ""}`}>
            <div onClick={onClickMenuOpen} className="menuOpen-btn">
              <span className="menuLine"></span>
              <span className="menuLine"></span>
              <span className="menuLine"></span>
            </div>
          </div>

          <div className="navbar-items">
            <div className="navbar-item" onClick={onClickSearchOpen}>
              SEARCH
            </div>
            {user ? (
              <div className="navbar-item" onClick={onClickLogout}>
                SIGNOUT
              </div>  
            ) : (
              <div className="navbar-item" onClick={onClickNavigate("/signin")}>
                SIGNIN
              </div>
            )}
            <div className="navbar-item" onClick={onClickNavigate("/cart")}>
              CART
              {cartItems.length > 0 ? (
                <div className="navbar-item-cart-counter">&nbsp;{cartItems.length}</div>
              ) : (
                null 
              )}
            </div>
            <div className="navbar-item" onClick={onClickNavigate("/contact")}>
              CONTACT
            </div>
          </div>
          <div className="navbar-items-lg">
            <div className="search-icon-wrapper" onClick={onClickSearchOpen}>
              <SearchIcon className="search-icon" />
            </div>
          </div>
        </div>
      </div>
      {searchOpen && <Search />}
      {menuOpen && <Menu menuOpen={menuOpen} />}
    </div>
  );
}

export default Header;