import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./mypageSidebar.scss";

function MypageSidebar() {
  const { pathname, search } = useLocation();
  const status = search.split("=")[1];

  return (
    <div className="mypageSidebar">
      <div className="mypageSidebar-item">
        <div className="title">쇼핑정보</div>
        <ul className="content">
          <li>
            <NavLink
              to="/mypage/orders"
              className={`${pathname === "/mypage/orders" && !search ? "selected" : ""}`}
            >
              주문내역
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/orders?s=refund"
              className={`${status === "refund" ? "selected" : ""}`}
            >
              반품요청
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/orders?s=delivered"
              className={`${status === "delivered" ? "selected" : ""}`}
            >
              배송완료
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mypageSidebar-item">
        <div className="title">상품리뷰</div>
        <ul className="content">
          <li>
            <NavLink
              to="/mypage/reviewables"
              className={`${
                pathname === "/mypage/reviewables" ? "selected" : ""
              }`}
            >
              리뷰작성
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/reviews"
              className={`${
                pathname === "/mypage/reviews" ? "selected" : ""
              }`}
            >
              작성한 리뷰
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mypageSidebar-item">
        <div className="title">회원정보</div>
        <ul className="content">
          <li>
            <NavLink
              to="/mypage/profile"
              className={`${pathname === "/mypage/profile" ? "selected" : ""}`}
            >
              회원정보 수정
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/addresses"
              className={`${
                pathname === "/mypage/addresses" ? "selected" : ""
              }`}
            >
              배송지 관리
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MypageSidebar;
