import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Search() {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword
  
  const { products, total, perPage, _currentPage, _sort } = useSelector(
    (store) => store.product
  );
  console.log(keyword)


  return (
    <div>Search</div>
  )
}

export default Search