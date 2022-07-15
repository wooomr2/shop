import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearState, resetPassword } from "../../../slice/authSlice";

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
      <form onSubmit={onSumbit}>
        <h3 className="title">Reset Password</h3>
        {error && <span className="error-message">{error} </span>}
        {msg && (
          <span className="success-message">
            {msg} <Link to="/signin">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
        <button onClick={()=>navigate(`/`)}>홈으로</button>
    </div>
  );
}

export default ResetPassword;
