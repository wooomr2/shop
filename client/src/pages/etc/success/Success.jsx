import { Link } from "react-router-dom";

function Success() {
  return (
    <div>
      <div>!!!!!!!!!!!결제성공!!!!!!!!!!!!!!!!</div>
      <Link to="/mypage/orders">
        <div>주문내역 보러가기</div>
      </Link>
    </div>
  );
}

export default Success;
