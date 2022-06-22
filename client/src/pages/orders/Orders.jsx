import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getOrders } from "../../slice/userSlice";
import publicURL from "../../utils/publicURL";

function Orders() {
  const dispatch = useDispatch();
  const { total, orders } = useSelector((store) => store.user);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getOrders(payload));
  }, [perPage, currentPage]);

  console.log(orders);

  return (
    <div>
      <div>
        {orders?.map((order) => (
          <div key={order._id}>
            <p>주문 번호: {order._id}</p>
            <div style={{ display: "flex" }}>
              {order.items.map((item, i) => (
                <div key={i}>
                  <Link to={`/orders/${order._id}`}>
                    <div>
                      <img
                        src={publicURL(item.img)}
                        alt=""
                        width="50"
                        height="50"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
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
