import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollectionModal from "../../components/modals/CollectionModal";
import Pagination from "../../components/pagination/Pagination";
import { deleteCollection } from "../../slice/collectionSlice";
import { openModal } from "../../slice/modalSlice";

function Collections() {
  const dispatch = useDispatch();
  const { collections } = useSelector((store) => store.collection);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  return (
    <div className="list">
      <div className="list-btn">
        <h2>OUR COLLECTIONS</h2>
        <button onClick={() => dispatch(openModal("addCollection"))}>
          add
        </button>
      </div>
      <CollectionModal />

      <table className="list-table">
        <thead>
          <tr className="thead-tr">
            <th>Name</th>
            <th>Description</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {collections
            ?.slice(perPage * (currentPage - 1), perPage * currentPage)
            .map((collection, i) => (
              <tr key={i} className="tbody-tr">
                <td className="tbody-tr-name">
                  <Link
                    to={`/collections/${collection._id}`}
                    state={collection}
                    className="navi"
                  >
                    {collection.name}
                  </Link>
                </td>
                <td>{collection.description}</td>
                <td>
                  <button
                    onClick={() => dispatch(deleteCollection(collection._id))}
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
        total={collections.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Collections;
