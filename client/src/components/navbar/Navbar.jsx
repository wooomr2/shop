import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFeatures } from "../../slice/productSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <ul>
        <li
          onClick={() => {
            dispatch(clearFeatures());
            navigate(`/categories/all`);
          }}
        >
          categories
        </li>
        <li
          onClick={() => {
            dispatch(clearFeatures());
            navigate(`/brands`);
          }}
        >
          brands
        </li>
        <li
          onClick={() => {
            navigate(`/lookbooks`);
          }}
        >
          lookbooks
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
