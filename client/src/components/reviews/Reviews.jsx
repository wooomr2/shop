import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviews } from "../../slice/reviewSlice";

function Reviews() {
  const dispatch = useDispatch();
  const params = useParams();
  const { reviews } = useSelector((store) => store.review);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    dispatch(getReviews(params.id));
  }, [params]);

  console.log(reviews);

  return (
    <div>
      <h1>리뷰</h1>
      {reviews?.length>0 && reviews?.map((review) => (
        <div key={review._id}>
          <p>유저네임: {review.username}</p>
          <p>별점: {review.rating}</p>
          <p>리뷰: {review.comment}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
