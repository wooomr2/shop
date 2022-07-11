import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewBrands } from "../../../slice/brandSlice";
import publicURL from "../../../utils/publicURL";
import "./scrollable.scss";

function Scrollable({ scrollY }) {
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.brand);
  let images = [...document.querySelectorAll(".scrollable-img")];
  console.log("hi");

  useEffect(() => {
    dispatch(getNewBrands());
  }, []);

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
      <section>
        <div className="scrollable-imgWrapper">
          <img
            className="scrollable-img"
            src={publicURL(brands[0]?.banners[0]?.img)}
            alt=""
          />
          <img
            className="scrollable-img"
            src={publicURL(brands[1]?.banners[0]?.img)}
            alt=""
          />
        </div>
      </section>
      <section>
        <div className="scrollable-imgWrapper">
          <img
            className="scrollable-img"
            src={publicURL(brands[2]?.banners[0]?.img)}
            alt=""
          />
          <img
            className="scrollable-img"
            src={publicURL(brands[3]?.banners[0]?.img)}
            alt=""
          />
        </div>
      </section>
      <section>
        <div className="scrollable-imgWrapper">
          <img
            className="scrollable-img"
            src={publicURL(brands[4]?.banners[0]?.img)}
            alt="sdf"
          />
          <img
            className="scrollable-img"
            src={publicURL(brands[5]?.banners[0]?.img)}
            alt="sdf"
          />
        </div>
      </section>
    </div>
  );
}

export default Scrollable;
