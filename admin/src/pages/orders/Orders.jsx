import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getOrders } from "../../slice/orderSlice";

function Orders() {
  const dispatch = useDispatch();
  const { total, orders } = useSelector((store) => store.order);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getOrders(payload));
  }, [perPage, currentPage]);

  return (
    <>
      <div className="orders">
        {orders?.map((order) => (
          <div key={order._id} className="order">
            <Link to={`/orders/${order._id}`} state={order}>
              {order._id}
            </Link>
            반품요청: {order.refundRequest}
            {order.orderStatus
              .filter((status) => status.isCompleted)
              .slice(-1)
              .map((st, i) => (
                <div key={i}>{st.type}</div>
              ))}
          </div>
        ))}
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

export default Orders;
