import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { getReviewsByProductId } from "../../slice/reviewSlice";
import publicURL from "../../utils/publicURL";
import Pagination from "../pagination/Pagination";
import "./reviewList.scss";
import ReviewModal from "./reviewModal/ReviewModal";


function ratingStar(rating) {
  const star = Array(5)
    .fill()
    .map((v, i) => {
      if (i < rating) return <StarIcon key={i} className="icon" />;
      else return <StarOutlineIcon key={i} className="icon" />;
    });

  return star;
}

function ratingComment(rating) {
  if (rating === 1) return "별로에요";
  else if (rating === 2) return "그냥 그래요";
  else if (rating === 3) return "보통이에요";
  else if (rating === 4) return "맘에 들어요";
  else return "아주 좋아요";
}

function ReviewList() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewImgIndex, setReviewImgIndex] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();
  const pid = params.id;
  const { total, reviews } = useSelector((store) => store.review);
  const { ratings } = useSelector((store) => store.product.product);
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, toggleModalOpen] = useToggle(false);

  useEffect(() => {
    const payload = { pid, perPage, currentPage };
    dispatch(getReviewsByProductId(payload));
  }, [pid, perPage, currentPage]);

  return (
    <>
      {modalOpen && (
        <ReviewModal
          reviews={reviews}
          modalOpen={modalOpen}
          toggleModalOpen={toggleModalOpen}
          reviewIndex={reviewIndex}
          reviewImgIndex={reviewImgIndex}
          setReviewIndex={setReviewIndex}
          setReviewImgIndex={setReviewImgIndex}
        />
      )}
      <div className="reviewList">
        <div className="reviewList-title">
          <h2>REVIEWS</h2>
        </div>

        <div className="reviewList-content">
          <div className="reviewList-content-avg">
            <p>
              리뷰 수 {ratings?.total} / 평균 평점{" "}
              {ratingStar(ratings?.avg?.toFixed())}
            </p>
          </div>

          <div className="reviewList-content-detail">
            {reviews?.length > 0 &&
              reviews?.map((review, i) => (
                <div key={review._id} className="detailWrapper">
                  <div className="detailWrapper-left">
                    <div className="detailWrapper-left-top">
                      <p>
                        {ratingStar(review.rating)}{" "}
                        {ratingComment(review.rating)}
                      </p>
                      <p>{moment(review.createdAt).format("YYYY.MM.DD")}</p>
                    </div>

                    <p className="detailWrapper-left-comment">
                      {review.comment}
                    </p>

                    <div className="detailWrapper-left-img">
                      {review.reviewImgs?.slice(0, 4).map((img, _i) => (
                        <div
                          key={img}
                          className="detailWrapper-left-img-wrapper"
                          onClick={() => {
                            toggleModalOpen();
                            setReviewIndex(i);
                            setReviewImgIndex(_i);
                          }}
                        >
                          <img src={publicURL(img)} alt="" />
                        </div>
                      ))}
                      {review.reviewImgs?.length > 4 && (
                        <div className="detailWrapper-left-img-more">. . .</div>
                      )}
                    </div>
                  </div>

                  <div className="detailWrapper-userInfo">
                    <p>리뷰어 사이즈</p>
                    <p>
                      {review.bodyInfo?.height}cm / {review.bodyInfo?.weight}kg
                    </p>
                    <p>평소 사이즈-상의 {review.bodyInfo?.topSize}</p>
                    <p>평소 사이즈-하의 {review.bodyInfo?.bottomSize}</p>
                    <p>평소 사이즈-신발 {review.bodyInfo?.shoesSize}</p>
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
      </div>
    </>
  );
}

export default ReviewList;
