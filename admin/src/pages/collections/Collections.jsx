import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CollectionModal from "../../components/modals/CollectionModal";
import { deleteCollection } from "../../slice/collectionSlice";
import { openModal } from "../../slice/modalSlice";

function Collections() {
  const dispatch = useDispatch();
  const { collections } = useSelector((store) => store.collection);

  return (
    <div>
      <button onClick={() => dispatch(openModal("addCollection"))}>add</button>
      <CollectionModal />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((collection, i) => (
            <tr key={i}>
              <td>
                <Link to={`/collections/${collection._id}`} state={collection}>
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
