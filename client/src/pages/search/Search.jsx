import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import Product from "../../components/product/Product";
import { getProducts } from "../../slice/productSlice";

function Search() {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const { total, products } = useSelector((store) => store.product);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("latest");
  const [selectedGrid, setSelectedGrid] = useState(false);

  useEffect(() => {
    const payload = {
      keyword,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProducts(payload));
  }, [params, keyword, perPage, currentPage, sort]);

  const handleGridColums = (boolean) => () => {
    setSelectedGrid(boolean);
  };

  return (
    <div className="brands-container">
      <div>
        <div className="top">
          <div className="top-left">
            <div className="sort">
              <select onChange={(e) => setSort(e.target.value)}>
                <option defaultValue hidden>
                  SORT
                </option>
                <option value={"latest"}>신상품</option>
                <option value={"ascending"}>낮은가격</option>
                <option value={"descending"}>높은가격</option>
              </select>
            </div>
          </div>

          <div className="top-right">
            <GridViewRoundedIcon
              className={`grid-icon ${selectedGrid && "selected"}`}
              onClick={handleGridColums(true)}
            />
            <AppsOutlinedIcon
              className={`grid-icon ${!selectedGrid && "selected"}`}
              onClick={handleGridColums(false)}
            />
          </div>
        </div>

        <div className={`products-wrapper ${selectedGrid && "selected"}`}>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Search;
