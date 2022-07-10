import "./pagination.scss";

function Pagination({ perPage, total, currentPage, setCurrentPage }) {
  const pages = [];
  
  for (let i = 1; i <= Math.ceil(total / perPage); i++) pages.push(i);

  const paging = (page) => () => {
    if (currentPage !== page) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="pagination-container">
      <div className="pagination-wrapper">
        {pages?.map((page) => (
          <div className="pagination-number" key={page} onClick={paging(page)}>
            {currentPage === page ? <b>{page}</b> : page}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
