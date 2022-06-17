import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearError, signin } from "../../slice/authSlice";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
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
    if (isAuthenticated) {
      dispatch(clearError());
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div className="signin">
      <form onSubmit={login}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signin;
