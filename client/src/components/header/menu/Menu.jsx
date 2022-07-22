import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import { signout } from "../../../slice/authSlice";
import "./menu.scss";
import MobileBrandMenu from "./mobileBrandMenu/MobileBrandMenu";

function Menu({ menuOpen, setMenuOpen }) {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const { pathname } = useLocation();
  const [brandsMenu, toggleBrandsMenu, setBrandsMenu] = useToggle(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const logout = () => {
    dispatch(signout());
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  useEffect(() => {
    if (menuOpen && windowWidth < 1024) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [menuOpen, windowWidth]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className={`menu-container ${menuOpen ? "menuOpen" : ""}`}>
      <div className="menu-items">
        <NavLink
          to="/categories/all"
          className="menu-item"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          SHOPPING
        </NavLink>
        <div className="menu-item" onClick={() => toggleBrandsMenu()}>
          BRAND
        </div>
        <NavLink
          to="/lookbooks"
          className="menu-item"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          LOOKBOOK
        </NavLink>
        <NavLink
          to="/collections"
          className="menu-item"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          COLLECTION
        </NavLink>
      </div>

      <div className="menu-items">
        <NavLink
          to="/contact"
          className="menu-item"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          CONTACT
        </NavLink>
        <NavLink
          to="/cart"
          className="menu-item"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          CART
        </NavLink>

        {user ? (
          <>
            <NavLink
              to="/mypage/orders"
              className="menu-item"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              MYPAGE
            </NavLink>
            <div className="menu-item" onClick={logout}>
              SIGNOUT
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/signin"
              className="menu-item"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              SIGNIN
            </NavLink>
            <NavLink
              to="/signup"
              className="menu-item"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              SIGNUP
            </NavLink>
          </>
        )}
      </div>

      <MobileBrandMenu
        brandsMenu={brandsMenu}
        toggleBrandsMenu={toggleBrandsMenu}
        setMenuOpen={setMenuOpen}
      />
    </div>
  );
}

export default Menu;
