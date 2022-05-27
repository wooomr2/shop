import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BrandModal from "../../components/modals/BrandModal";
import { deleteBrand } from "../../slice/brandSlice";
import { openModal } from "../../slice/modalSlice";

function Screens() {
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.brand);

  return (
    <div>
      <button onClick={() => dispatch(openModal("addBrand"))}>add</button>
      <BrandModal />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {brands?.map((brand, i) => (
            <tr key={i}>
              <td>
                <Link to={`/brands/${brand.name}`} state={brand}>
                  {brand.name}
                </Link>
              </td>
              <td>{brand.description}</td>
              <td>
                <button onClick={() => dispatch(deleteBrand(brand._id))}>
                  del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Screens;
