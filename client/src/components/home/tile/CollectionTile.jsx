import React, { useEffect, useRef } from "react";
import Tile from "./Tile";
import "./collectionTile.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCollections } from "../../../slice/collectionSlice";

function CollectionTile({ scrollY, numberOfPage }) {
  const refContainer = useRef(null);
  let currentPage = 0;
  const dispatch = useDispatch();
  const { collections } = useSelector((store) => store.collection);

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
  }

  useEffect(() => {
    dispatch(getCollections({ perPage: 3, currentPage: 1 }));
  }, []);

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
        {collections?.map((collection, i) => (
          <Tile
            key={collection._id}
            collection={collection}
            page={i}
            numberOfPage={numberOfPage}
            currentPage={currentPage}
          />
        ))}
      </div>
    </div>
  );
}

export default CollectionTile;
