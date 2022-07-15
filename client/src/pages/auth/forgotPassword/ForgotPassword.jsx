import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearState, forgotPassword } from "../../../slice/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { msg, isLoading, error } = useSelector((store) => store.auth);
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    
    dispatch(forgotPassword(email));

    setTimeout(() => {
      dispatch(clearState());
    }, 5000);
  };

  return (
    <div className="forgotpassword">
      <form onSubmit={onSubmit}>
        <h3 className="title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {msg && <span className="success-message">{msg}</span>}
        <div>
          <p>이메일 입력 후 전송하세요</p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">
          Send Email
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
