import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Term from "../../../components/term/Term";
import useInput from "../../../hooks/useInput";
import useToggle from "../../../hooks/useToggle";
import { clearMatchResult, matchEmail, signup } from "../../../slice/authSlice";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./signup.scss";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchResult = useSelector((store) => store.auth.matchResult);
  const user = localStorage.getItem("user");

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 일치 검사
  const [username, onChangeUsername] = useInput("");
  const [mobile, onChangeMobile] = useInput("");

  //약관
  const [isTermOpen, toggleIsTermOpen] = useToggle(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  // 정규표현식
  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,16}$/;

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

    if (!regPhone.test(mobile)) {
      alert("연락처를 제대로 입력해주세요. (ex. 010-0000-0000)");
      return phoneRef.current.focus();
    }

    if (!regPassword.test(password)) {
      alert("비밀번호를 형식에 맞춰 입력해주세요.");
      setPassword("");
      setPasswordCheck("");
      return passwordRef.current.focus();
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
    <>
      <Header />
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
                placeholder="email@example.com"
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
                ref={passwordRef}
                id="user-password"
                type="password"
                value={password}
                placeholder="6 ~ 16자 및 최소 하나의 문자, 숫자, 특수 문자"
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
                placeholder="Confirm Password"
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
                placeholder="Name"
                required
                onChange={onChangeUsername}
              />
            </div>

            <div className="signupForm-item">
              <label htmlFor="user-phoneNumber">연락처</label>
              <input
                ref={phoneRef}
                id="user-phoneNumber"
                type="text"
                value={mobile}
                placeholder="010-0000-0000"
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
      <Footer />
    </>
  );
}

export default Signup;
