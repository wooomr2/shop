import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductList from "../../../components/product/ProductList";
import { getProductsByCategories } from "../../../slice/productSlice";
import "./newArrival.scss";


function NewArraval() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const perPage = 12;
  const [currentPage] = useState(1);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const payload = {
      perPage,
      currentPage, 
      sort,
    };
    dispatch(getProductsByCategories(payload));
  }, [perPage, currentPage, sort]);

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
        <ProductList setSort={setSort} products={products} />
      </div>
    </div>
  );
}

export default NewArraval;
