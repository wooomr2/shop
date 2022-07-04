import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteReview, getReview } from "../../../../slice/reviewSlice";

function Review() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();

  const { review } = useSelector((store) => store.review);

  useEffect(() => {
    dispatch(getReview(params.id));
  }, []);

  const handleDelete = ()=> {
    dispatch(deleteReview(params.id))
    alert("리뷰삭제")
    navigate(`/mypage/reviews`)
  }

  return (
    <div>
      Review
      <Link to={`/mypage/reviews/submit`} state={review}>
        <button>수정하기</button>
      </Link>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
}

export default Review;
