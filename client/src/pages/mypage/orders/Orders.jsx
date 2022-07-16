import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { getOrders, refundRequest } from "../../../slice/userSlice";
import publicURL from "../../../utils/publicURL";
import toKRW from "../../../utils/toKRW";
import "./orders.scss";

function Mypage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { total, orders } = useSelector((store) => store.user);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const status = location.search.split("=")[1];

  useEffect(() => {
    const payload = { status, perPage, currentPage };

    dispatch(getOrders(payload));
  }, [perPage, currentPage, status]);

  const currentStatus = (order) => {
    const os = order?.orderStatus?.filter((os) => os.isCompleted).slice(-1)[0].type;

    if (status === "delivered") {
      return <p>배송완료</p>;
    } else if (status === "refund") {
      return (
        <p>
          {order?.paymentStatus === "completed"
            ? "반품 요청중"
            : "반품완료"}
        </p>);
    } else {
      if (order.paymentStatus === "refund") {
        return <p>반품 완료</p>;
      } else {
        if (order.refundRequest) return <p>반품 요청중</p>

        if (os === "ordered") return <p>결제완료</p>;
        else if (os === "packed") return <p>상품 준비중</p>;
        else if (os === "shipped") return <p>배송시작</p>;
        else if (os === "delivered") return <p>배송완료</p>;
      }
    }
  };

  const refund = (order) => () => {
    if (window.confirm("정말 반품 및 취소 요청하시겠습니까?")) {
      if (order.refundRequest)
        return alert("이미 반품 및 취소 요청하셨습니다.");
      return dispatch(refundRequest(order._id));
    }
    return;
  };


  return (
    <>
      <div className="orders">
        <div className="orders-title">
          <h2>주문내역조회</h2>
        </div>

        <div className="orders-content">
          {orders?.map((order) => (
            <div key={order._id} className="orders-item">
              <div
                className="orders-item-number"
                onClick={() => navigate(`/mypage/orders/${order._id}`)}
              >
                <p>
                  {order?._id}
                  <span>
                    <ChevronRightIcon className="icon" />
                  </span>
                </p>
              </div>
              <div className="orders-item-detail">
                <div className="left">
                  <div className="img">
                    <img
                      src={order?.items && publicURL(order?.items[0]?.img)}
                      alt=""
                    />
                  </div>
                  <div className="paymentInfo">
                    <p>
                      {order?.items && order?.items[0]?.name}{" "}
                      {order?.items?.length > 1 &&
                        "외 " + (order?.items?.length - 1) + "건"}
                    </p>
                    <p>₩ {toKRW(order?.paymentPrice)}</p>

                    {order?.items && (
                      <p>
                        [옵션: {order?.items[0]?.size}] / [컬러:{" "}
                        {order?.items[0]?.color}]
                      </p>
                    )}

                    {currentStatus(order)}
                  </div>
                </div>

                <div className="right">
                  {!status && (
                    <button onClick={refund(order)}>
                      {currentStatus(order?.orderStatus) === "배송완료"
                        ? "반품 요청"
                        : "취소 요청"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Mypage;
