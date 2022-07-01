import React from "react";

import "./mypageItem.scss";

function MypageItem({ title, children }) {
  return (
    <div className="mypageItem">
      <div className="mypageItem-title">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default MypageItem;
