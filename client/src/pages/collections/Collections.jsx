import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getCollections } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";
import "./collections.scss";

function Collections() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.state;
  const { total, collections } = useSelector((store) => store.collection);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  let mainCollections = [];
  let subCollections = [];

  for (let c of collections) {
    c.priority ? mainCollections.push(c) : subCollections.push(c);
  }

  useEffect(() => {
    const payload = { perPage, currentPage, keyword };
    dispatch(getCollections(payload));
  }, [keyword, perPage, currentPage]);

  return (
    <>
      <div className="collections">
        <div className="collections-main">
          {mainCollections?.map((collection) => (
            <div
              className="collections-main-items"
              key={collection._id}
              onClick={() => navigate(`/collections/${collection._id}`)}
            >
              <div className="imgWrapper">
                <img src={publicURL(collection.banners[0].img)} alt="" />
              </div>
              <div className="collectionsName">
                {collection.name.split("\n").map((line, i) => (
                  <div key={i}>
                    <b>{line}</b>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="collections-sub">
          {collections?.map((collection) => (
            <div
              className="collections-sub-items"
              key={collection._id}
              onClick={() => navigate(`/collections/${collection._id}`)}
            >
              <div className="imgWrapper">
                <img src={publicURL(collection.banners[0].img)} alt="" />
              </div>
              <div className="collectionsName">
                {collection.name.split("\n").map((line, i) => (
                  <p key={i}>
                    <b>{line}</b>
                  </p>
                ))}
              </div>
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
    </>
  );
}

export default Collections;
