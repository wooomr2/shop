import Pagination from "react-js-pagination";
import "./paging.css"

function Paging({ currentPage, perPage, total, setCurrentPage }) {
  return (
    <div>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={perPage}
        totalItemsCount={total}
        onChange={(e) => setCurrentPage(e)}
        nextPageText=">>"
        prevPageText="<<"
        firstPageText="First"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      />
    </div>
  );
}

export default Paging;
