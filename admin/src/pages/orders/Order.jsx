import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrder } from "../../slice/orderSlice";
import formatDate from "../../utils/formatDate";
import moment from "moment";
import publicURL from "../../utils/publicURL";
import toKRW from "../../utils/toKRW";
import "./order.scss"

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const order = location.state;
  const orderSelects = order.orderStatus.filter((st) => !st.isCompleted);
  const [type, setType] = useState();
  const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus);

  const handleUpdate = (_id) => () => {
    const findTypeIndex = order.orderStatus.findIndex((v) => v.type === type);

    if (type) {
      order.orderStatus.forEach((st, i) => {
        if (i <= findTypeIndex && !st.isCompleted) {
          dispatch(updateOrder({ _id, paymentStatus, type: st.type }));
        }
      });
    } else {
      dispatch(updateOrder({ _id, paymentStatus, type }));
    }
    return navigate(-1);
  };

  const currentStatus = (order) => {
    const os = order?.orderStatus
      ?.filter((os) => os.isCompleted)
      .slice(-1)[0].type;

    if (order.paymentStatus === "refund") {
      return <p>반품 완료</p>;
    } else {
      if (order.refundRequest) return <p>반품 요청중</p>;

      if (os === "ordered") return <p>결제완료</p>;
      else if (os === "packed") return <p>상품 준비중</p>;
      else if (os === "shipped") return <p>배송시작</p>;
      else if (os === "delivered") return <p>배송완료</p>;
    }
  };


  return (
   <div className="content orderDetail">
      <div className="content-top">
        <div className="content-top-id">
          <p>OrdersId: {order._id}</p>
        </div>
        <button onClick={() => navigate(-1)}>목록으로</button>
      </div>

      <div className="order">
        <h2>배송 및 결제 상태</h2>

        <div className="order-wrapper">
          <div className="orderTrack">
            {order.orderStatus.map((status, i) => (
              <div
                key={status._id}
                className={`orderStatus ${status.isCompleted ? "active" : ""}`}
              >
                <div
                  className={`point ${status.isCompleted ? "active" : ""}`}
                ></div>

                <div className="orderInfo">
                  <div className="status">{status.type}</div>
                  <div className="date">{formatDate(status.date)}</div>
                </div>
              </div>
            ))}
          </div>
          {order.refundRequest === 1 && (
            <p>
              <b>해당 상품은 취소 및 반품 요청되었습니다.</b>
            </p>
          )}

          <div className="order-wrapper-bottom">
            <select onChange={(e) => setType(e.target.value)}>
              <option value={""}>order status</option>
              {orderSelects.map((status) => (
                <option key={status._id} value={status.type}>
                  {status.type}
                </option>
              ))}
            </select>

            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <option value={""} disabled>
                payment status
              </option>
              <option value="pending">pending 결제중</option>
              <option value="completed">completed 결제완료</option>
              <option value="cancelled">cancelled 반품승인</option>
              <option value="refund">refund 반품완료</option>
            </select>

            <button onClick={handleUpdate(order._id)}>confirm</button>
          </div>
        </div>
      </div>

      <div className="content-form">
        <h2>주문 정보</h2>

        <div className="item">
          <p className="item-left">주문 일자</p>
          <p>{moment(order.createdAt).format("YYYY-MM-DD")}</p>
        </div>
        <div className="item">
          <p className="item-left">주문자</p>
          <p>{order.user.username}</p>
        </div>
        <div className="item">
          <p className="item-left">주문처리상태</p>
          {currentStatus(order)}
        </div>
      </div>

      <div className="content-form">
        <h2>상품 정보</h2>

        <ul className="order-product">
          {order.items?.map((item) => (
            <li key={item._id + item.size} className="order-product-item">
              <div className="product-img">
                <img src={publicURL(item?.img)} alt="" />
              </div>
              <div className="product-info">
                <div className="product-info-left">
                  <p>
                    {item?.name}({item?.size}) X {item?.qty}
                  </p>
                  <p>주문금액</p>
                  <p>적립금</p>
                </div>
                <div className="product-info-right">
                  <p>컬러: {item?.color}</p>
                  <p>₩ {toKRW(item?.price)}</p>
                  <p>{toKRW((item?.price / 100).toFixed())} POINT</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="content-form">
        <h2>{order?.paymentStatus === "refund" ? "반품 정보" : "결제 정보"}</h2>
        <div className="item">
          <p className="item-left">총 주문금액</p>
          <p>₩ {toKRW(order.totalPrice)}</p>
        </div>
        <div className="item">
          <p className="item-left">
            {order?.paymentStatus === "refund" ? "반품 " : "사용"} 마일리지
          </p>
          <p>{toKRW(order.usedPoint)} POINT</p>
        </div>
        <div className="item">
          <p className="item-left">
            총 {order?.paymentStatus === "refund" ? "반품" : "결제"}금액
          </p>
          <p>₩ {toKRW(order.paymentPrice)}</p>
        </div>
        <div className="item">
          <p className="item-left">결제수단</p>
          <p>{order.paymentType === "card" && "카드 결제"}</p>
        </div>
        <div className="item">
          <p className="item-left">적립예정</p>
          <p>
            {order?.paymentStatus === "refund"
              ? 0
              : toKRW((order.totalPrice / 100).toFixed())}{" "}
            POINT
          </p>
        </div>
      </div>

      <div className="content-form">
        <h2>배송지 정보</h2>
        <div className="item">
          <p className="item-left">받으시는 분</p>
          <p>{order.address?.name}</p>
        </div>
        <div className="item">
          <p className="item-left">우편번호</p>
          <p>{order.address?.zonecode}</p>
        </div>
        <div className="item">
          <p className="item-left">주소</p>
          <p>{`${order.address?.address1} ${order.address?.address2}`}</p>
        </div>
        <div className="item">
          <p className="item-left">연락처</p>
          <p>{order.address?.contactNumber}</p>
        </div>
        <div className="item">
          <p className="item-left">배송메시지</p>
          <p>{order.address?.claim}</p>
        </div>
      </div>
    </div>
  );
}

export default Order;
