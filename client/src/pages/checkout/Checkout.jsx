import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/address/AddressForm";
import CartItem from "../../components/cartItem/CartItem";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import { selectTotalPrice, selectTotalQty } from "../../slice/cartSlice";
import { addOrder, getUser } from "../../slice/userSlice";
import "./checkout.scss";


function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { user, addresses } = useSelector((store) => store.user);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQty = useSelector(selectTotalQty);
  const [formType, setFormType] = useState("add");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleOrderSubmit = () => {
    const order = {
      user: user._id,
      address: selectedAddress,
      totalPrice,
      totalQty,
      items: cartItems,
      paymentStatus: "pending",
      paymentType: "card",
    };

    dispatch(addOrder(order));
    navigate("/success", { replace: true });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title">
        <h2>CHECK OUT</h2>
      </div>
      <div className="checkout-wrapper">
      <CheckoutItem title={"상품 정보"}>
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem._id + cartItem.size}
              cartItem={cartItem}
              onlyInfo={true}
            />
          ))}
          <div className="product-total">
            <div className="product-total-item">
              <h4>총계</h4>
              <h4>{totalQty}</h4>
            </div>
            <div className="product-total-item">
              <h4>총금액</h4>
              <h4>₩ {totalPrice}</h4>
            </div>
          </div>
        </CheckoutItem>

        <CheckoutItem title={"주문자 정보"}>
          {user && (
            <div className="buyer-info">
              <div className="buyer-info-left">이름</div>{" "}
              <div>{user.username}</div>
              <div className="buyer-info-left">이메일</div>{" "}
              <div>{user.email}</div>
              <div className="buyer-info-left">연락처</div>{" "}
              <div>{user.mobile}</div>
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
                enableInput={enableInput}
                setEnableInput={setEnableInput}
                selectedAddress={selectedAddress}
              />
            )}
          </div>
        </CheckoutItem>

        <div className="checkout-wrapper-payment">
          <div className="shipping-title">
            <h3>결제 정보</h3>
          </div>
        </div>

        <div>잔여 포인트: {user.point}</div>
        <div onClick={handleOrderSubmit}>결제고고</div>
      </div>
    </div>
  );
}

export default Checkout;
