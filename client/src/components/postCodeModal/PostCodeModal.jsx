import React from "react";
import DaumPostCode from "react-daum-postcode";
import CloseIcon from "@mui/icons-material/Close";

import "./postCodeModal.scss";
function PostCodeModal({ onClick, setPinCode, setAddress1 }) {
  
  const onCompleteHandler = (data) => {
    console.log(data);
    setPinCode(data.zonecode);
    setAddress1(data.address);
    onClick();
  };
  return (
    <div className="postcode-container">
      <div className="postcode">
        <div className="postcode-top">
          <h3>우편번호 검색</h3>
          <span onClick={onClick}>
            <CloseIcon />
          </span>
        </div>
        <DaumPostCode onComplete={onCompleteHandler} />
      </div>
    </div>
  );
}

export default PostCodeModal;
