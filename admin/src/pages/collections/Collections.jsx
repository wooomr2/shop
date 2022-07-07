import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollectionModal from "../../components/modals/CollectionModal";
import { deleteCollection } from "../../slice/collectionSlice";
import { openModal } from "../../slice/modalSlice";

function Collections() {
  const dispatch = useDispatch();
  const { collections } = useSelector((store) => store.collection);

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
        {collections?.map((collection, i) => (
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
  </div>
  );
}

export default Collections;
