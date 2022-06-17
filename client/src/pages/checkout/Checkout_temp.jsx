import "./checkout.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress } from "../../slice/userSlice";
import { selectTotalPrice, selectTotalQty } from "../../slice/cartSlice";
import CartItem from "../../components/cartItem/CartItem";
import AddressList from "../../components/address/AddressList";
import { useNavigate } from "react-router-dom";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQty = useSelector(selectTotalQty);
  const { latestOrder, clearLatestOrder } = useSelector((store) => store.user);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [confirmedAddress, setConfirmedAddress] = useState("");
  const [isItemConfirmed, setIsItemConfirmed] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [ready, setReady] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  useEffect(() => {
    user && dispatch(getAddress(user._id));
    // dispatch(clearLatestOrder());
  }, []);

  useEffect(() => {
    user && confirmedAddress && isItemConfirmed && paymentType
      ? setReady(true)
      : setReady(false);
  }, [user, confirmedAddress, isItemConfirmed, paymentType]);

  const handleOrderSubmit = () => {
    const items = cartItems.map((item) => ({
      product: item._id,
      purchasedPrice: item.price,
      purchasedQty: item.qty,
    }));
    const order = {
      user: user._id,
      address: confirmedAddress._id,
      totalPrice,
      totalQty,
      items,
      paymentStatus: "pending",
      paymentType,
    };

    console.log(order);
    dispatch(addOrder(order));
    setIsOrderConfirmed(true);
  };

  // useEffect(() => {
  //   if (isOrderConfirmed && latestOrder) {
  //     navigate(`/success`);
  //   } else {
  //     navigate("/failure");
  //   }
  // }, [latestOrder]);

  return (
    <div className="checkout">
      <CheckoutStep
        stepNumber={"1"}
        title={"구매자 정보"}
        active={!user}
        body={
          user ? (
            <div className="loggedIn">
              <span>이름 : {user.username}</span>
              <span>이메일 : {user.email}</span>
            </div>
          ) : (
            <div></div>
          )
        }
      />
      <CheckoutStep
        stepNumber={"2"}
        title={"배송 정보"}
        active={!confirmedAddress}
        body={
          confirmedAddress ? (
            <div>
              <span>{confirmedAddress.name}</span>
              <span>{confirmedAddress.contactNumber}</span>
              <span>{confirmedAddress.pinCode}</span>
              <span>
                {confirmedAddress.address1}-{confirmedAddress.address2}
              </span>
              <span>{confirmedAddress.claim}</span>
              <button onClick={() => setConfirmedAddress("")}>
                배송지변경
              </button>
            </div>
          ) : (
            <AddressList setConfirmedAddress={setConfirmedAddress} />
          )
        }
      />

      <CheckoutStep
        stepNumber={"3"}
        title={"상품 정보"}
        active={!isItemConfirmed}
        body={
          <div>
            {isItemConfirmed ? (
              <>
                <span>총 {totalQty}개 상품</span>
                {cartItems?.map((cartItem, idx) => (
                  <CartItem key={idx} cartItem={cartItem} onlyInfo={true} />
                ))}
              </>
            ) : (
              <>
                {cartItems?.map((cartItem, idx) => (
                  <CartItem key={idx} cartItem={cartItem} onlyInfo={false} />
                ))}
              </>
            )}

            <button
              onClick={() => setIsItemConfirmed(isItemConfirmed ? false : true)}
            >
              {isItemConfirmed ? "상품수정" : "상품확정"}
            </button>
          </div>
        }
      />

      <CheckoutStep
        stepNumber={"4"}
        title={"결제 정보"}
        active={!paymentType}
        body={
          <div>
            <span>총 상품가격 : {totalPrice}</span>
            <span>총 결제금액 : {totalPrice}</span>
            <span>-------결제방법---------</span>
            <label>
              <input
                name="paymentType"
                type="radio"
                value="card"
                onClick={(e) => setPaymentType(e.target.value)}
              />
              신용카드
            </label>
            <label>
              <input
                name="paymentType"
                type="radio"
                value="mobile"
                onClick={(e) => setPaymentType(e.target.value)}
              />
              휴대폰
            </label>
            <label>
              <input
                name="paymentType"
                type="radio"
                value="bank"
                onClick={(e) => setPaymentType(e.target.value)}
              />
              계좌이체
            </label>
            <label>
              <input
                name="paymentType"
                type="radio"
                value="noBank"
                onClick={(e) => setPaymentType(e.target.value)}
              />
              무통장입금
            </label>
          </div>
        }
      />

      <button disabled={!ready} onClick={handleOrderSubmit}>
        결제하기
      </button>
    </div>
  );
}

export default Checkout;
