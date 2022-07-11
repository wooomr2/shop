import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { getReviewsByUserId } from "../../../slice/reviewSlice";
import publicURL from "../../../utils/publicURL";
import "./reviews.scss";


function Reviews() {
  const dispatch = useDispatch();
  const { total, reviews } = useSelector((store) => store.review);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getReviewsByUserId(payload));
  }, [perPage, currentPage]);

  console.log(reviews);

  return (
    <div className="reviews">
      <div className="reviews-title">
        <h2>리뷰 내역 조회</h2>
      </div>

      <div className="reviews-content">
        {reviews?.map((review) => (
          <div key={review._id} className="reviews-content-wrapper">
            <Link
              className="left"
              to={`/mypage/reviews/${review._id}`}
              state={review}
            >
              <div className="left-imgWrapper">
                <img src={publicURL(review.reviewImgs[0])} alt="" />
              </div>
              <div className="left-info">
                <p>{review.product?.brand}</p>
                <p>{review.product?.name}</p>
                <p>
                  [SIZE: {review.purchasedSize}] / [COLOR:{" "}
                  {review.product?.color}]
                </p>
              </div>
            </Link>

            <div className="right">
              <p>
                {review.bodyInfo?.height}cm / {review.bodyInfo?.weight}kg
              </p>
              <p>
                {review.comment?.length > 20
                  ? review.comment?.substring(0, 17) + "..."
                  : review.comment}
              </p>
              <p>{moment(review.createdAt).format("YYYY-MM-DD")}</p>
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

export default Reviews;
