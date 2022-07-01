import React from "react";
import { Outlet } from "react-router-dom";
import MypageHeader from "../../components/mypage/mypageHeader/MypageHeader";
import MypageSidebar from "../../components/mypage/mypageSidebar/MypageSidebar";

function Mypage() {
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
