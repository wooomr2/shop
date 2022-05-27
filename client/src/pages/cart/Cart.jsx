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

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const totalQty = useSelector(selectTotalQty);
  const totalPrice = useSelector(selectTotalPrice);
  const user = JSON.parse(localStorage.getItem("user"));

  const createCheckoutSession = async () => {
    try {
      const res = await axios.post("/stripe/checkout_session", {
        cartItems,
        email: user.email,
      });

      console.log(res.data);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart">
      cart
      {/* Left */}
      <div>
        {/* ItemList */}
        <div>
          <h1>{cartItems ? "Your Shopping Cart" : "Cart is empty"}</h1>

          {cartItems?.map((cartItem, idx) => (
            <CartItem key={idx} cartItem={cartItem} />
          ))}
        </div>
        <button onClick={() => dispatch(clearCart())}>카트 초기화</button>
        {user && (
          <button onClick={() => dispatch(updateCartItems(cartItems))}>
            카트 저장
          </button>
        )}
      </div>
      <div>
        <p>total Qty: {totalQty}</p>
        <p>total Price: {totalPrice}</p>
        <button onClick={createCheckoutSession} disabled={!user}>
          stripe로 결제하기
        </button>
         <button onClick={()=>navigate("/checkout")} disabled={!user}>
          결제
        </button>
      </div>
    </div>
  );
}

export default Cart;
