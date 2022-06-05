import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCollections } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";

function Collections() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mainCollections, subCollections } = useSelector(
    (store) => store.collection
  );

  useEffect(() => {
    dispatch(getCollections());
  }, []);

  return (
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
      <div  style={{ display: "flex" }}>
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
  );
}

export default Collections;
