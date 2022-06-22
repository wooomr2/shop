import React, { useRef } from "react";

import "./collectionTile.scss";
import Tile from "./Tile";

function CollectionTile({ scrollY, numberOfPage }) {
  const refContainer = useRef(null);
  let currentPage = 0;

  const { current: elContainer } = refContainer;
  if (elContainer) {
    // clientHeight -> 본문 높이, offsetTop -> title 상단으로부터 부모상단까지 높이
    // window.innerHeight -> 사용자 브라우저 높이(* halfH는 그의 반 크기)
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percentY = // 최소: -0,5, 최대: 1.5 가짐
      Math.min(
        clientHeight + halfH, // 1.5
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;
    currentPage = percentY * numberOfPage;
    console.log("currentPage", currentPage);
    console.log("clientHeight", clientHeight);
  }

  return (
    <div
      ref={refContainer}
      className="tile-container"
      style={{ height: numberOfPage * 100 + "vh" }}
    >
      <div className="tile-background">
        <div className="work-background-wrapper">
          <div className="work-background"></div>
          <div className="work-background"></div>
        </div>
      </div>
      <div className="tile-content">
        <Tile
          page={0}
          numberOfPage={numberOfPage}
          currentPage={currentPage}
        ></Tile>
        <Tile
          page={1}
          numberOfPage={numberOfPage}
          currentPage={currentPage}
        ></Tile>
        <Tile
          page={2}
          numberOfPage={numberOfPage}
          currentPage={currentPage}
        ></Tile>
        
      </div>
    </div>
  );
}

export default CollectionTile;
