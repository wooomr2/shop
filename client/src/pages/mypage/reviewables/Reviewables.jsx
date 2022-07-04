import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { getOrders } from "../../../slice/userSlice";
import publicURL from "../../../utils/publicURL";

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
    <>
      <div className="mypageItem">
        <div className="mypageItem-title">
          <h2>리뷰 가능한 상품</h2>
        </div>

        <div className="orders-content">
          {orders?.map((order) => (
            <div key={order._id} className="orders-item">
              <div className="orders-item-detail">
                {order?.items?.map((item) =>
                  item.isReviewed ? (
                    <div key={item._id}></div>
                  ) : (
                    <div key={item._id}>
                      <div className="img">
                        <img src={publicURL(item?.img)} alt="" />
                      </div>
                      <div className="paymentInfo">
                        <p>{item.name}</p>
                        <p>{item.color}</p>
                        <p>{item.size}</p>
                      </div>
                      <Link
                        to="/mypage/reviews/submit"
                        state={{
                          item:item._id,
                          order: order._id,
                          product: item._id,
                          purchasedSize: item.size,
                        }}
                      >
                        <button>리뷰작성</button>
                      </Link>
                    </div>
                  )
                )}
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

export default Reviewables;
