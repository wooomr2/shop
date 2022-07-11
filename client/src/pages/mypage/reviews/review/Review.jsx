import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteReview, getReview } from "../../../../slice/reviewSlice";
import publicURL from "../../../../utils/publicURL";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import "./review.scss";

function ratingStar(rating) {
  const star = Array(5).fill().map((v, i) => {
    if (i < rating) return <StarIcon className="icon" key={i} />;
    else return <StarOutlineIcon className="icon" key={i} />;
  });

  return star;
}

function Review() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { review } = useSelector((store) => store.review);

  useEffect(() => {
    dispatch(getReview(params.id));
  }, []);

  const handleDelete = () => {
    dispatch(deleteReview(params.id));
    alert("리뷰가 삭제되었습니다.");
    navigate(`/mypage/reviews`);
  };

  return (
    <div className="review">
      <div className="review-title">
        <h2>{review.product?.name} 리뷰</h2>
      </div>

      <ul className="review-content">
        <li className="review-content-item">
          <div className="left">키</div>
          <div className="right">{review.bodyInfo?.height}cm</div>
        </li>
        <li className="review-content-item">
          <div className="left">몸무게</div>
          <div className="right">{review.bodyInfo?.weight}kg</div>
        </li>
        <li className="review-content-item">
          <div className="left">평소 상의 사이즈</div>
          <div className="right">{review.bodyInfo?.topSize}</div>
        </li>
        <li className="review-content-item">
          <div className="left">평소 하의 사이즈</div>
          <div className="right">{review.bodyInfo?.bottomSize}</div>
        </li>
        <li className="review-content-item">
          <div className="left">평소 신발 사이즈</div>
          <div className="right">{review.bodyInfo?.shoesSize}</div>
        </li>
        <li className="review-content-item">
          <div className="left">평점</div>
          <div className="right">{ratingStar(review.rating)}</div>
        </li>
        <li className="review-content-item">
          <div className="left">사진 후기</div>
          <div className="right gridImg">
            {review.reviewImgs?.map((img, i) => (
              <div className="right-imgWrapper" key={i}>
                <img src={publicURL(img)} alt="" />
              </div>
            ))}
          </div>
        </li>
        <li className="review-content-btnWrapper">
          <Link to={`/mypage/reviews/submit`} state={review}>
            <button>수정하기</button>
          </Link>
          <button onClick={handleDelete}>삭제하기</button>
        </li>
      </ul>
    </div>
  );
}

export default Review;
