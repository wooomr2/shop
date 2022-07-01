import React from "react";
import { Link } from "react-router-dom";
import publicURL from "../../utils/publicURL";
import toKRW from "../../utils/toKRW";
import "./productItem.scss";


function Product({ product }) {
  const {_id, productImgs, brand, name, color, discountPrice, price} = product

  return (
    <Link to={`/products/${_id}`}>
      <div className="products-items">
        <img src={publicURL(productImgs[0].fileName)} alt="" />
        
        <p><b>{brand}</b></p>
        <p>{name} {color && `(${color})`}</p>
        <p>
          <span className={`${discountPrice}` > 0 ? "hasDiscount" : ""}>
            ₩{toKRW(price)}
          </span>
          {discountPrice && (
            <>
            <span className="discount">₩{toKRW(discountPrice)}</span>{" "}
            <span style={{color: "#FF0000" }}>{((1 - discountPrice / price) * 100).toFixed()}%</span>
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

export default Product;
