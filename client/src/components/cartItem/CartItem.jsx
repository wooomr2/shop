import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeItem } from "../../slice/cartSlice";
import publicURL from "../../utils/publicURL";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function CartItem({ cartItem, onlyInfo = false }) {
  const dispatch = useDispatch();
  const { _id, name, img, price, qty, size } = cartItem;

  return (
    <div style={{ display: "flex" }}>
      <div>
        <p>name: {name}</p>
        <p>price: {price}</p>
        <p>사이즈: {size}</p>
      </div>
      <div>
        <img src={publicURL(img)} alt="" width="50" height="50" />
      </div>
      {onlyInfo ? (
        <p>{qty}</p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <KeyboardArrowUpIcon onClick={() => dispatch(increaseQty(_id))} />
            <p>{qty}</p>
            <KeyboardArrowDownIcon
              onClick={() => {
                if (qty === 1) {
                  dispatch(removeItem(_id));
                } else {
                  dispatch(decreaseQty(_id));
                }
              }}
            />
          </div>
          <button onClick={() => dispatch(removeItem(_id))}>삭제</button>
        </>
      )}
    </div>
  );
}

export default CartItem;
