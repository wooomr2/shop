import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCollection } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";
import Brand from "../brands/Brand";

function Collection() {
  const dispatch = useDispatch();
  const params = useParams();
  const { collection } = useSelector((store) => store.collection);

  useEffect(() => {
    dispatch(getCollection(params.id));
  }, [params]);

  return (
    <div>
      <div>
        <h1>{collection?.name}</h1>
        <span>{collection?.description}</span>
      </div>

      <div>
        <span>브랜드: {collection?.brand}</span>
        <span>런칭 : {collection?.launched}</span>
        <span>디렉터 : {collection?.director}</span>
        <span>국가 : {collection?.country}</span>
        <span>상점 : {collection?.shop}</span>
      </div>

      <div>
        {collection?.cards?.map((card) => (
          <div key={card._id}>
            <img src={publicURL(card.img)} alt="" width="300" height="300" />
          </div>
        ))}
      </div>

      {collection?.brand && <Brand brandName={collection.brand} />}
    </div>
  );
}

export default Collection;
