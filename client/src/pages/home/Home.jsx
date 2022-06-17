import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems } from "../../slice/cartSlice";
import Masthead from "./mastHead/Masthead";
import CollectionTile from "./tile/CollectionTile";

function Home() {
  const { cartItems } = useSelector((store) => store.cart);
  const user = sessionStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(addCartItems(cartItems));
    }
  }, []);

  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    console.log("window.scrollY", window.scrollY);
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // window.scrollY 감지
    document.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Masthead scrollY={scrollY} />
      <CollectionTile scrollY={scrollY} numberOfPage={3} />
    </>
  );
}

export default Home;
