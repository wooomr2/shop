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
    <div>
      <button onClick={() => dispatch(openModal("addProduct"))}>add</button>
      <ProductModal />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, i) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <Link to={`/products/${product.slug}`} state={product}>
                  <img
                    src={publicURL(product.productImgs[0].fileName)}
                    alt=""
                    width="30"
                    height="30"
                  />
                  {product.name}
                </Link>
              </td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category.name}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch(deleteProduct(product._id))
                  }
                >
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
