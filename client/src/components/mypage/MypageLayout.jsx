import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./mypageLayout.scss";
import { getUser, selectTotalPaymentPrice } from "../../slice/userSlice";
import toKRW from "../../utils/toKRW";
import MypageSidebar from "./MypageSidebar";

function MypageLayout({ children }) {
  const dispatch = useDispatch();
  const { user, addresses, total, orders } = useSelector((store) => store.user);
  const totalPrice = useSelector(selectTotalPaymentPrice);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log({ user, addresses });
  console.log("user?.orders?.length", user?.orders?.length);

  return (
    <div className="mypage">
      <div className="mypage-top">
        <div className="mypage-top-left">
          <h1>{user?.username}님</h1>
          <p>
            정보 수정 <ChevronRightIcon />
          </p>
        </div>
        <div className="mypage-top-right">
          <ul className="userInfo">
            <li className="userInfo-item">
              <span>구매 횟수</span>
              <span>{orders?.length}</span>
              <span>회</span>
              <span>
                <ChevronRightIcon className="icon" />
              </span>
            </li>
            <li className="userInfo-item">
              <span>구매 금액</span>
              <span>{toKRW(totalPrice)}</span>
              <span>원</span>
              <span>
                <ChevronRightIcon className="icon" />
              </span>
            </li>
            <li className="userInfo-item">
              <span>마일리지</span>
              <span>{toKRW(user.point)}</span>
              <span>M</span>
              <span>
                <ChevronRightIcon className="icon" />
              </span>
            </li>
            <li className="userInfo-item">
              <span>취소/교환/반품</span>
              <span>0</span>
              <span>회</span>
              <span>
                <ChevronRightIcon className="icon" />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mypage-bottom">
        <div className="mypage-bottom-left">
          <MypageSidebar />
        </div>
        <div className="mypage-bottom-right">{children}</div>
      </div>
    </div>
  );
}

export default MypageLayout;
