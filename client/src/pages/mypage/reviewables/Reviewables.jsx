import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { getOrders } from "../../../slice/userSlice";
import publicURL from "../../../utils/publicURL";
import "./reviewables.scss";

function Reviewables() {
  const dispatch = useDispatch();
  const { total, orders } = useSelector((store) => store.user);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const status = "delivered";

  useEffect(() => {
    const payload = { status, perPage, currentPage };
    dispatch(getOrders(payload));
  }, [perPage, currentPage, status]);

  return (
    <div className="reviewables">
      <div className="reviewables-title">
        <h2>작성가능한 상품</h2>
      </div>

      <div className="reviewables-content">
        <p className="alarm">배송이 완료된 상품만 목록에 노출됩니다.</p>
        {orders?.map((order) => (
          <div key={order._id} className="reviewables-content-item">
            {order?.items?.map((item) =>
              item.isReviewed ? (
                <div key={item._id}></div>
              ) : (
                <div key={item._id + item.size} className="detail">
                  <div className="detail-left">
                    <div className="detail-left-imgWrapper">
                      <img src={publicURL(item?.img)} alt="" />
                    </div>
                    <div className="detail-left-paymentInfo">
                      <p>{item.brand}</p>
                      <p>{item.name}</p>
                      <p>
                        [SIZE: {item.size}] / [COLOR: {item.color}]
                      </p>
                    </div>
                  </div>

                  <div className="detail-right">
                    <Link
                      to="/mypage/reviews/submit"
                      state={{
                        item: item._id,
                        order: order._id,
                        product: item._id,
                        purchasedSize: item.size,
                      }}
                    >
                      <button>리뷰 작성</button>
                    </Link>
                  </div>
                </div>
              )
            )}
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

export default Reviewables;
