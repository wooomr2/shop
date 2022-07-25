import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { upsertReview } from "../../../../slice/reviewSlice";
import publicURL from "../../../../utils/publicURL";
import "./reviewForm.scss";


const ratingComments = [
  "아주 좋아요",
  "맘에 들어요",
  "보통이에요",
  "그냥 그래요",
  "별로에요",
];
const topSizeSelection = ["XS", "S", "M", "L", "XL"];
const bottomSelection = Array(16)
  .fill()
  .map((arr, i) => i + 23);
const shoesSelection = Array(18)
  .fill()
  .map((arr, i) => i * 5 + 220);

function ReviewForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const review = location.state;
  const user = JSON.parse(localStorage.getItem("user"));

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [topSize, setTopSize] = useState("");
  const [bottomSize, setBottomSize] = useState("");
  const [shoesSize, setShoesSize] = useState("");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [reviewImgs, setReviewImgs] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    setHeight(review.bodyInfo?.height || "");
    setWeight(review.bodyInfo?.weight || "");
    setTopSize(review.bodyInfo?.topSize || "");
    setBottomSize(review.bodyInfo?.bottomSize || "");
    setShoesSize(review.bodyInfo?.shoesSize || "");
    setComment(review.comment || "");
    setRating(review.rating || "");
    setReviewImgs(review.reviewImgs || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewImgs.length === 0) return alert("파일없음");

    const form = new FormData();
    form.append("_id", review._id);
    form.append("order", review.order);
    form.append("product", review.product);
    form.append("purchasedSize", review.purchasedSize);
    form.append("user", user._id);
    form.append("username", user.username);

    form.append("height", height);
    form.append("weight", weight);
    form.append("topSize", topSize);
    form.append("bottomSize", bottomSize);
    form.append("shoesSize", shoesSize);
    form.append("comment", comment);
    form.append("rating", rating);

    for (let img of reviewImgs) {
      form.append("reviewImgs", img);
    }

    dispatch(upsertReview(form));
  };

  const handleReviewImgs = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setReviewImgs(files);
  };

  return (
    <div className="reviewForm">
      <div className="reviewForm-title">
        <h2>리뷰 작성</h2>
      </div>

      <form onSubmit={handleSubmit} className="reviewForm-form">
        <div className="form-item">
          <label htmlFor="height" className="form-item-left">
            키
          </label>
          <input
            placeholder="키 입력"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="weight" className="form-item-left">
            몸무게
          </label>
          <input
            id="weight"
            placeholder="몸무게"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="topSize" className="form-item-left">
            평소 상의 사이즈
          </label>
          <div className="button-wrapper">
            {topSizeSelection.map((v, i) => (
              <button
                key={v}
                type="button"
                onClick={(e) => setTopSize(v)}
                className={`${topSize === v ? "selected" : ""}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="bottomSize" className="form-item-left">
            평소 하의 사이즈
          </label>
          <select
            className="form-item-select"
            onChange={(e) => setBottomSize(e.target.value)}
          >
            <option defaultValue hidden className="selection">
              {bottomSize || "하의 사이즈"}
            </option>
            {bottomSelection.map((v, i) => (
              <option value={v} key={i}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="shoesSize" className="form-item-left">
            평소 신발 사이즈
          </label>
          <select
            className="form-item-select"
            onChange={(e) => setShoesSize(e.target.value)}
          >
            <option defaultValue hidden className="selection">
              {shoesSize || "신발 사이즈"}
            </option>
            {shoesSelection.map((v, i) => (
              <option value={v} key={i}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="rating" className="form-item-left">
            평점
          </label>
          <select
            className="form-item-select"
            onChange={(e) => setRating(e.target.value)}
          >
            <option defaultValue hidden className="selection">
              {ratingComments.filter((v, i) => i === rating) || "평점"}
            </option>
            {ratingComments.map((comment, i) => (
              <option value={5 - i} key={i}>
                {comment}
              </option>
            ))}
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="comment" className="form-item-left">
            상품명
          </label>
          <textarea
            id="comment"
            placeholder="상품평"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="addImg" className="form-item-left">
            사진 후기
          </label>
          <div className="addImg">
            <button
              type="button"
              className="addImg-btn"
              onClick={() => fileRef.current.click()}
            >
              사진 추가
            </button>
            <div className="addImg-grid">
              {reviewImgs &&
                reviewImgs.map((img, i) => (
                  <div key={i} className="addImg-grid-imgWrapper">
                    <img
                      src={
                        img instanceof File
                          ? URL.createObjectURL(img)
                          : publicURL(img)
                      }
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          id="file"
          multiple
          accept=".png, .jpeg, .jpg"
          style={{ display: "none" }}
          onChange={(e) => handleReviewImgs(e.target.files)}
        />

        <button type="submit">리뷰 등록</button>
      </form>
    </div>
  );
}

export default ReviewForm;
