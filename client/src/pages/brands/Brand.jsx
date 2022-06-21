import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BrandSidebar from "../../components/brandsidebar/BrandSidebar";
import Pagination from "../../components/pagination/Pagination";
import Product from "../../components/product/Product";
import { getBrand } from "../../slice/brandSlice";
import { getProducts } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import "./brands.scss";

function Brand({ brandName }) {
  const dispatch = useDispatch();
  const params = useParams();
  const { brand } = useSelector((store) => store.brand);
  const { products, total } = useSelector((store) => store.product);
  const perPage = 20;
  const [sort, setSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrid, setSelectedGrid] = useState(false);

  useEffect(() => {
    dispatch(getBrand(params.name || brandName));
  }, [params, brandName]);

  useEffect(() => {
    const payload = {
      brand: params.name || brandName,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProducts(payload));
  }, [params, brandName, perPage, currentPage, sort]);

  const handleGridColums = (boolean) => () => {
    setSelectedGrid(boolean);
  };

  return (
    <div className="brands-container">
      {!brandName && <BrandSidebar />}

      <div className="brands-wrapper">
        {brand?.banners && (
          <div className="brands-img">
            <img src={publicURL(brand?.banners[0].img)} alt="" />
          </div>
        )}
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

      <Pagination
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Brand;
