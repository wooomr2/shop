import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import React, { useEffect, useState } from "react";
import useAlt from "../../hooks/useAlt";
import Loading from "../loading/Loading";
import ProductItem from "./productItem/ProductItem";
import "./productList.scss";

function ProductList({ haveFilter, products, onChangeSort, categoryToggleHandler, isLoading, categoryOpen }) {
  const [selectedGrid, altSelectedGrid] = useAlt(false)


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  useEffect(() => {
    if (categoryOpen && windowWidth < 1024) {
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
  }, [categoryOpen, windowWidth]);

  return (
    <section>
    <div className="top">
      <div className="top-left">
        {haveFilter && (
          <div className="filter" onClick={categoryToggleHandler}>
            <FormatAlignLeftIcon className="filter-icon" />
            <span>FILTER</span>
          </div>
        )}

        <div className="sort">
          <select onChange={onChangeSort}>
            <option defaultValue hidden>
              SORT
            </option>
            <option value={"latest"}>신상품</option>
            <option value={"ascending"}>낮은가격</option>
            <option value={"descending"}>높은가격</option>
            <option value={"salesRate"}>판매량</option>
            <option value={"ratings"}>평점</option>
          </select>
        </div>
      </div>

      <div className="top-right">
        <GridViewRoundedIcon
          className={`grid-icon ${selectedGrid ? "selected" : ""}`}
          onClick={altSelectedGrid(true)}
        />
        <AppsOutlinedIcon
          className={`grid-icon ${!selectedGrid ? "selected" : ""}`}
          onClick={altSelectedGrid(false)}
        />
      </div>
    </div>
    <div
      className={`products-wrapper ${selectedGrid ? "selected" : ""} ${
        isLoading ? "loading" : ""
      }`}
    >
      {isLoading ? (
        <Loading />
      ) : (
        products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </div>
  </section>
  );
}

export default ProductList;
