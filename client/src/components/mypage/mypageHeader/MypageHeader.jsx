import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import toKRW from "../../../utils/toKRW";
import "./mypageHeader.scss";

function MypageHeader() {
  const user = useSelector((store) => store.user.user);
  const orderStats = useSelector((store) => store.user.orderStats);

  return (
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
            <span>{orderStats?.count}</span>
            <span>회</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
          </li>
          <li className="userInfo-item">
            <span>구매 금액</span>
            <span>{toKRW(orderStats?.priceAmount)}</span>
            <span>원</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
          </li>
          <li className="userInfo-item">
            <span>마일리지</span>
            <span>{toKRW(user?.point)}</span>
            <span>M</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
          </li>
          <li className="userInfo-item">
            <span>취소/교환/반품</span>
            <span>{orderStats?.refundCount}</span>
            <span>회</span>
            <span>
              <ChevronRightIcon className="icon" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MypageHeader;
