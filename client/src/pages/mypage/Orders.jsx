import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./orders.scss";
import { getUser, selectTotalPaymentPrice } from "../../slice/userSlice";
import Pagination from "../../components/pagination/Pagination";
import { getOrders } from "../../slice/userSlice";
import publicURL from "../../utils/publicURL";
import toKRW from "../../utils/toKRW";
import MypageLayout from "../../components/mypage/MypageLayout";
import MypageItem from "../../components/mypage/MypageItem";

function Mypage() {
  const dispatch = useDispatch();
  const { user, addresses, total, orders } = useSelector((store) => store.user);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getOrders(payload));
  }, [perPage, currentPage]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(orders, total);

  return (
    <>
      <MypageLayout>
        <MypageItem title={`주문내역조회 (${orders?.length} 건)`}>
          <div className="orders-content">
            {orders?.map((order) => (
              <div key={order._id} className="orders-item">
                <div className="orders-item-number">
                  <Link to={`/orders/${order._id}`}>
                    <p>
                      {order?._id}
                      <span>
                        <ChevronRightIcon className="icon" />
                      </span>
                    </p>
                  </Link>
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
                        {order?.items[0].color}]
                      </p>
                    )}
                    <p>배송 중</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MypageItem>
      </MypageLayout>
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
