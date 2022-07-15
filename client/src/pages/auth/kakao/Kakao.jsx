import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { kakao } from "../../../slice/authSlice";
import { addCartItems } from "../../../slice/cartSlice";

function Kakao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.cartItems);
  const {isLoading, isAuthenticated, error} = useSelector(store=>store.auth)
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");

  useEffect(() => {
    dispatch(kakao(code));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(addCartItems(cartItems));
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return <div>Kakao</div>;
}

export default Kakao;
