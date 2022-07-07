import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductModal from "../../components/modals/ProductModal";
import { openModal } from "../../slice/modalSlice";
import { deleteProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  return (
    <div className="list">
    <div className="list-btn">
      <h2>OUR PRODUCTS</h2>
      <button onClick={() => dispatch(openModal("addProduct"))}>add</button>
    </div>
    <ProductModal />

    <table className="list-table">
      <thead>
        <tr className="thead-tr">
          <th>ID</th>
          <th>Product</th>
          <th>Img</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, i) => (
          <tr key={product._id} className="tbody-tr">
            <td>{product._id}</td>
            <td className="tbody-tr-name">
              <Link
                to={`/products/${product.slug}`}
                state={product}
                className="navi"
              >
                {product.name}
              </Link>
            </td>
            <td>
              <img
                src={publicURL(product.productImgs[0].fileName)}
                alt=""
                width="30"
                height="30"
              />
            </td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.category.name}</td>
            <td>
              <button onClick={() => dispatch(deleteProduct(product._id))}>
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

export default Products;
