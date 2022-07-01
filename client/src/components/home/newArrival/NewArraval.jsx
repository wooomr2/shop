import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductList from "../../../components/productList/ProductList";
import useInput from "../../../hooks/useInput";
import { getProductsByCategories } from "../../../slice/productSlice";
import "./newArrival.scss";


function NewArraval() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.product.products);

  const perPage = 12;
  const currentPage = 1;
  const [sort, onChangeSort] = useInput("latest");

  useEffect(() => {
    const payload = {
      perPage,
      currentPage, 
      sort,
    };
    dispatch(getProductsByCategories(payload));
  }, [sort]);

  return (
    <div className="newArrival">
      <div className="newArrival-wrapper">
        <div className="newArrival-wrapper-top">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <h3>New Arrival</h3>
          </div>
          <Link to="category/all">
            <div className="viewMore">
              <h4>View More</h4>
            </div>
          </Link>
        </div>
        <ProductList onChangeSort={onChangeSort} products={products} />
      </div>
    </div>
  );
}

export default NewArraval;
