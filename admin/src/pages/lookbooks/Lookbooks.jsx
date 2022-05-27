import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LookbookModal from "../../components/modals/LookbookModal";
import { deleteLookbook } from "../../slice/lookbookSlice";
import { openModal } from "../../slice/modalSlice";

function Screens() {
  const dispatch = useDispatch();
  const { lookbooks } = useSelector((store) => store.lookbook);

  return (
    <div>
      <button onClick={() => dispatch(openModal("addLookbook"))}>add</button>
      <LookbookModal />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {lookbooks?.map((lookbook, i) => (
            <tr key={i}>
              <td>
                <Link to={`/lookbooks/${lookbook._id}`} state={lookbook}>
                  {lookbook.name}
                </Link>
              </td>
              <td>{lookbook.description}</td>
              <td>
                <button onClick={() => dispatch(deleteLookbook(lookbook._id))}>
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

export default Screens;
