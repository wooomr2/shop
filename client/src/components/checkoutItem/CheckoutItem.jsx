import "./checkoutItem.scss";

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

export default CheckoutItem;
