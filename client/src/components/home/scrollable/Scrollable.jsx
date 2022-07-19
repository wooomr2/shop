import React, { useEffect } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import publicURL from "../../../utils/publicURL";
import "./scrollable.scss";

function getShuffle(candidate) {
  const shuffle = [];
  for (let i = 0; i < 6; i++) {
    // candidate 중 하나 랜덤으로 뽑아서 shuffle에 push
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  return shuffle;
}

function Scrollable() {
  const brands = useSelector((store) => store.brand.brands);
  const candidate = Array(brands.length)
    .fill()
    .map((v, i) => i);
  const numbers = useMemo(() => getShuffle(candidate), []);

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

      {numbers.slice(0, 3).map((number, i) => (
        <section key={number}>
          <div className="scrollable-imgWrapper">
            <img
              className="scrollable-img"
              src={publicURL(brands[numbers[i * 2]]?.banners[0]?.img)}
              alt=""
            />

            <img
              className="scrollable-img"
              src={publicURL(brands[numbers[i * 2 + 1]]?.banners[0]?.img)}
              alt=""
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default Scrollable;
