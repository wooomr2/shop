import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import ProductList from "../../components/product/ProductList";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  categoryToggle,
  createLinearCategory,
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
    dispatch(categoryToggle());
  };

  return (
    <>
      <div className="category-container">
        <Sidebar
          brandData={brandData}
          brands={brands}
          setBrands={setBrands}
          setCurrentPage={setCurrentPage}
          categoryOpen={categoryOpen}
          categoryToggleHandler={categoryToggleHandler}
        />
        <ProductList
          haveFilter={true}
          setSort={setSort}
          products={products}
          categoryToggleHandler={categoryToggleHandler}
        />
      </div>
      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Category;
