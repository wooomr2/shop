import React from 'react'
import { useNavigate } from "react-router-dom";

import "./product.scss";
import publicURL from "../../utils/publicURL";

function Product({ product }) {
  const navigate = useNavigate();

  const toKRW = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onClickNavigate = (page) => () => {
    navigate(page);
  };

  return (
    <div
    className="products-items"
    onClick={onClickNavigate(`/products/${product._id}`)}
  >
    <img src={publicURL(product.productImgs[0].fileName)} alt="" />
    <p>
      <b>{product.brand}</b>
    </p>
    <p>
      {product.name} {product.color && `(${product.color})`}
    </p>
    <p>
      <span className={`${product.discountPrice}` > 0 ? "hasDiscount" : ""}>
        ₩{toKRW(product.price)}
      </span>
      {product.discountPrice && (
        <span className="discount">
          ₩{toKRW(product?.price * (1 - product?.discountPrice / 100))}
        </span>
      )}
    </p>
  </div>
  )
}

export default Product;