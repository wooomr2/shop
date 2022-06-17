import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../slice/userSlice";
import publicURL from "../../utils/publicURL";

function Orders() {
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { orders } = useSelector((store) => store.user);
  
  useEffect(() => {
    dispatch(getOrders(user._id));
  }, []);

  return (
    <div>
      {orders?.map((order) => (
        <div key={order._id}>
          <p>{order._id}</p>
          <div style={{display:"flex"}}>
            {order.items.map((item) => (
              <div key={item._id}>
                <Link to={`/orders/${order._id}`}>
                  <div>
                    <img
                      src={publicURL(item.product.productImgs[0].fileName)}
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
  );
}

export default Orders;
