import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../slice/categorySlice";
import { batch } from "react-redux";
import { addCartItems } from "../slice/cartSlice";

function Layout() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    batch(() => {
      dispatch(getCategories());
      // dispatch(getProducts());
    });
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(addCartItems(cartItems));
      // dispatch(getCartItems(user._id));
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;

// function PrivateOutlet() {
//   return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/signin" />;
// }
