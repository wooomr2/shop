import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import toKRW from "../../../utils/toKRW";
import "./mypageHeader.scss";
import { Link } from "react-router-dom";

function MypageHeader() {
  const user = useSelector((store) => store.user.user);
  const orderStats = useSelector((store) => store.user.orderStats);

  return (
    <div className="mypage-top">
      <div className="mypage-top-left">
        <h1>{user?.username}님</h1>
        <Link to={`/mypage/profile`}>
        <p>
          정보 수정 <ChevronRightIcon />
        </p>
        </Link>
      </div>
      <div className="mypage-top-right">
        <ul className="userInfo">
          <li>
          <Link className="userInfo-item" to={`/mypage/orders`}>
            <span>구매 횟수</span>
            <span>{orderStats?.count}</span>
            <span>회</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
            </Link>
          </li>
          <li className="userInfo-item">
          <Link className="userInfo-item" to={`/mypage/orders`}>
            <span>구매 금액</span>
            <span>{toKRW(orderStats?.priceAmount)}</span>
            <span>원</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
            </Link>
          </li>
          <li className="userInfo-item">
          <Link className="userInfo-item" to={`/mypage/orders`}>
            <span>마일리지</span>
            <span>{toKRW(user?.point)}</span>
            <span>M</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
            </Link>
          </li>
          <li className="userInfo-item">
          <Link className="userInfo-item" to={`/mypage/orders?s=refund`}>
            <span>취소/교환/반품</span>
            <span>{orderStats?.refundCount}</span>
            <span>회</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MypageHeader;
