import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategories } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import { createLinearCategory } from "../../slice/categorySlice";
import Sidebar from "../../components/sidebar/Sidebar";
import Paging from "../../components/paging/Paging";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { products, total, perPage, _currentPage, _sort, _brands } =
    useSelector((store) => store.product);
  const { categories } = useSelector((store) => store.category);
  const [currentPage, setCurrentPage] = useState(_currentPage);
  const [sort, setSort] = useState(_sort);
  const [brands, setBrands] = useState(_brands);
  const currentCategory = [];
  let cids = [];
  
  if (params.cid === "all") {
    cids=[];
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

  return (
    <div>
      <Sidebar
        brands={brands}
        setBrands={setBrands}
        setCurrentPage={setCurrentPage}
      />
      <div>
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
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Category;
