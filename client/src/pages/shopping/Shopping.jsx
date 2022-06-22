import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import Product from "../../components/product/Product";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  categoryToggle,
  createLinearCategory
} from "../../slice/categorySlice";
import { getProductsByCategories } from "../../slice/productSlice";
import "./shopping.scss";

function Category() {
  const dispatch = useDispatch();
  const params = useParams();
  const { categories, categoryOpen } = useSelector((store) => store.category);
  const { total, products, brandData } = useSelector((store) => store.product);
  
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("latest");
  const [brands, setBrands] = useState([]);

  const [selectedGrid, setSelectedGrid] = useState(false);

  const currentCategory = [];
  let cids = [];

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
      <div className="category-container">
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
        </section>
      </div>
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
