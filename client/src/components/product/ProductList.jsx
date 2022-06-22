import React, { useState } from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

import "./productList.scss";
import Product from "./Product";

function ProductList({ haveFilter, products, setSort, categoryToggleHandler }) {
  const [selectedGrid, setSelectedGrid] = useState(false);

  console.log(haveFilter);
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
            <select onChange={(e) => setSort(e.target.value)}>
              <option defaultValue hidden>
                SORT
              </option>
              <option value={"timestamps"}>신상품</option>
              <option value={"ascending"}>낮은가격</option>
              <option value={"descending"}>높은가격</option>
            </select>
          </div>
        </div>

        <div className="top-right">
          <GridViewRoundedIcon
            className={`grid-icon ${selectedGrid ? "selected" : ""}`}
            onClick={() => setSelectedGrid(true)}
          />
          <AppsOutlinedIcon
            className={`grid-icon ${!selectedGrid ? "selected" : ""}`}
            onClick={() => setSelectedGrid(false)}
          />
        </div>
      </div>
      <div className={`products-wrapper ${selectedGrid ? "selected" : ""}`}>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
