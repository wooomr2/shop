import "./category.scss";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategories } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import {
  categoryToggle,
  createLinearCategory,
} from "../../slice/categorySlice";
import Sidebar from "../../components/sidebar/Sidebar";
import Paging from "../../components/paging/Paging";
import FilterListIcon from "@mui/icons-material/FilterList";
import Pagination from "../../components/pagination/Pagination";
import Product from "../../components/product/Product";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { products, total, perPage, _currentPage, _sort, _brands, brandData } =
    useSelector((store) => store.product);
  const { categories, categoryOpen } = useSelector((store) => store.category);
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sort, setSort] = useState(_sort);
  const [brands, setBrands] = useState(_brands);
  const currentCategory = [];
  // const [sort, onChangeSort] = useInput(_sort);
  let cids = [];

  const [selectedGrid, setSelectedGrid] = useState(false);

  if (params.cid === "all") {
    cids = [];
  } else {
    function findCategory(categories) {
      if (currentCategory.length > 0) return;
      for (let c of categories) {
        if (c._id === params.cid) {
          currentCategory.push(c);
          return;
        }
        if (c.children.length > 0) findCategory(c.children);
      }
    }
    findCategory(categories);
    cids = createLinearCategory(currentCategory).map((cat) => cat._id);
  }

  useEffect(() => {
    const payload = {
      cids,
      brands,
      perPage,
      currentPage,
      sort,
    };
    dispatch(getProductsByCategories(payload));
  }, [params, brands, perPage, currentPage, sort]);

  const categoryToggleHandler = () => {
    dispatch(categoryToggle()); // 카테고리 토글
  };

  const handleGridColums = (boolean) => () => {
    setSelectedGrid(boolean);
  };

  return (
    <main>
      <div className="container">
        <Sidebar
          brandData={brandData}
          brands={brands}
          setBrands={setBrands}
          setCurrentPage={setCurrentPage}
          categoryOpen={categoryOpen}
          categoryToggleHandler={categoryToggleHandler}
        />

        <section>
          <div className="top">
            <div className="top-left">
              <div className="filter" onClick={categoryToggleHandler}>
                <FilterListIcon className="filter-icon" />
                <span>FILTER</span>
              </div>

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
                className="grid-icon"
                onClick={handleGridColums(true)}
              />
              <AppsOutlinedIcon
                className="grid-icon"
                onClick={handleGridColums(false)}
              />
            </div>
          </div>

          <div className={`products-wrapper ${selectedGrid ? "selected" : ""}`}>
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>

      <Paging
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}

export default Category;
