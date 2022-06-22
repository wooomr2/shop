import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeItem } from "../../slice/cartSlice";
import publicURL from "../../utils/publicURL";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./cartItem.scss";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const { _id, name, img, price, qty, size, discountPrice } = cartItem;

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
            <p>PRICE: ₩ {discountPrice}</p>
          </div>
          <div className="cartItem-detail-right">
            <div className="cartItem-detail-right-qty">
              <KeyboardArrowUpIcon
                className="click-btn"
                onClick={() => dispatch(increaseQty({ _id, size }))}
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
        </div>
      </div>
    </div>
  );
}

export default CartItem;
