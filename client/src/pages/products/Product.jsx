import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../../slice/cartSlice";
import { getProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";

function Product() {
  const dispatch = useDispatch();
  const params = useParams();
  const { product } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, []);


  return (
    <div>
      <p>{product?.name}</p>
      <p>{product?.description}</p>
      <p>{product?.price}</p>
      <div>
        {product.productImgs && product?.productImgs.map((productImg, i) => (
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
      <button
        onClick={() =>
          dispatch(
            addItem({
              _id: product._id,
              name: product.name,
              img: product.productImgs[0].fileName,
              price: product.price,
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
