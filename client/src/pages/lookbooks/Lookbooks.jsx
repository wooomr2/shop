import "./lookbooks.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLookbooks } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";
import Pagination from "../../components/pagination/Pagination";

function Lookbooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lookbooks, total, perPage, _currentPage } = useSelector(
    (store) => store.lookbook
  );
  const [currentPage, setCurrentPage] = useState(_currentPage);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getLookbooks(payload));
  }, [perPage, currentPage]);

  return (
    <>
      <div className="lookbooks-container">
        {lookbooks?.map((lookbook) => (
          <div
            className="lookbooks-items"
            key={lookbook._id}
            onClick={() => navigate(`/lookbooks/${lookbook._id}`)}
          >
            <img src={publicURL(lookbook.banners[0].img)} alt="" />
            <b>{lookbook.name}</b>
          </div>
        ))}
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Lookbooks;
