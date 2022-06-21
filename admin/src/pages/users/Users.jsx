import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../../slice/userSlice";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.user);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>roles</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={i}>
              <td>{user._id}</td>
              <td>
                <Link to={`/users/${user.username}`} state={user}>
                  {user.username}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>
                {user.roles && Object.keys(user?.roles).map((role, i) => (
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
