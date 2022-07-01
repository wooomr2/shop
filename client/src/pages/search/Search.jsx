import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import ProductList from "../../components/productList/ProductList";
import useInput from "../../hooks/useInput";
import { getProducts } from "../../slice/productSlice";
import "./search.scss";


function Search() {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const { total, products } = useSelector((store) => store.product);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, onChangeSort] = useInput("latest");

  useEffect(() => {
    const payload = {
      keyword,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProducts(payload));
  }, [params, keyword, perPage, currentPage, sort]);

  return (
    <div className="searchResult">
      <div className="searchResult-wrapper">
        <div className="searchResult-wrapper-info">
          <div className="keyword">{keyword}</div>
          <div className="length">검색결과 {total} 개</div>
        </div>
        <ProductList products={products} onChangeSort={onChangeSort}  />
      </div>
      
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Search;
