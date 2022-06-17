import CartItem from "../../components/cartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectTotalPrice,
  selectTotalQty,
  updateCartItems,
} from "../../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "./cart.scss"

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const totalQty = useSelector(selectTotalQty);
  const totalPrice = useSelector(selectTotalPrice);
  const user = JSON.parse(sessionStorage.getItem("user"));

  // const createCheckoutSession = async () => {
  //   try {
  //     const res = await axios.post("/stripe/checkout_session", {
  //       cartItems,
  //       email: user.email,
  //     });

  //     console.log(res.data);
  //     window.location.href = res.data.url;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="cart-container">
    <div className="cart-wrapper">
      <div className="cart-title">
        <h2>
          {cartItems?.length > 0 ? "Your Shopping Cart" : "Cart is empty"}
        </h2>
      </div>
      <div className="cart-list">
        {cartItems?.map((cartItem) => (
          <CartItem key={cartItem._id} cartItem={cartItem} />
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
        {user && (
          <button onClick={() => dispatch(updateCartItems(cartItems))}>
            카트 저장
          </button>
        )}
      </div>
      <div className="checkout-button">
        <button className="checkout-button-general" onClick={() => navigate("/checkout")} disabled={!user}>
          결제하기
        </button>
        <button className="checkout-button-back" onClick={() => navigate(-1)} disabled={!user}>
          쇼핑 계속하기
        </button>
      </div>
    </div>
  </div>
  );
}

export default Cart;
