import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getCollections } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";
import "./collections.scss";

function Collections() {
  const dispatch = useDispatch();
  const location = useLocation();
  const keyword = location.state;
  const { total, collections } = useSelector((store) => store.collection);
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const payload = { perPage, currentPage, keyword };
    dispatch(getCollections(payload));
  }, [keyword, perPage, currentPage]);

  return (
    <div className="collections">
      <div className="collections-main">
        {collections?.slice(0,2).map((collection) => (
          <div className="collections-main-items" key={collection._id}>
            <Link to={`/collections/${collection._id}`}>
              <div className="imgWrapper">
                <img src={publicURL(collection.banners[0].img)} alt="" />
              </div>
            </Link>
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
        {collections?.slice(2).map((collection) => (
          <div className="collections-sub-items" key={collection._id}>
            <Link to={`/collections/${collection._id}`}>
              <div className="imgWrapper">
                <img src={publicURL(collection.banners[0].img)} alt="" />
              </div>
            </Link>
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
  );
}

export default Collections;
