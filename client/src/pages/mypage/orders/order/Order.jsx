import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder } from "../../../../slice/userSlice";
import publicURL from "../../../../utils/publicURL";
import toKRW from "../../../../utils/toKRW";
import "./order.scss";
import moment from "moment";

function OrderItem({ title, children }) {
  return (
    <div className="mypageItem">
      <div className="mypageItem-title">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Order() {
  const params = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getOrder(params.id));
  }, [params]);

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
    <div className="order">
      <OrderItem title={"주문 정보"}>
        <div className="order-wrapper">
          <div className="order-wrapper-item">
            <p>주문번호</p>
            <p>{order._id}</p>
          </div>
          <div className="order-wrapper-item">
            <p>주문일자</p>
            <p>{moment(order.createdAt).format("YYYY-MM-DD")}</p>
          </div>
          <div className="order-wrapper-item">
            <p>주문자</p>
            <p>{order.user?.username}</p>
          </div>
          <div className="order-wrapper-item">
            <p>주문처리상태</p>
            {currentStatus(order)}
          </div>
        </div>
      </OrderItem>

      <OrderItem title={"주문 상품 정보"}>
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
      </OrderItem>

      <OrderItem
        title={order?.paymentStatus === "refund" ? "반품 정보" : "결제 정보"}
      >
        <div className="order-wrapper">
          <div className="order-wrapper-item">
            <p>총 주문금액</p>
            <p>₩ {toKRW(order.totalPrice)}</p>
          </div>
          <div className="order-wrapper-item">
            <p>{order?.paymentStatus === "refund" ? "환급" : "사용"} 마일리지</p>
            <p>{order.usedPoint ? toKRW(order.usedPoint) : 0} POINT</p>
          </div>
          <div className="order-wrapper-item">
            <p>총 {order?.paymentStatus === "refund" ? "반품" : "결제"}금액</p>
            <p>₩ {toKRW(order.paymentPrice)}</p>
          </div>
          <div className="order-wrapper-item">
            <p>결제수단</p>
            <p>{order.paymentType === "card" && "카드 결제"}</p>
          </div>
          <div className="order-wrapper-item">
            <p>적립예정</p>
            <p>
              {order?.paymentStatus === "refund"
                ? 0
                : toKRW((order.totalPrice / 100).toFixed())}{" "}
              POINT
            </p>
          </div>
        </div>
      </OrderItem>

      <OrderItem title={"배송지 정보"}>
        <div className="order-wrapper">
          <div className="order-wrapper-item">
            <p>받으시는 분</p>
            <p>{order.address?.name}</p>
          </div>
          <div className="order-wrapper-item">
            <p>우편번호</p>
            <p>{order.address?.zonecode}</p>
          </div>
          <div className="order-wrapper-item">
            <p>주소</p>
            <p>{`${order.address?.address1} ${order.address?.address2}`}</p>
          </div>
          <div className="order-wrapper-item">
            <p>연락처</p>
            <p>{order.address?.contactNumber}</p>
          </div>
          <div className="order-wrapper-item">
            <p>배송메시지</p>
            <p>{order.address?.claim}</p>
          </div>
        </div>
      </OrderItem>
    </div>
  );
}

export default Order;
