import "./signin.scss";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signin } from "../../slice/authSlice";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((store) => store.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  // const login = (e) => {
  //   e.preventDefault();
  //   const user = {
  //     email,
  //     password,
  //   };
  //   dispatch(signin(user));
  // };

  const login = useCallback(
    (e) => {
      e.preventDefault();
      const user = {
        email,
        password,
      };
      dispatch(signin(user));
    },
    [email, password]
  );

  const onClickNavigate = (page) => () => {
    navigate(page);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  if (token) {
    // navigate(-1);
    return <Navigate to="/" />;
  }

  return (
    <div className="signinForm-container">
      <div className="signinForm-title">
        <h3>SIGN IN</h3>
      </div>
      <div className="signinForm-wrapper">
        <form onSubmit={login} className="signinForm">
          <div className="form-box">
            <input type="email" placeholder="Email" onChange={onChangeEmail} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-box">
            <input
              type="password"
              placeholder="Password"
              onChange={onChangePassword}
            />
            <label htmlFor="email">Password</label>
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
      <div className="navigate-wrapper">
        <div className="navigate-item" onClick={onClickNavigate("/signup")}>
          회원가입
        </div>
        <div className="navigate-item" onClick={onClickNavigate("/signup")}>
          비밀번호 찾기
        </div>
      </div>
    </div>
  );
}

export default Signin;
