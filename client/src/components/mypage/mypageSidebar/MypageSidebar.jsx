import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./mypageSidebar.scss";


function MypageSidebar() {
  const { pathname, search } = useLocation();
  const status = search.split("=")[1];
  const path = pathname.split("/")[2];

  return (
    <div className="mypageSidebar">
      <div className="mypageSidebar-item">
        <div className="title">쇼핑 정보</div>
        <ul className="content">
          <li>
            <NavLink
              to="/mypage/orders"
              className={`${path === "orders" && !search ? "selected" : ""}`}
            >
              주문 내역 조회
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/orders?s=refund"
              className={`${status === "refund" ? "selected" : ""}`}
            >
              취소 및 반품 요청
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/orders?s=delivered"
              className={`${status === "delivered" ? "selected" : ""}`}
            >
              배송 완료
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mypageSidebar-item">
        <div className="title">상품 리뷰</div>
        <ul className="content">
          <li>
            <NavLink
              to="/mypage/reviews"
              className={`${path === "reviews" ? "selected" : ""}`}
            >
              리뷰 내역 조회
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/reviewables"
              className={`${path === "reviewable" ? "selected" : ""}`}
            >
              리뷰 작성
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mypageSidebar-item">
        <div className="title">회원 정보</div>
        <ul className="content">
          <li>
            <NavLink
              to="/mypage/profile"
              className={`${path === "profile" ? "selected" : ""}`}
            >
              회원정보 수정
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/addresses"
              className={`${path === "addresses" ? "selected" : ""}`}
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
