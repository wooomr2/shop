import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScreenModal from "../../components/modals/ScreenModal";
import { openModal } from "../../slice/modalSlice";
import { deleteScreen } from "../../slice/screenSlice";

function Screens() {
  const dispatch = useDispatch();
  const { screens } = useSelector((store) => store.screen);

  return (
    <div>
      <button onClick={() => dispatch(openModal("addScreen"))}>add</button>
      <ScreenModal />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {screens?.map((screen, i) => (
            <tr key={i}>
              <td>
                <Link to={`/screens/${screen._id}`} state={screen}>
                  {screen.title}
                </Link>
              </td>
              <td>{screen.description}</td>
              <td>{screen.category?.name}</td>
              <td>
                <button onClick={() => dispatch(deleteScreen(screen._id))}>
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
