import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearState, resetPassword } from "../../../slice/authSlice";
import "./resetPassword.scss"

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, msg } = useSelector((store) => store.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams();

  const onSumbit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      return alert("Passwords don't match");
    }

    dispatch(resetPassword({ password, resetToken: params.resetToken }));

    setTimeout(() => {
      dispatch(clearState());
    }, 5000);
  };

  return (
    <div className="resetpassword">
    <div className="resetpassword-title">
      <h3 className="title">Reset Password</h3>
    </div>

    <form onSubmit={onSumbit} className="resetpassword-form">
      <div className="box">
        <input
          type="password"
          required
          id="password"
          placeholder="Enter new password"
          autoComplete="true"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">New Password</label>
      </div>

      <div className="box">
        <input
          type="password"
          required
          id="confirmpassword"
          placeholder="Confirm new password"
          autoComplete="true"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="confirmpassword">Confirm New Password</label>
      </div>
      <button type="submit">Reset Password</button>
    </form>

    <button onClick={() => navigate(`/`)}>Go Home</button>
    {error && <span className="error-message">{error} </span>}
    {msg && (
      <span className="success-message">
        <p>{msg}</p>
      </span>
    )}
  </div>
  );
}

export default ResetPassword;
