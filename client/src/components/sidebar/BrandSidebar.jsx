import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands } from "../../slice/brandSlice";


function BrandSidebar() {
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.brand);

  // useEffect(() => {
  //   dispatch(getBrands());
  // }, []);

  return (
    <div>
      {brands?.map((brand) => (
        <div key={brand._id}>
          <Link to={`/brands/${brand.name}`}>{brand.name}</Link>
        </div>
      ))}
    </div>
  );
}

export default BrandSidebar;