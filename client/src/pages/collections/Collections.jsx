import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getCollections } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";

function Collections() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { collections, total, perPage, _currentPage } = useSelector(
    (store) => store.collection
  );
  const [currentPage, setCurrentPage] = useState(_currentPage);

  let mainCollections = [];
  let subCollections = [];

  for (let c of collections) {
    c.priority ? mainCollections.push(c) : subCollections.push(c);
  }

  useEffect(() => {
    const payload = { perPage, currentPage };
    dispatch(getCollections(payload));
  }, [perPage, currentPage]);

  return (
    <>
      <div className="collections-container">
        <h1>메인</h1>
        <div style={{ display: "flex" }}>
          {mainCollections?.map((collection) => (
            <div
              className="collections-items"
              key={collection._id}
              onClick={() => navigate(`/collections/${collection._id}`)}
            >
              <img
                src={publicURL(collection.banners[0].img)}
                alt=""
                width="500"
                height="500"
              />
              <b>{collection.name}</b>
            </div>
          ))}
        </div>

        <hr />

        <h1>서브</h1>
        <div style={{ display: "flex" }}>
          {subCollections?.map((collection) => (
            <div
              className="collections-items"
              key={collection._id}
              onClick={() => navigate(`/collections/${collection._id}`)}
            >
              <img
                src={publicURL(collection.banners[0].img)}
                alt=""
                width="200"
                height="200"
              />
              <b>{collection.name}</b>
            </div>
          ))}
        </div>
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

export default Collections;
