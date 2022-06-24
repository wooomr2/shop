import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import React from "react";
import useAlt from "../../hooks/useAlt";
import ProductItem from "./ProductItem";
import "./productList.scss";

function ProductList({ haveFilter, products, onChangeSort, categoryToggleHandler }) {
  const [selectedGrid, altSelectedGrid] = useAlt(false)

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
      <div className={`products-wrapper ${selectedGrid ? "selected" : ""}`}>
        {products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
