import "./home.scss";
import { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { getBrands } from "../../slice/brandSlice";
import { getCategories } from "../../slice/categorySlice";
import { getCollections } from "../../slice/collectionSlice";
import { getLookbooks } from "../../slice/lookbookSlice";
import { getProducts } from "../../slice/productSlice";
import { getScreens } from "../../slice/screenSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(getCategories());
      dispatch(getProducts());
      dispatch(getScreens());
      dispatch(getBrands());
      dispatch(getLookbooks());
      dispatch(getCollections());
    });
  }, []);

  return (
    <div className="home">
      <div>home</div>
    </div>
  );
}

export default Home;
