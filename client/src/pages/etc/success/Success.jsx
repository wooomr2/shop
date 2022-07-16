import { NavLink } from "react-router-dom";
import "./success.scss";

function Success() {
  return (
    <div className="success">
      <h1 className="success-comment">
        HOW ABOUT OOTD<br />를 이용해주셔서 감사합니다
      </h1>
      <NavLink to="/mypage/orders" className="success-btn">
        <div>주문내역 보러가기</div>
      </NavLink>
    </div>
  );
}

export default Success;
