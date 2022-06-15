import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./brandsidebar.scss";
import { getBrands } from "../../slice/brandSlice";

function BrandSidebar({onMouseOver, onMouseOut, setIsHovering}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.brand);

  const initial = brands.map((v) => v.name.slice(0, 1));
  const brandList = initial.filter((v, i) => initial.indexOf(v) === i);

  console.log("initial", initial);
  console.log("brandList", brandList);

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <div
    className="brandsidebar-container"
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
  >
    {brandList?.map((brand) => (
      <div key={brand} className="brandsidebar-wrapper">
        <div className="brandsidebar-initial">
          <b>{brand}</b>
        </div>
        <div className="brandsidebar-items">
          {brands?.map(
            (_brand) =>
              _brand.name.slice(0, 1) === brand && (
                <div key={_brand.name} className="brand-item">
                  <div onClick={() => {
                    navigate(`/brands/${_brand.name}`);
                    setIsHovering(false);
                  }}>
                    {_brand.name}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    ))}
  </div>
  );
}

export default BrandSidebar;
