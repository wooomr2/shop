import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BrandModal from "../../components/modals/BrandModal";
import { deleteBrand } from "../../slice/brandSlice";
import { openModal } from "../../slice/modalSlice";

function Brands() {
  const dispatch = useDispatch();
  const { brands } = useSelector((store) => store.brand);

  const deleteItem = (id) => () => {
    if(window.confirm("정말 삭제하시겠습니까?") === true)
      return dispatch(deleteBrand(id))
    return;
  };


  return (
    <div className="list">
    <div className="list-btn">
      <h2>OUR BRANDS</h2>
      <button onClick={() => dispatch(openModal("addBrand"))}>add</button>
    </div>
    <BrandModal />
    <table className="list-table">
      <thead>
        <tr className="thead-tr">
          <th className="thead-tr-th">Name</th>
          <th className="thead-tr-th">Description</th>
          <th className="thead-tr-th">Note</th>
        </tr>
      </thead>
      <tbody>
        {brands?.map((brand, i) => (
          <tr key={i} className="tbody-tr">
            <td className="tbody-tr-name">
              <Link to={`/brands/${brand.name}`} state={brand} className="navi">
                {brand.name}
              </Link>
            </td>
            <td>{brand.description}</td>
            <td>
              <button onClick={deleteItem(brand._id)}>
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default Brands;
