import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRandomBrandImgs } from "../../../slice/brandSlice";
import publicURL from "../../../utils/publicURL";
import "./scrollable.scss";

function Scrollable() {
  const brandImgs = useSelector(selectRandomBrandImgs);

  let images = [...document.querySelectorAll(".scrollable-img")];

  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      let { top } = images[i].getBoundingClientRect();
      if (i % 2 === 0) images[i].style.transform = `rotate(${top * 0.02}deg)`;
      else images[i].style.transform = `rotate(${top * 0.02 * -1}deg)`;
    }
  }, [images]);

  return (
    <div className="scrollable">
      <div className="stickyText">
        <div className="stickyText-brands">Brands</div>
      </div>

      {Array(3).fill().map((_, i) => (
        <section key={i}>
          <div className="scrollable-imgWrapper">
            <img
              className="scrollable-img"
              src={publicURL(brandImgs[i*2])}
              alt=""
            />

            <img
              className="scrollable-img"
              src={publicURL(brandImgs[i*2+1])}
              alt=""
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default Scrollable;
