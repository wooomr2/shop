import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsByProductId } from "../../slice/reviewSlice";
import Pagination from "../pagination/Pagination";

function ReviewList() {
  const dispatch = useDispatch();
  const params = useParams();
  const pid = params.id;
  const { total, reviews } = useSelector((store) => store.review);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { pid, perPage, currentPage };
    dispatch(getReviewsByProductId(payload));
  }, [pid, perPage, currentPage]);

  console.log(reviews);

  return (
    <div>
      <h1>리뷰</h1>
      {reviews?.length > 0 &&
        reviews?.map((review) => (
          <div key={review._id}>
            <p>유저네임: {review.username}</p>
            <p>별점: {review.rating}</p>
            <p>리뷰: {review.comment}</p>
            <hr />
          </div>
        ))}

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ReviewList;
