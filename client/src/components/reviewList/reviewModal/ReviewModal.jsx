import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";
import publicURL from "../../../utils/publicURL";
import "./reviewModal.scss";


function ReviewModal({
  reviews,
  modalOpen,
  toggleModalOpen,
  reviewIndex,
  reviewImgIndex,
  setReviewImgIndex,
}) {
  const decreaseIndex = (index) => () => {
    console.log(index)
    if (index < 0) index = reviews[reviewIndex].reviewImgs.length - 1;
    return setReviewImgIndex(index);
  };

  const increaseIndex = (index) => () => {
    // 왜 ++ 돼서 안넘어오지
    ++index;
    if (index > reviews[reviewIndex].reviewImgs.length - 1) index = 0;
    return setReviewImgIndex(index);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [modalOpen]);

  return (
    <div className="reviewModal">
      <div className="reviewModal-wrapper">
        <div className="reviewModal-wrapper-top">
          <CloseIcon className="icon" onClick={toggleModalOpen} />
        </div>

        <div className="reviewModal-wrapper-middle">
          <ArrowBackIosNewIcon
            className="icon"
            onClick={decreaseIndex(--reviewImgIndex)}
          />
          <ArrowForwardIosIcon
            className="icon"
            onClick={increaseIndex(++reviewImgIndex)}
          />
        </div>

        <div className="reviewModal-wrapper-img">
          {reviews[0].reviewImgs ? (
            <img
              src={publicURL(reviews[reviewIndex].reviewImgs[reviewImgIndex])}
              alt="img"
            />
          ) : (
            "dkj"
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
