import React, { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import MypageHeader from "../../components/mypage/mypageHeader/MypageHeader";
import MypageSidebar from "../../components/mypage/mypageSidebar/MypageSidebar";
import { getOrderStats, getUser } from "../../slice/userSlice";
import "./mypage.scss";

function Mypage() {
  const dispatch = useDispatch();
  useEffect(() => {
    batch(() => {
      dispatch(getUser());
      dispatch(getOrderStats());
    });
  }, []);

  return (
    <div className="mypage">
      <MypageHeader />
      <div className="mypage-bottom">
        <div className="mypage-bottom-left">
          <MypageSidebar />
        </div>
        <div className="mypage-bottom-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Mypage;
