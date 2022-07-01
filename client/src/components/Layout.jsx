import { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getBrands } from "../slice/brandSlice";
import { getCategories } from "../slice/categorySlice";
import Chat from "./chat/Chat";
import Header from "./header/Header";

function Layout() {
  const dispatch = useDispatch();
  const user = sessionStorage.getItem("user");

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
      {user && <Chat />}
    </>
  );
}

export default Layout;
