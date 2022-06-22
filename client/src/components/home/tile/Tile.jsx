import React, { useRef } from "react";

import "./tile.scss";

function Tile({ page, currentPage, numberOfPage }) {
  const refContainer = useRef(null);
  const progress = Math.max(0, currentPage - page);

  // progress는 해당 컴포넌트가 브라우저의 반을 차지하기 시작하면서 양수
  // 0.25 -> 즉, 컴포넌트를 브라우저 반에서 8% 정도 올리면 opacity는 1이 됨
  let opacity = Math.min(1, Math.max(0, progress * 4));
  // 0.85 -> 컴포넌트를 28% 정도 올리면서부터 사라짐
  if (progress > 0.85 && page < numberOfPage - 1) {
    // 1이 되면 컴포넌트가 브라우저의 전체를 자치하므로 투명도는 0이 되고 그 다음 컴포넌트가 보이기 시작
    opacity = Math.max(0, (1.0 - progress) * 4);
  }

  let translateY = Math.max(0, 50 - progress * 3 * 50);
  if (progress > 0.85) translateY = Math.max(-50, -(progress - 0.85) * 2 * 50);

  return (
    <div
      ref={refContainer}
      className="tile"
      style={{
        pointerEvents: progress <= 0 || progress >= 1 ? "none" : undefined,
        opacity,
      }}
    >
      <div className="tile-item">
        <div
          className="tile-item-left"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <div>
            <div className="brandName">NANAMICA</div>
            <div className="brandInfo">2022 SPRING/SUMMER</div>
          </div>
        </div>
        <div
          className="tile-item-right"
        >
          <div className="tile-item-imgWrapper">
            <img src={`/assets/looks/Look${page}.jpg`} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
