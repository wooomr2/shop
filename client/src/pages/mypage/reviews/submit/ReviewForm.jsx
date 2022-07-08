import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { upsertReview } from "../../../../slice/reviewSlice";
import publicURL from "../../../../utils/publicURL";
import "./reviewForm.scss";

function ReviewForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const review = location.state;
  const user = useSelector((store) => store.user.user);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [topSize, setTopSize] = useState("");
  const [bottomSize, setBottomSize] = useState("");
  const [shoesSize, setShoesSize] = useState("");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [reviewImgs, setReviewImgs] = useState([]);

  useEffect(() => {
    setHeight(review.bodyInfo?.height || "");
    setWeight(review.bodyInfo?.weight || "");
    setTopSize(review.bodyInfo?.topSize || "");
    setBottomSize(review.bodyInfo?.bottomSize || "");
    setShoesSize(review.bodyInfo?.shoesSize || "");
    setComment(review.comment || "");
    setRating(review.rating || "");
    setReviewImgs(review.reviewImgs || []);
  }, [review]);

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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="키"
        required
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        placeholder="몸무게"
        required
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        placeholder="상의사이즈"
        required
        value={topSize}
        onChange={(e) => setTopSize(e.target.value)}
      />
      <input
        placeholder="하의사이즈"
        required
        value={bottomSize}
        onChange={(e) => setBottomSize(e.target.value)}
      />
      <input
        placeholder="신발사이즈"
        required
        value={shoesSize}
        onChange={(e) => setShoesSize(e.target.value)}
      />
      <textarea
        placeholder="상품평"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        placeholder="평점"
        required
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      {reviewImgs &&
        reviewImgs.map((img, i) => (
          <div key={i}>
            <img
              src={
                img instanceof File ? URL.createObjectURL(img) : publicURL(img)
              }
              alt=""
              height="50"
            />
          </div>
        ))}

      <label htmlFor="file">
        <PermMediaIcon />
        <span>Review images</span>
        <input
          type="file"
          id="file"
          multiple
          accept=".png, .jpeg, .jpg"
          style={{ display: "none" }}
          onChange={(e) => handleReviewImgs(e.target.files)}
        />
      </label>

      <button type="submit">submit</button>
    </form>
  );
}

export default ReviewForm;
