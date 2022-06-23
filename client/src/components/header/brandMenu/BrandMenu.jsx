import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./brandMenu.scss";

function BrandMenu({altIsHovering }) {
  const brands = useSelector((store) => store.brand.brands);

  const initial = brands.map((v) => v.name.slice(0, 1));
  const brandList = initial.filter((v, i) => initial.indexOf(v) === i);

  return (
    <div
      className="brandsidebar-container"
      onMouseOver={altIsHovering(1)}
      onMouseOut={altIsHovering(0)}
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
                    <Link to={`/brands/${_brand.name}`}>
                      <div onClick={altIsHovering(0)}>
                        {_brand.name}
                      </div>
                    </Link>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BrandMenu;
