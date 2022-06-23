import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Term from "../../../components/term/Term";
import useInput from "../../../hooks/useInput";
import useToggle from "../../../hooks/useToggle";
import { clearMatchResult, matchEmail, signup } from "../../../slice/authSlice";
import "./signup.scss";


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchResult = useSelector((store) => store.auth.mathResult);
  const user = sessionStorage.getItem("user");

  const emailRef = useRef();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 일치 검사
  const [username, onChangeUsername] = useInput("");
  const [mobile, onChangeMobile] = useInput("");

  //약관
  const [isTermOpen, toggleIsTermOpen] = useToggle(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      // 비밀번호가 일치하지 않는 경우
      return setPasswordError(true);
    }
    if (!term) {
      // 약관 동의를 누르지 않는 경우
      return setTermError(true);
    }
    const user = {
      username,
      email,
      password,
      mobile,
    };
    dispatch(signup(user));
    return navigate("/");
  };

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!email) dispatch(clearMatchResult());
  }, [email]);

  if (user) return <Navigate to="/" />;

  return (
    <div className="signup">
      <div className="signup-title">
        <h3>SIGN UP</h3>
      </div>
      <div className="signup-wrapper">
        <form onSubmit={onSubmit} className="signupForm">
          <div className="signupForm-item">
            <label htmlFor="user-email">이메일</label>
            <input
              id="user-email"
              type="email"
              value={email}
              placeholder="EMAIL"
              required
              ref={emailRef}
              onChange={onChangeEmail}
              onBlur={() => {
                if (email?.length > 0) dispatch(matchEmail(email));
              }}
            />
            {matchResult && <div className="matchResult">{matchResult}</div>}
          </div>

          <div className="signupForm-item">
            <label htmlFor="user-password">비밀번호</label>
            <input
              id="user-password"
              type="password"
              value={password}
              placeholder="PASSWORD"
              required
              onChange={onChangePassword}
            />
          </div>
          
          <div className="signupForm-item">
            <label htmlFor="user-passwordCheck">비밀번호 확인</label>
            <input
              id="user-passwordCheck"
              type="password"
              value={passwordCheck}
              placeholder="CONFIRM PASSWORD"
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <div className="passwordResult">
                비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>

          <div className="signupForm-item">
            <label htmlFor="user-name">이름</label>
            <input
              id="user-name"
              type="text"
              value={username}
              placeholder="NAME"
              required
              onChange={onChangeUsername}
            />
          </div>

          <div className="signupForm-item">
            <label htmlFor="user-phoneNumber">연락처</label>
            <input
              id="user-phoneNumber"
              type="text"
              value={mobile}
              placeholder="PHONE NUMBER"
              required
              onChange={onChangeMobile}
            />
          </div>

          <div className="signupForm-item-term">
            <div className="term-check">
              <span onClick={toggleIsTermOpen}>
                이용약관과 개인정보 수집 및 이용
              </span>{" "}
              동의
              <input type="checkbox" value={term} onChange={onChangeTerm} />
            </div>
            {isTermOpen && (
              <div className="term-info">
                <Term />
              </div>
            )}
            {termError && (
              <div className="term-unchecked">약관에 동의하셔야 합니다.</div>
            )}
          </div>

          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
