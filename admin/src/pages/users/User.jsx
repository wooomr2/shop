import { Cancel } from "@mui/icons-material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../../slice/userSlice";
import publicURL from "../../utils/publicURL";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = location.state;
  const { _id, roles, email, mobile, point, createdAt, updatedAt } = user;

  const [username, setUsername] = useState(user.username);
  const [profileImg, setProfileImg] = useState(user.profileImg);

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
    <div className="user">
      <button onClick={() => navigate(-1)}>목록으로</button>

      <div>
        <p>ID : {_id}</p>
        <div>
          권한 :{" "}
          {user.roles &&
            Object.keys(user?.roles).map((role, i) => <p key={i}>{role}</p>)}
        </div>
        <p>이메일 : {email}</p>
        <p>핸드폰번호 : {mobile}</p>
        <p>포인트 : {point}</p>
        <p>생성일 : {createdAt}</p>
        <p>최근방문일 : {updatedAt}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {profileImg && (
          <div>
            <img
              src={
                profileImg instanceof File
                  ? URL.createObjectURL(profileImg)
                  : publicURL (profileImg)
              }
              alt=""
              height="50"
            />
            <Cancel onClick={() => setProfileImg("")} />
          </div>
        )}

        <label htmlFor="file">
          <PermMediaIcon />
          <span>Profile images</span>
          <input
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            style={{ display: "none" }}
            onChange={(e) => setProfileImg(e.target.files[0])}
          />
        </label>

        <button type="submit">submit</button>
        <button type="reset" onClick={resetState}>
          reset
        </button>
      </form>
    </div>
  );
}

export default User;
