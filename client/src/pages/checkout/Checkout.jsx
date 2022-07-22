import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/addressForm/AddressForm";
import CartItem from "../../components/cartItem/CartItem";
import useInput from "../../hooks/useInput";
import { selectTotalPrice, selectTotalQty } from "../../slice/cartSlice";
import { addOrder, getUser } from "../../slice/userSlice";
import toKRW from "../../utils/toKRW";
import "./checkout.scss";

function CheckoutItem({ title, children }) {
  return (
    <div className="checkoutItem">
      <div className="checkoutItem-title">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, cartItem } = useSelector((store) => store.cart);
  const { user, addresses } = useSelector((store) => store.user);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQty = useSelector(selectTotalQty);
  const [formType, setFormType] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [usedPoint, onChangeUsedPoint] = useInput(0);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleOrderSubmit = () => {
    const paymentPrice = cartItem[0]?.price
      ? cartItem[0].price - usedPoint
      : totalPrice - usedPoint;

    const order = {
      user,
      address: selectedAddress,
      items: cartItem[0]?._id ? cartItem : cartItems,
      totalQty: cartItem[0]?.qty ? cartItem[0].qty : totalQty,
      totalPrice:cartItem[0]?.price ? cartItem[0].price : totalPrice,
      usedPoint,
      paymentPrice,
      paymentType: "card",
      paymentStatus: "pending",
    };

    dispatch(addOrder(order));
    navigate("/success", { replace: true });
    // navigate("/stripe", {state: order});
  };

  return (
    <div className="checkout-container">
    <div className="checkout-title">
      <h2>CHECK OUT</h2>
    </div>

    <div className="checkout-wrapper">
      <CheckoutItem title={"상품 정보"}>
        {cartItem.length > 0 ? (
          <CartItem cartItem={cartItem[0]} onlyInfo={true} />
        ) : (
          cartItems?.map((cartItem) => (
            <CartItem
              key={cartItem._id + cartItem.size}
              cartItem={cartItem}
              onlyInfo={true}
            />
          ))
        )}
        <div className="product-total">
          <div className="product-total-item">
            <h4>총계</h4>
            <h4>{cartItem[0]?.qty ? cartItem[0].qty : totalQty}</h4>
          </div>
          <div className="product-total-item">
            <h4>총금액</h4>
            <h4>₩ {toKRW(cartItem[0]?.price ? cartItem[0].price : totalPrice)}</h4>
          </div>
        </div>
      </CheckoutItem>

      <CheckoutItem title={"주문자 정보"}>
        {user && (
          <div className="buyer-info">
            <div className="buyer-info-item">
              <p className="item-left">이름</p>
              <p className="item-right">{user.username}</p>
            </div>
            <div className="buyer-info-item">
              <p className="item-left">이메일</p>
              <p className="item-right">{user.email}</p>
            </div>
            <div className="buyer-info-item">
              <p className="item-left">연락처</p>
              <p className="item-right">{user.mobile}</p>
            </div>
          </div>
        )}
      </CheckoutItem>

      <CheckoutItem title={"배송 정보"}>
        <div className="shipping-content">
          <div className="shipping-item">
            <div className="shipping-item-left">배송지 선택</div>
            <div className="shipping-selection">
              <div>
                <input
                  type="radio"
                  id="new"
                  name="destination"
                  value="new"
                  onClick={() => {
                    setFormType("add");
                    setEnableInput(false);
                  }}
                  defaultChecked={formType === "add" ? true : false}
                />{" "}
                <label htmlFor="new">신규 배송지</label>
              </div>
              {addresses?.map((address) => (
                <div key={address._id}>
                  <input
                    type="radio"
                    id={address.name}
                    name="destination"
                    value={address.name}
                    onClick={() => {
                      setSelectedAddress(address);
                      setFormType("update");
                    }}
                  />{" "}
                  <label htmlFor={address.name}>{address.name}</label>
                </div>
              ))}
            </div>
          </div>
          {formType === "add" ? (
            <AddressForm
              enableInput={enableInput}
              setEnableInput={setEnableInput}
            />
          ) : (
            <AddressForm
              selectedAddress={selectedAddress}
              enableInput={enableInput}
              setEnableInput={setEnableInput}
            />
          )}
        </div>
      </CheckoutItem>

      <CheckoutItem title={"결제 정보"}>
        <div className="buyer-info">
          <div className="buyer-info-item">
            <p className="item-left">마일리지</p>
            <p className="item-right">{user.point}</p>
          </div>
          <div className="buyer-info-item">
            <p className="item-left">사용 마일리지</p>
            <div className="item-right">
              <input type="number" onChange={onChangeUsedPoint} />
            </div>
          </div>
          <div className="buyer-info-item">
            <p className="item-left total">총 결제금액</p>
            <div className="item-right">
              <p className="total">
                ₩{" "}
                {cartItem[0]?.price
                  ? toKRW(cartItem[0]?.price - usedPoint)
                  : toKRW(totalPrice - usedPoint)}
              </p>
            </div>
          </div>
        </div>
      </CheckoutItem>

      <button className="checkout-btn" onClick={handleOrderSubmit}>
        결제하기
      </button>
    </div>
  </div>
  );
}

export default Checkout;
