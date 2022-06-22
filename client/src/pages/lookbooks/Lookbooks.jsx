import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getLookbooks } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";
import "./lookbooks.scss";

function Lookbooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { total, lookbooks } = useSelector((store) => store.lookbook);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getLookbooks(payload));
  }, [perPage, currentPage]);

  return (
    <div className="lookbooks-container">
      <div className="lookbooks-wrapper">
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
    </div>
  );
}

export default Lookbooks;
