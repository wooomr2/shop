import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, signin } from "../../slice/authSlice";
import "./signin.scss";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error } = useSelector(
    (store) => store.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-box">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="email">Password</label>
        </div>

        <button type="submit">로그인</button>
      </form>
    </div>
  </div>
  );
}

export default Signin;
