import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/cartItem/CartItem";
import {
  clearCart,
  selectTotalPrice,
  selectTotalQty
} from "../../slice/cartSlice";
import "./cart.scss";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const totalQty = useSelector(selectTotalQty);
  const totalPrice = useSelector(selectTotalPrice);
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <div className="cart-title">
          <h2>
            {cartItems?.length > 0 ? "Your Shopping Cart" : "Cart is empty"}
          </h2>
        </div>
        <div className="cart-list">
          {cartItems?.map((cartItem, i) => (
            <CartItem key={i} cartItem={cartItem} />
          ))}
        </div>
        <div className="cart-total">
          <div className="cart-total-item">
            <h4>총계</h4>
            <h4>{totalQty}</h4>
          </div>
          <div className="cart-total-item">
            <h4>총금액</h4>
            <h4>₩ {totalPrice}</h4>
          </div>
        </div>
        <div className="cart-button">
          <button onClick={() => dispatch(clearCart())}>카트 초기화</button>
        </div>
        <div className="checkout-button">
          <button
            className="checkout-button-general"
            onClick={() => navigate("/checkout")}
            disabled={!user}
          >
            결제하기
          </button>
          <button
            className="checkout-button-back"
            onClick={() => navigate(-1)}
            disabled={!user}
          >
            쇼핑 계속하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
