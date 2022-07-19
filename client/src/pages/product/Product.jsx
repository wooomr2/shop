import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewList from "../../components/reviewList/ReviewList";
import useAlt from "../../hooks/useAlt";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { addItem, buyNow } from "../../slice/cartSlice";
import { getProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import toKRW from "../../utils/toKRW";
import "./product.scss";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { product, relatedProducts } = useSelector((store) => store.product);
  const { cartItems } = useSelector((store) => store.cart);
  const [size, onChangeSize, setSize] = useInput("");
  const [qty, onChangeQty, setQty] = useInput(1);
  const [src, altSrc, setSrc] = useAlt("");
  const [isDescOpen, toggleIsDescOpen] = useToggle(false);
  const [isCartOpen, altIsCartOpen, setIsCartOpen] = useAlt(false);
  const selectRef = useRef(null)

  const otherColors = relatedProducts?.filter((v) => v._id !== product._id);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [params]);

  useEffect(() => {
    if (product?.productImgs)
      setSrc(publicURL(product?.productImgs[0]?.fileName));
  }, [product]);

  useEffect(() => {
    if (isCartOpen) {
      const closeCartModal = setTimeout(() => {
        setIsCartOpen(false);
      }, 4000);
      return () => {
        clearTimeout(closeCartModal);
      };
    }
  }, [isCartOpen]);

  const addCart = (buy) => () => {
    if (!size) return alert("사이즈를 선택하셔야 합니다.");

    const item = product.stock.find((v) => v.size === size);
    const cartItem = cartItems
      .filter((v) => v._id === product._id)
      .find((v) => v.size === size);

    if (buy === "now") {
      if (item?.qty < qty) {
        return alert(`${item.qty}개 이상으로는 재고가 부족합니다.`);
      }

      dispatch(
        buyNow({
          _id: product._id,
          name: product.name,
          brand: product.brand,
          color: product.color,
          img: product.productImgs[0].fileName,
          price: product.discountPrice ? product.discountPrice : product.price,
          size,
          qty: parseInt(qty),
        })
      );
      navigate("/checkout");
    } else {
      if (item?.qty < qty || item?.qty <= cartItem?.qty + qty) {
        return alert(`${item.qty}개 이상으로는 재고가 부족합니다.`);
      }

      dispatch(
        addItem({
          _id: product._id,
          name: product.name,
          brand: product.brand,
          color: product.color,
          img: product.productImgs[0].fileName,
          price: product.discountPrice ? product.discountPrice : product.price,
          size,
          qty: parseInt(qty),
          stock: product.stock,
        })
      );
      setIsCartOpen(true);
    }

    selectRef.current.selectedIndex = 0;
    return setSize("");
  };

  return (
    <>
      <div className="product">
        <div className="product-left">
          <div className="product-left-img">
            {product?.productImgs?.map((productImg, i) => (
              <div
                key={i}
                className="img-wrapper"
                onClick={altSrc(publicURL(productImg.fileName))}
              >
                <img src={publicURL(productImg.fileName)} alt="" />
              </div>
            ))}
          </div>
          <div className="product-left-mainImg">
            <img src={src} alt="" />
          </div>
        </div>

        <div className="product-right">
          <Link to={`/brands/${product?.brand}`}>
            <div className="brand-button">브랜드 홈 바로가기</div>
          </Link>

          <div className="product-right-brand">{product?.brand}</div>

          <div className="product-right-name">
            {product?.name} ({product?.color})
          </div>

          <div className={"product-right-price"}>
            <p className={`${product?.discountPrice ? "hasDiscount" : ""}`}>
              ₩ {toKRW(product?.price)}
            </p>
            <p>
              ₩ {toKRW(product?.discountPrice)}{" "}
              <span>
                {(
                  (1 - product?.discountPrice / product?.price) *
                  100
                ).toFixed()}
                %
              </span>
            </p>
          </div>

          <div className="product-right-desc">
            <div className="descMenu" onClick={toggleIsDescOpen}>
              <p>제품 상세정보</p>
              <p>
                {isDescOpen ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </p>
            </div>
            <div className={`desc ${isDescOpen ? "descOpen" : ""}`}>
              {product?.description?.split("\n").map((line, i) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="product-right-color">
            <p>COLOR</p>
            <div className="color-wrapper">
              {otherColors?.map((relatedProduct, i) => (
                <Link
                  className="img-wrapper"
                  to={`/products/${relatedProduct._id}`}
                  key={i}
                >
                  <img
                    src={publicURL(relatedProduct.productImgs[0].fileName)}
                    alt="relatedProduct"
                    onClick={() => setSize("")}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="product-right-size">
            <p>SIZE</p>
            <select ref={selectRef} onChange={onChangeSize} className="selection">
              <option defaultValue hidden>
                - [필수] OPTIONS -
              </option>
              {product?.stock?.map((s) => (
                <option value={s.size} disabled={s.qty === 0} key={s._id}>
                  {s.size}{" "}
                  {s.qty === 0 ? "(SOLD OUT)" : s.qty === 1 ? "(LAST ONE)" : ""}
                </option>
              ))}
            </select>
            {size && size.length > 0 && (
              <div className="selection-info">
                <div>{size}</div>
                <div className="selection-info-qty">
                  <div className="qty">
                    <button
                      onClick={() => {
                        if (qty <= 1) {
                          alert("최소 주문수량은 1개 입니다.");
                          return setQty(1);
                        }
                        setQty((prev) => --prev);
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={qty}
                      onChange={onChangeQty}
                      onBlur={(e) => {
                        if (e.target.value <= 1) {
                          alert("최소 주문수량은 1개 입니다.");
                          return setQty(1);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        setQty((prev) => ++prev);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="price">
                    ₩ {toKRW(product?.discountPrice * qty)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="product-right-button">
            {isCartOpen && (
              <div className="cart-alert">
                <div className="cart-alert-close">
                  <CloseIcon
                    className="closeIcon"
                    onClick={altIsCartOpen(false)}
                  />
                </div>
                <p>장바구니로 이동하시겠습니까?</p>
                <button onClick={() => navigate("/cart")}>장바구니 이동</button>
              </div>
            )}
            <button className="cart" onClick={addCart()}>
              카트 담기
            </button>
            <button type="button" className="purchase" onClick={addCart("now")}>
              바로 구매
            </button>
          </div>
        </div>
      </div>

      <ReviewList />
    </>
  );
}

export default Products;
