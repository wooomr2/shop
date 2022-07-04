import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { getReviewsByUserId } from "../../../slice/reviewSlice";
import publicURL from "../../../utils/publicURL";

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
    <>
      <div>
        {reviews?.map((review) => (
          <div key={review._id}>
            <Link to={`/mypage/reviews/${review._id}`} state={review}>
              <img
                src={publicURL(review.reviewImgs[0])}
                alt=""
                width="50"
                height="50"
              />
              <b>{review.comment}</b>
            </Link>
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

export default Reviews;
