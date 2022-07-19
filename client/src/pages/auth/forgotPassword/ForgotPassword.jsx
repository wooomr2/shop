import { useDispatch, useSelector } from "react-redux";
import { clearState, forgotPassword } from "../../../slice/authSlice";
import "./forgotPassword.scss";
import useInput from "../../../hooks/useInput";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { msg, isLoading, error } = useSelector((store) => store.auth);
  const [email, onChangeEmail] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));

    setTimeout(() => {
      dispatch(clearState());
    }, 5000);
  };

  return (
    <>
      <Header />

      <div className="forgotpassword">
        <div className="forgotpassword-title">
          <h3>Forgot Password</h3>
        </div>

        <form onSubmit={onSubmit} className="forgotpassword-form">
          <div className="box">
            <input
              type="email"
              required
              id="email"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
            <label htmlFor="email">Email</label>
          </div>

          <button type="submit">Send Email</button>
        </form>

        {error && <span className="error-message">{error}</span>}
        {msg && !error && <span className="success-message">{msg}</span>}
      </div>

      <Footer />
    </>
  );
}

export default ForgotPassword;
