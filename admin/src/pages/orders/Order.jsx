import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrder } from "../../slice/orderSlice";
import formatDate from "../../utils/formatDate";
import "./order.css";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const order = location.state;
  const orderSelects = useMemo(
    () => order.orderStatus.filter((st) => !st.isCompleted),
    [order]
  );
  const [type, setType] = useState("");

  const handleUpdate = (_id) => () => {
    dispatch(updateOrder({ _id, type }));
    navigate(-1);
  };

  return (
    <div className="order">
      <div className="orderTrack-wrapper">
        <div className="orderTrack">
          {order.orderStatus.map((status) => (
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

        <div className="orderSelect">
          <select onChange={(e) => setType(e.target.value)}>
            <option value={""}>select status</option>
            {orderSelects.map((status) => (
              <option key={status._id} value={status.type}>
                {status.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={handleUpdate(order._id)}>confirm</button>
        </div>
      </div>

      {JSON.stringify(order)}
    </div>
  );
}

export default Order;
