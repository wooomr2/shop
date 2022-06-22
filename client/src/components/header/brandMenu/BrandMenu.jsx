import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./brandMenu.scss";


function BrandMenu({ onMouseOver, onMouseOut, setIsHovering }) {
  const { brands } = useSelector((store) => store.brand);

  const initial = brands.map((v) => v.name.slice(0, 1));
  const brandList = initial.filter((v, i) => initial.indexOf(v) === i);

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
                    <Link to={`/brands/${_brand.name}`}>
                      <div onClick={() => setIsHovering(false)}>
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
