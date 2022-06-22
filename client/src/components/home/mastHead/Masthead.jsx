import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./masthead.scss";

function Masthead({ scrollY }) {
  const navigate = useNavigate();
  const refContainer = useRef(null);

  let progress = 0;
  const { current: elContainer } = refContainer;

  if (elContainer) {
    // + 60px -> 헤더 영역까지 더해서 scrollY을 나눠야 함
    progress = Math.min(1, scrollY / elContainer.clientHeight);
    console.log("progress", progress);
  }

  let currentIndex = 0;

  useEffect(() => {
    const slide = setInterval(() => {
      document
        .getElementsByClassName("masthead-slide")
        [currentIndex].classList.remove("active");

      currentIndex++;

      if (currentIndex > 4) currentIndex = 0;

      document
        .getElementsByClassName("masthead-slide")
        [currentIndex].classList.add("active");
    }, 4500);

    return () => {
      clearInterval(slide);
    };
  }, [currentIndex]);

  return (
    <>
      <div
        ref={refContainer}
        className="masthead-container"
        style={{ transform: `translateY(-${progress * 10}vh)` }}
      >
        <div className="masthead-slide active">
          <img src="/assets/mainbg1.jpeg" alt="" />
          <div className="masthead-mainText">
            <strong>HOW ABOUT OOTD</strong>
            <div className="masthead-mainText-num">
              0 <span>1</span>
            </div>
          </div>
        </div>
        <div className="masthead-slide">
          <img src="/assets/mainbg2.jpeg" alt="" />
          <div className="masthead-mainText">
            <strong>HOW ABOUT OOTD</strong>
            <div className="masthead-mainText-num">
              0 <span>2</span>
            </div>
          </div>
        </div>
        <div className="masthead-slide">
          <img src="/assets/mainbg3.jpeg" alt="" />
          <div className="masthead-mainText">
            <strong>HOW ABOUT OOTD</strong>
            <div className="masthead-mainText-num">
              0 <span>3</span>
            </div>
          </div>
        </div>
        <div className="masthead-slide">
          <img src="/assets/mainbg4.jpeg" alt="" />
          <div className="masthead-mainText">
            <strong>HOW ABOUT OOTD</strong>
            <div className="masthead-mainText-num">
              0 <span>4</span>
            </div>
          </div>
        </div>
        <div className="masthead-slide">
          <img src="/assets/mainbg5.jpeg" alt="" />
          <div className="masthead-mainText">
            <strong>HOW ABOUT OOTD</strong>
            <div className="masthead-mainText-num">
              0 <span>5</span>
            </div>
          </div>
        </div>
        <div className="masthead-bar">
          <div onClick={() => navigate("/")}>View More</div>
        </div>
        <div className="masthead-arrow">
          <KeyboardArrowDownIcon className="masthead-arrow-down" />
        </div>
      </div>
    </>
  );
}

export default Masthead;
