import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./mypageSidebar.scss";

function MypageSidebar() {
  const { pathname } = useLocation();

  return (
    <div className="mypageSidebar">
      <div className="mypageSidebar-item">
        <div className="title">쇼핑정보</div>
        <ul className="content">
          <li>
            <NavLink
              to="/orders"
              className={`${pathname === "/orders" ? "selected" : ""}`}
            >
              주문내역조회
            </NavLink>
          </li>
          <li>
            <span>취소/반품/교환 내역</span>
          </li>
          <li>
            <span>상품리뷰</span>
          </li>
        </ul>
      </div>
      <div className="mypageSidebar-item">
        <div className="title">회원혜택</div>
        <ul className="content">
          <li>
            <span>마일리지</span>
          </li>
        </ul>
      </div>
      <div className="mypageSidebar-item">
        <div className="title">회원정보</div>
        <ul className="content">
          <li>
            <NavLink to="/profile" className={`${pathname === "/profile" ? "selected" : ""}`}>
              회원정보 수정
            </NavLink>
          </li>
          <li>
            <NavLink to="/addresses" className={`${pathname === "/addresses" ? "selected" : ""}`}>
              배송지 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MypageSidebar;
