import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeItem } from "../../slice/cartSlice";
import publicURL from "../../utils/publicURL";
import "./cartItem.scss";
import toKRW from "../../utils/toKRW";

function CartItem({ cartItem, onlyInfo = false }) {
  const dispatch = useDispatch();
  const { _id, name, img, price, qty, size, stock } = cartItem;
  const stockQty = stock?.filter((v) => v.size === size);

  const increaseItem = () => {
    if (stockQty[0].qty <= qty)
      return alert(`${stockQty[0].qty}개 이상으로는 재고가 부족합니다.`);
    return dispatch(increaseQty({ _id, size }));
  }

  return (
    <div className="cartItem-wrapper">
      <div className="cartItem-name">
        <h3>{name}</h3>
      </div>
      <div className="cartItem-info">
        <div className="cartItem-img">
          <img src={publicURL(img)} alt="" />
        </div>
        <div className="cartItem-detail">
          <div className="cartItem-detail-left">
            <p>SIZE: {size}</p>
            <p>COLOR: {name}</p>
            <p>PRICE: ₩ {toKRW(price)}</p>
          </div>
          {onlyInfo ? (
            <div className="cartItem-detail-right-qty">
              <p>수량: {qty}</p>
              <p>합계: ₩ {toKRW(qty * price)}</p>
            </div>
          ) : (
            <div className="cartItem-detail-right">
              <div className="cartItem-detail-right-qty">
                <KeyboardArrowUpIcon
                  className="click-btn"
                  onClick={increaseItem}
                />
                <p>{qty}&nbsp;</p>
                <KeyboardArrowDownIcon
                  className="click-btn"
                  onClick={() => {
                    if (qty === 1) {
                      dispatch(removeItem({ _id, size }));
                    } else {
                      dispatch(decreaseQty({ _id, size }));
                    }
                  }}
                />
              </div>
              <button onClick={() => dispatch(removeItem({ _id, size }))}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;
