import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

import "./brands.scss";
import Paging from "../../components/paging/Paging";
import Product from "../../components/product/Product";
import BrandSidebar from "../../components/brandsidebar/BrandSidebar";
import { getBrand } from "../../slice/brandSlice";
import { getProductsByBrand } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import Pagination from "../../components/pagination/Pagination";

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
  const [selectedGrid, setSelectedGrid] = useState(false);

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

  const handleGridColums = (boolean) => () => {
    setSelectedGrid(boolean);
  };

  return (
    <div className="brands-container">
      <BrandSidebar />

      <div className="brands-wrapper">
        {brand.banners && (
          <div className="brands-img">
            <img
              src={publicURL(brand?.banners[0].img)}
              alt=""
            />
          </div>
        )}
        {/* {brand.cards && brand?.cards.map((card) => (
          <div>
            <img src={publicURL(card.img)} alt="" width="300" height="300" />
          </div>
        ))} */}
        <div className="brands-info">
          <h3>{brand?.name}</h3>
          <span>{brand?.description}</span>
        </div>

        <div className="top">
            <div className="top-left">
              <div className="sort">
                <select onChange={(e) => setSort(e.target.value)}>
                  <option defaultValue hidden>
                    SORT
                  </option>
                  <option value={"latest"}>신상품</option>
                  <option value={"ascending"}>낮은가격</option>
                  <option value={"descending"}>높은가격</option>
                </select>
              </div>
            </div>

            <div className="top-right">
              <GridViewRoundedIcon
                className={`grid-icon ${selectedGrid && "selected"}`}
                onClick={handleGridColums(true)}
              />
              <AppsOutlinedIcon
                className={`grid-icon ${!selectedGrid && "selected"}`}
                onClick={handleGridColums(false)}
              />
            </div>
          </div>

          <div className={`products-wrapper ${selectedGrid && "selected"}`}>
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
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
