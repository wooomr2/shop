import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useRef } from "react";
import "./masthead.scss";

function Masthead({ scrollY }) {
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
        {Array(5)
          .fill()
          .map((_, idx) => (
            <div className={`masthead-slide ${idx === 0 ? "active" : ""}`} key={idx}>
              <img src={`/assets/mainbg${idx}.jpeg`} alt="" loading={`${idx < 2 ? "eager" : "lazy"}`} />
              <div className="masthead-mainText">
                <strong>HOW ABOUT OOTD</strong>
                <div className="masthead-mainText-num">
                  0 <span>{idx+1}</span>
                </div>
              </div>
            </div>
        ))}

        <div className="masthead-bar">
          <div>View More</div>
        </div>
        <div className="masthead-arrow">
          <KeyboardArrowDownIcon className="masthead-arrow-down" />
        </div>
      </div>
    </>
  );
}

export default Masthead;
