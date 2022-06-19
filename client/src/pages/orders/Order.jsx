import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../slice/userSlice";

function Order() {
  const params = useParams();
  const dispatch = useDispatch();
  const { order, shippingAddress } = useSelector(store=>store.user);

  useEffect(() => {
    dispatch(getOrder(params.id));
  }, [params]);

  console.log(order, shippingAddress);

  return <div>Order</div>;
}

export default Order;
