import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import "./newArrival.scss";
import { getProductsByCategories } from "../../../slice/productSlice";
import ProductList from "../../../components/product/ProductList";

function NewArraval() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { total, products } = useSelector((store) => store.product);

  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
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
          <div className="viewMore" onClick={() => navigate("category/all")}>
            <h4>View More</h4>
          </div>
        </div>
        <ProductList setSort={setSort} products={products} />
      </div>
    </div>
  );
}

export default NewArraval;
