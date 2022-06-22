import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import ProductList from "../../components/product/ProductList";
import { getBrand } from "../../slice/brandSlice";
import { getProducts } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import "./brand.scss";

function Brand() {
  const dispatch = useDispatch();
  const params = useParams();
  const { brand } = useSelector((store) => store.brand);
  const { products, total } = useSelector((store) => store.product);
  const perPage = 20;
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getBrand(params.name));
  }, [params]);

  useEffect(() => {
    const payload = {
      brand: params.name,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProducts(payload));
  }, [params, perPage, currentPage, sort]);

  return (
    <>
      <div className="brands-container">
        <div className="brands-wrapper">
          {brand?.banners && (
            <div className="img-wrapper">
              <div className="brands-img">
                <img src={publicURL(brand?.banners[0].img)} alt="" />
              </div>
            </div>
          )}
          <div className="brands-info">
            <h3>{brand?.name}</h3>
            <p>{brand?.description}</p>
            <Link to="/collections" state={brand?.name}>
              <p className="navi">컬렉션 보러가기</p>
            </Link>
          </div>

          <ProductList setSort={setSort} products={products} />
        </div>
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default Brand;
