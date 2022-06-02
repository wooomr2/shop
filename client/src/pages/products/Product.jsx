import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../../slice/cartSlice";
import { getProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import { Link } from "react-router-dom";

function Product() {
  const dispatch = useDispatch();
  const params = useParams();
  const { product, relatedProducts } = useSelector((store) => store.product);
  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [params]);

  return (
    <div>
      <p>제품명 {product?.name}</p>
      <p>상세정보 {product?.description}</p>
      <p>가격 {product?.price}</p>
      <p>할인가 {product?.discountPrice}</p>
      <p>색상 {product?.color}</p>

      <div>
        <select onChange={(e) => setSize(e.target.value)}>
          <option defaultValue hidden>
            Size option
          </option>
          {product?.stock.map((s) => (
            <option value={s.size} disabled={s.qty === 0} key={s._id}>
              {s.size} {s.qty === 0 && "품절"}
            </option>
          ))}
        </select>
      </div>

      <div>
        {product.productImgs &&
          product?.productImgs.map((productImg, i) => (
            <div key={i}>
              <img
                src={publicURL(productImg.fileName)}
                alt=""
                width="50"
                height="50"
              />
            </div>
          ))}
      </div>

      <div>
        색상
        {relatedProducts.map((relatedProduct, i) => (
          <Link to={`/products/${relatedProduct._id}`} key={i}>
            <img
              src={publicURL(relatedProduct.productImgs[0].fileName)}
              alt=""
              width="50"
              height="50"
            />
          </Link>
        ))}
      </div>

      <button
        disabled={!size}
        onClick={() =>
          dispatch(
            addItem({
              _id: product._id,
              name: product.name,
              img: product.productImgs[0].fileName,
              price: product.price,
              size,
              qty: 1,
            })
          )
        }
      >
        카트담기
      </button>
    </div>
  );
}

export default Product;
