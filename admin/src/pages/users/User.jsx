import { Cancel } from "@mui/icons-material";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../../slice/userSlice";
import publicURL from "../../utils/publicURL";
import moment from "moment";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = location.state;
  const { _id, roles, email, mobile, point, createdAt, updatedAt } = user;

  const [username, setUsername] = useState(user.username);
  const [profileImg, setProfileImg] = useState(user.profileImg);

  const fileRef = useRef(null);
  const onClickFileRef = () => {
    fileRef.current.click();
  };

  const resetState = () => {
    setUsername(user.username);
    setProfileImg(user.profileImg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("_id", _id);
    form.append("roles", JSON.stringify(roles));
    form.append("email", email);
    form.append("mobile", mobile);
    form.append("point", point);
    form.append("username", username);
    form.append("profileImg", profileImg);

    dispatch(updateUser(form));
    navigate(-1);
  };

  return (
    <div className="content">
    <div className="content-top">
      <div className="content-top-id">
        <p>ID : {_id}</p>
      </div>

      <button onClick={() => navigate(-1)}>목록으로</button>
    </div>

    <div className="content-form">
      <div className="item">
        <p className="item-left">권한</p>
        <p>
          {user.roles &&
            Object.keys(user?.roles).map((role, i) => <p key={i}>{role}</p>)}
        </p>
      </div>
      <div className="item">
        <p className="item-left">이메일</p>
        <p>{email}</p>
      </div>
      <div className="item">
        <p className="item-left">핸드폰</p>
        <p>{mobile}</p>
      </div>
      <div className="item">
        <p className="item-left">포인트</p>
        <p>{point}</p>
      </div>
      <div className="item">
        <p className="item-left">가입일</p>
        <p>{moment(createdAt).format("YYYY-MM-DD")}</p>
      </div>
      <div className="item">
        <p className="item-left">최근방문일</p>
        <p>{moment(updatedAt).format("YYYY-MM-DD")}</p>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="content-form">
      <div className="item">
        <label htmlFor="name" className="item-left">
          성함
        </label>
        <input
          id="name"
          placeholder="Name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="item">
        <label htmlFor="" className="item-left">
          프로필 이미지
        </label>
        <div className="item-img">
          {profileImg && (
            <div className="item-img-wrapper">
              <img
                src={
                  profileImg instanceof File
                    ? URL.createObjectURL(profileImg)
                    : publicURL(profileImg)
                }
                alt=""
                height="50"
              />
              {/* <Cancel onClick={() => setProfileImg("")} /> */}
            </div>
          )}
        </div>
      </div>
      <div className="item">
        <label htmlFor="" className="item-left"></label>
        <button type="button" className="item-btn" onClick={onClickFileRef}>
          제품 사진 수정
        </button>
        <input
          ref={fileRef}
          type="file"
          id="file"
          multiple
          accept=".png, .jpeg, .jpg"
          onChange={(e) => setProfileImg(e.target.files[0])}
        />
      </div>

      <div className="btnWrapper">
        <button type="submit">수정</button>
        <button type="reset" onClick={resetState}>
          취소
        </button>
      </div>
    </form>
  </div>
  );
}

export default User;
