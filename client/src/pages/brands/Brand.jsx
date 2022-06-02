import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Paging from "../../components/paging/Paging";
import BrandSidebar from "../../components/sidebar/BrandSidebar";
import { getBrand } from "../../slice/brandSlice";
import { getProductsByBrand } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";

function Brand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { brand } = useSelector((store) => store.brand);
  const { products, total, perPage, _currentPage, _sort } = useSelector(
    (store) => store.product
  );
  const [sort, setSort] = useState(_sort);
  const [currentPage, setCurrentPage] = useState(_currentPage);

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
    dispatch(getProductsByBrand(payload));
  }, [params, perPage, currentPage, sort]);

  console.log({ brand, products });

  return (
    <div>
      <BrandSidebar />

      <div>
        {brand.banners && (
          <div>
            <img
              src={publicURL(brand?.banners[0].img)}
              alt=""
              width="800"
              height="400"
            />
          </div>
        )}
        {brand.cards && brand?.cards?.map((card) => (
          <div>
            <img src={publicURL(card.img)} alt="" width="300" height="300" />
          </div>
        ))}
        <div>
          <h1>{brand?.name}</h1>
          <span>{brand?.description}</span>
        </div>
      </div>

      <select onChange={(e) => setSort(e.target.value)}>
        <option defaultValue hidden>
          Sort
        </option>
        <option value={"latest"}>신상품</option>
        <option value={"ascending"}>낮은가격</option>
        <option value={"descending"}>높은가격</option>
      </select>
      <p>상품</p>
      <div style={{ display: "flex" }}>
        {products?.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img
              src={publicURL(product.productImgs[0].fileName)}
              alt=""
              width="30"
              height="30"
            />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
      <Paging
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Brand;
