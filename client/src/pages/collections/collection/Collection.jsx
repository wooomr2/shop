import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionSection from "../../../components/collectionSection/CollectionSection";
import { getCollection } from "../../../slice/collectionSlice";
import "./collection.scss";

function Collection() {
  const dispatch = useDispatch();
  const params = useParams();
  const collection = useSelector((store) => store.collection.collection);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    dispatch(getCollection(params.id));
  }, [params]);

  return (
    <section className="collection">
      <div className="collection-wrapper">
        <div className="collection-wrapper-top">
          <div className="top-left">
            <h2 className="top-left-name">
              {collection?.name?.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="top-left-desc">
              {collection?.description?.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="top-right">
            <div className="top-right-item">
              <h3>브랜드</h3>
              <p>{collection?.brand}</p>
            </div>
            <div className="top-right-item">
              <h3>런칭</h3>
              <p>{collection?.launched}</p>
            </div>
            <div className="top-right-item">
              <h3>디렉터</h3>
              <p>{collection?.director}</p>
            </div>
            <div className="top-right-item">
              <h3>국가</h3>
              <p>{collection?.country}</p>
            </div>
          </div>
        </div>

        <CollectionSection
          collection={collection}
          scrollY={scrollY}
          numberOfPage={collection?.cards?.length / 2}
        />
      </div>
    </section>
  );
}

export default Collection;
