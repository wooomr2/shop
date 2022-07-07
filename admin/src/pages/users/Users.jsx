import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../slice/userSlice";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="list">
       <div className="list-btn">
      <h2>OUR USERS</h2>
    </div>

      <table className="list-table">
        <thead>
          <tr className="thead-tr">
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={i} className="tbody-tr">
              <td>{user._id}</td>
              <td className="tbody-tr-name">
                <Link
                  to={`/users/${user.username}`}
                  state={user}
                  className="navi"
                >
                  {user.username}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>
                {user.roles &&
                  Object.keys(user?.roles).map((role, i) => (
                    <p key={i}>{role}</p>
                  ))}
              </td>
              <td>
                <button onClick={() => dispatch(deleteUser(user._id))}>
                  del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
