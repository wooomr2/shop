import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import "./layout.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../slice/categorySlice";
import { getProducts } from "../slice/productSlice";
import { batch } from "react-redux";
import { isUserLoggedIn } from "../slice/authSlice";
import { getScreens } from "../slice/screenSlice";
import { getBrands } from "../slice/brandSlice";
import { getLookbooks } from "../slice/lookbookSlice";


function Layout() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (!token) {
    //   dispatch(isUserLoggedIn());
    // }
    if (token) {
      batch(() => {
        dispatch(getCategories());
        dispatch(getProducts());
        dispatch(getScreens());
        dispatch(getBrands());
        dispatch(getLookbooks());
      });
    }
  }, [token, dispatch]);

  return token ? (
    // return (
    <div className="layout">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
}

export default Layout;

// function PrivateOutlet() {
//   return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/signin" />;
// }
