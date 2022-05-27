import { useState } from "react";
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
  
  const login = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(signin(user));
  };

  if (token) {
    navigate(-1);
    // return <Navigate to="/" />;
  }

  return (
    <div className="signin">
      <form onSubmit={login}>
        <input
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
      <div onClick={() => navigate("/signup")}>회원가입하기</div>
      <div onClick={() => navigate("/forgot_password")}>비밀번호찾기</div>
    </div>
  );
}

export default Signin;
