import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../slice/orderSlice";

function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  const [type, setType] = useState("");

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="orders">
      {orders?.map((order) => (
        <div key={order._id} className="order">
          <Link to={`/orders/${order._id}`} state={order}>
            {order._id}
          </Link>
          </div>
      ))};
    </div>
  );
}

export default Orders;
