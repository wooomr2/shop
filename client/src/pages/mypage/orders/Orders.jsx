import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { getOrders } from "../../../slice/userSlice";
import publicURL from "../../../utils/publicURL";
import "./orders.scss";

function Mypage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { total, orders } = useSelector((store) => store.user);
  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const status = location.search.split("=")[1];

  useEffect(() => {
    const payload = { status, perPage, currentPage };

    dispatch(getOrders(payload));
  }, [perPage, currentPage, status]);

  return (
    <>
      <div className="mypageItem">
        <div className="mypageItem-title">
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
                  <p>₩ {order?.paymentPrice}</p>
                  {order?.items && (
                    <p>
                      [옵션: {order?.items[0]?.size}] / [컬러:{" "}
                      {order?.items[0]?.color}]
                    </p>
                  )}

                  {!status && (
                    <p>
                      {
                        order?.orderStatus
                          .filter((os) => os.isCompleted)
                          .slice(-1)[0].type
                      }
                    </p>
                  )}
                  {status === "refund" && (
                    <p>{order?.paymentStatus === "completed" ? "반품 요청 중" : ""}</p>
                  )}
                  {status === "delivered" && <p>배송완료</p>}
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
