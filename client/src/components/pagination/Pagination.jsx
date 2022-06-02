import React from 'react'
import { useSelector } from 'react-redux';

import "./pagination.scss";

function Pagination({ perPage, setCurrentPage }) {
  const { total, _currentPage } = useSelector((store) => store.product);
  const pages = [];

  for (let i = 1; i <= (total / perPage); i++)
    pages.push(i);

  console.log(pages);

  const paging = (page) => () => {
    if (_currentPage !== page) {
      setCurrentPage(page)
      window.scrollTo(0, 0);
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination-wrapper">
        {pages?.map((page) => (
          <div
            className="pagination-number"
            key={page}
            onClick={paging(page)}
          >
            {_currentPage === page ? (
              <b>{page}</b>
            ) : (
              page
            )
          }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pagination;