import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getOrders } from "../../slice/orderSlice";

function Orders() {
  const dispatch = useDispatch();
  const { total, orders } = useSelector((store) => store.order);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getOrders(payload));
  }, [perPage, currentPage]);

  return (
    <div className="list">
      <div className="list-btn">
        <h2>OUR ORDERS</h2>
      </div>

      <table className="list-table">
        <thead>
          <tr className="thead-tr">
            <th>ID</th>
            <th>주문자</th>
            <th>결제수단</th>
            <th>반품요청</th>
            <th>배송상태</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id} className="tbody-tr">
              <td className="tbody-tr-name">
                <Link
                  to={`/orders/${order._id}`}
                  state={order}
                  className="navi"
                >
                  {order._id}
                </Link>
              </td>
              <td>{order.user?.username}</td>
              <td>{order.paymentType}</td>
              <td>{order.refundRequest ? "요청" : ""}</td>
              <td>
                {currentStatus(order)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Orders;
