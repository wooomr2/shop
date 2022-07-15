import React, { useCallback, useEffect, useState } from "react";
import Chat from "../../components/chat/Chat";
import Masthead from "../../components/home/mastHead/Masthead";
import NewArraval from "../../components/home/newArrival/NewArraval";
import NewLookbook from "../../components/home/newLookbook/NewLookbook";
import Scrollable from "../../components/home/scrollable/Scrollable";
import CollectionTile from "../../components/home/tile/CollectionTile";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleScroll = useCallback(() => {
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
      <NewArraval />
      <NewLookbook />
      <CollectionTile scrollY={scrollY} numberOfPage={3} />
      <Scrollable scrollY={scrollY} />
      {user && <Chat />}
    </>
  );
}

export default Home;
