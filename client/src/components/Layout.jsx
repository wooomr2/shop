import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../slice/categorySlice";
import { batch } from "react-redux";
import { addCartItems } from "../slice/cartSlice";
import { getBrands } from "../slice/brandSlice";

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
    </>
  );
}

export default Layout;
