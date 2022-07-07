import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import { clearError, signin } from "../../../slice/authSlice";
import { addCartItems } from "../../../slice/cartSlice";
import "./signin.scss";
import Header from "../../../components/header/Header"

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cartItems);
  const { isLoading, isAuthenticated, error } = useSelector(
    (store) => store.auth
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const emailRef = useRef();

  const login = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(signin(user));
  };

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(addCartItems(cartItems));
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error]);

  if (user) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      <div className="signinForm-container">
        <div className="signinForm-title">
          <h3>SIGN IN</h3>
        </div>

        <div className="signinForm-wrapper">
          <form onSubmit={login} className="signinForm">
            <div className="form-box">
              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                onChange={setEmail}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-box">
              <input
                type="password"
                placeholder="Password"
                onChange={setPassword}
              />
              <label htmlFor="email">Password</label>
            </div>

            <button type="submit">로그인</button>
          </form>
        </div>

        <div className="navigate-wrapper">
          <div className="navigate-item" onClick={() => navigate("/signup")}>
            회원가입
          </div>
          <div
            className="navigate-item"
            onClick={() => navigate("/forgot_password")}
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
