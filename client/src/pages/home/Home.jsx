import React, { useState, useCallback, useEffect } from "react";
import CollectionTile from "../../components/home/tile/CollectionTile";
import Masthead from "../../components/home/mastHead/Masthead";
import NewLookbook from "../../components/home/newLookbook/NewLookbook";
import NewArraval from "../../components/home/newArrival/NewArraval";

function Home() {
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
      <NewArraval />
      <NewLookbook />
      <CollectionTile scrollY={scrollY} numberOfPage={3} />
    </>
  );
}

export default Home;
