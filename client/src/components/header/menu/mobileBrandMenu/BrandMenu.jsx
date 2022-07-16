import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./brandMenu.scss";

function BrandMenu({ brandsMenu, toggleBrandsMenu, setMenuOpen }) {
  const brands = useSelector((store) => store.brand.brands);

  const initial = brands.map((v) => v.name.slice(0, 1).toUpperCase());
  const brandList = initial.filter((v, i) => initial.indexOf(v) === i);

  return (
    <>
      {brandsMenu && (
        <div className={`brandMenu`}>
          <div className="brandMenu-back" onClick={() => toggleBrandsMenu()}>
            <ArrowBackIosNewIcon className="icon" /> Back
          </div>

          <div className="brandMenu-wrapper">
            {brandList?.map((brand) => (
              <div key={brand} className="items">
                <div className="items-initial">
                  <b>{brand}</b>
                </div>

                <div className="items-wrapper">
                  {brands?.map(
                    (_brand) =>
                      _brand.name.slice(0, 1) === brand && (
                        <div key={_brand.name} className="item">
                          <NavLink
                            to={`/brands/${_brand.name}`}
                            onClick={() => setMenuOpen()}
                          >
                            {_brand.name}
                          </NavLink>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BrandMenu;
