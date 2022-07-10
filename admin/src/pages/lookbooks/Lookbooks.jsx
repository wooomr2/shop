import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LookbookModal from "../../components/modals/LookbookModal";
import Pagination from "../../components/pagination/Pagination";
import { deleteLookbook } from "../../slice/lookbookSlice";
import { openModal } from "../../slice/modalSlice";

function Lookbooks() {
  const dispatch = useDispatch();
  const { lookbooks } = useSelector((store) => store.lookbook);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  return (
    <div className="list">
      <div className="list-btn">
        <h2>OUR LOOKBOOKS</h2>
        <button onClick={() => dispatch(openModal("addLookbook"))}>add</button>
      </div>
      <LookbookModal />

      <table className="list-table">
        <thead>
          <tr className="thead-tr">
            <th>Name</th>
            <th>Description</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {lookbooks
            ?.slice(perPage * (currentPage - 1), perPage * currentPage)
            .map((lookbook, i) => (
              <tr key={i} className="tbody-tr">
                <td className="tbody-tr-name">
                  <Link
                    to={`/lookbooks/${lookbook._id}`}
                    state={lookbook}
                    className="navi"
                  >
                    {lookbook.name}
                  </Link>
                </td>
                <td>{lookbook.description}</td>
                <td>
                  <button
                    onClick={() => dispatch(deleteLookbook(lookbook._id))}
                  >
                    del
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        perPage={perPage}
        total={lookbooks.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Lookbooks;
