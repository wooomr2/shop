import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const [menuOpen, toggleMenuOpen, setMenuOpen] = useToggle(false);
  const [searchOpen, toggleSearchOpen, setSearchOpen] = useToggle(false);
  const [isHovering, setIsHovering] = useState(0);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const logout = () => {
    dispatch(updateCartItems(cartItems));
    dispatch(signout());
    navigate("/");
  };

  return (
    <div className="header-container" onMouseEnter={() => setIsHovering(0)}>
      <Link to={`/`}> 
        <div className="logo-wrapper">
          <h1>HOW ABOUT OOTD</h1>
        </div>
      </Link>

      <div className="navbar-container">
        <div className="navbar-wrapper">
          <div className="navbar-items">
            <NavLink to={`/categories/all`} onMouseOver={() => setIsHovering(0)}>
              <div className="navbar-item">CATEGORY</div>
            </NavLink>
            <div className="navbar-item" onMouseOver={() => setIsHovering(1)}>
              BRAND
            </div>
            <NavLink to={`/lookbooks`} onMouseOver={() => setIsHovering(0)}>
              <div className="navbar-item">LOOKBOOK</div>
            </NavLink>
            <NavLink to={`/collections`} onMouseOver={() => setIsHovering(0)}>
              <div className="navbar-item">COLLECTION</div>
            </NavLink>
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
              <NavLink to={`/signin`}>
                <div className="navbar-item">SIGNIN</div>
              </NavLink>
              <NavLink to={`/signup`}>
                <div className="navbar-item">SIGNUP</div>
              </NavLink>
              </>
            )}

            <NavLink to={`/cart`}>
              <div className="navbar-item">
                CART
                {cartItems.length > 0 ? (
                  <div className="navbar-item-cart-counter">
                    &nbsp;{cartItems.length}
                  </div>
                ) : null}
              </div>
            </NavLink>

            <NavLink to={`/contact`}>
                <div className="navbar-item">CONTACT</div>
            </NavLink>
            <NavLink to={`/orders`}>
              <div className="navbar-item">ORDER</div>
            </NavLink>
            <NavLink to={`/mypage`}>
              <div className="navbar-item">MYPAGE</div>
            </NavLink>
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

      {searchOpen ? <SearchInput setSearchOpen={setSearchOpen} /> : null}
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

export default Header;
