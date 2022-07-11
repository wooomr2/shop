import { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getBrands } from "../slice/brandSlice";
import { getCategories } from "../slice/categorySlice";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(getCategories());
      dispatch(getBrands());
    });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
