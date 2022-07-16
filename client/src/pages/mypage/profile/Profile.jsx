import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../../hooks/useInput";
import {
  clearError,
  matchPassword,
  updateProfile,
} from "../../../slice/authSlice";
import "./profile.scss";

function Profile() {
  const dispatch = useDispatch();
  const { matchPwd, error } = useSelector((store) => store.auth);
  const user = useSelector((store) => store.user.user);
  const { email, username, mobile, provider } = user;

  const [name, onChangeName, setName] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const checkPassword = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(matchPassword(user));
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!regPhone.test(mobile))
      return alert("연락처를 제대로 입력해주세요. (ex. 010-0000-0000)");
    if (password.length > 0 && password.length < 6)
      return alert("비밀번호는 최소 6자리여야 합니다");

    if (password.length > 0 && password !== passwordCheck)
      return alert("비밀번호가 일치하지 않습니다.");

    const user = {
      username: name,
      email,
      password,
      mobile: phone,
    };

    dispatch(updateProfile(user));
  };

  useEffect(() => {
    setName(username);
    setPhone(mobile);
  }, [user]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    setPassword("");
    setPasswordCheck("");
  }, [matchPwd]);

  return (
    <div className="profile">
      {!matchPwd && !provider && (
        <div className="profile-item">
          <div className="profile-item-title">
            <h2>비밀번호 확인</h2>
          </div>

          <div className="profile-item-content">
            <div className="alert">
              <p>
                {username} 님의 회원정보를 안전하게 보호하기 위해 <br />
                비밀번호를 한번 더 확인해 주세요.
              </p>
            </div>

            <form onSubmit={checkPassword} className="form">
              <div className="form-input">
                <label htmlFor="user-password">비밀번호</label>
                <input
                  type="password"
                  id="user-password"
                  placeholder="Password"
                  onChange={onChangePassword}
                />
              </div>
              <button className="form-btn" type="submit">
                확인
              </button>
            </form>
          </div>
        </div>
      )}

      {(matchPwd || provider) && (
        <div className="profile-item">
          <div className="profile-item-title">
            <h2>회원정보 수정</h2>
          </div>

          <div className="profile-item-content">
            <form onSubmit={onSubmit} className="modifyForm">
              <div className="modifyForm-input">
                <label htmlFor="user-email" className="modifyForm-input-left">
                  이메일
                </label>
                <input
                  className="modifyForm-input-right"
                  id="user-email"
                  type="email"
                  value={email}
                  disabled
                />
              </div>
              <div className="modifyForm-input">
                <label htmlFor="user-name" className="modifyForm-input-left">
                  이름
                </label>
                <input
                  className="modifyForm-input-right"
                  id="user-name"
                  type="text"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <div className="modifyForm-input">
                <label htmlFor="user-phone" className="modifyForm-input-left">
                  연락처
                </label>
                <input
                  className="modifyForm-input-right"
                  id="user-phone"
                  type="text"
                  value={phone}
                  onChange={onChangePhone}
                />
              </div>
              <div className="modifyForm-input">
                <label
                  htmlFor="user-password"
                  className="modifyForm-input-left"
                >
                  새 비밀번호
                </label>
                <input
                  className="modifyForm-input-right"
                  id="user-password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder={"New Password"}
                />
              </div>
              <div className="modifyForm-input">
                <label
                  htmlFor="user-passwordCheck"
                  className="modifyForm-input-left"
                >
                  새 비밀번호 확인
                </label>
                <input
                  className="modifyForm-input-right"
                  id="user-passwordCheck"
                  type="password"
                  value={passwordCheck}
                  placeholder="Confirm Password"
                  onChange={onChangePasswordCheck}
                />
              </div>
              <button className="modifyForm-btn" type="submit">
                확인
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
