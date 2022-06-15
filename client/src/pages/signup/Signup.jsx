import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostCodeModal from "../../components/postCodeModal/PostCodeModal";
import Term from "../../components/term/Term";
import { matchEmail, signup, clearMatchResult } from "../../slice/authSlice";
import "./signup.scss"

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 일치 검사
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [isTermOpen, setIsTermOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const { matchResult } = useSelector((store) => store.auth);

  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const onChangeName = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [username]
  );

  const onChangePhoneNumber = useCallback((e) => {
    setMobile(e.target.value);
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeAddress2 = useCallback(
    (e) => {
      setAddress2(e.target.value);
    },
    [address2]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(
    (e) => {
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
    },
    [email, password, passwordCheck, term]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%
      `;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!email.length) dispatch(clearMatchResult());
  }, [email]);

  return (
    <div className="signup">
    {isModalOpen && (
      <PostCodeModal
        onClick={() => setIsModalOpen((prev) => !prev)}
        setPinCode={setPinCode}
        setAddress1={setAddress1}
      />
    )}
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
            onChange={onChangeName}
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
            onChange={onChangePhoneNumber}
          />
        </div>
        <div className="signupForm-item">
          <label htmlFor="user-address">주소</label>
          <div className="zipcode-wrapper">
            <input
              type="text"
              value={pinCode}
              placeholder="ZIP CODE"
              required
              disabled
            />
            <div
              className="zipcode-button"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              <span>우편번호 찾기</span>
            </div>
          </div>
          <input
            type="text"
            value={address1}
            placeholder="ADDRESS 1"
            required
            disabled
          />
          <input
            type="text"
            value={address2}
            placeholder="ADDRESS 2"
            required
            onChange={onChangeAddress2}
          />
        </div>
        <div className="signupForm-item-term">
          <div className="term-check">
            <span onClick={() => setIsTermOpen((prev) => !prev)}>
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
