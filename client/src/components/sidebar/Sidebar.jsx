import "./sidebar.scss";
import "react-simple-tree-menu/dist/main.css";
import TreeMenu, { ItemComponent } from "react-simple-tree-menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentStatus } from "../../slice/categorySlice";

function Sidebar({ brands, setBrands, setCurrentPage }) {
  const { categories } = useSelector((store) => store.category);
  const { brandData } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheck = (e) => {
    setCurrentPage(1);
    e.target.checked
      ? setBrands((prev) => [...prev, e.target.value])
      : setBrands((prev) => prev?.filter((brand) => brand !== e.target.value));
  };
  
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        key: category._id,
        navigateTo: `/${category.slug}/${category._id}`,
        category,
        nodes:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  return (
    <div className="sidebar">
      <TreeMenu
        data={renderCategories(categories)}
        resetOpenNodesOnDataUpdate
        onClickItem={({ key, label, navigateTo, category, ...props }) => {
          navigate(navigateTo);
          setBrands([]);
          setCurrentPage(1);
          dispatch(setCurrentStatus({ key, category }));
        }}
      >
        {({ items }) => (
          <ul className="tree-item-group">
            {items.map(({ key, onClickItem, ...props }) => (
              <ItemComponent key={key} {...props} />
            ))}
          </ul>
        )}
      </TreeMenu>

      <span>----브랜드----</span>
      {brandData.map((brand) => (
        <label key={brand._id}>
          <input
            type="checkbox"
            name="brand"
            checked={brands?.find((b) => b === brand._id) ? true : false}
            value={brand._id}
            onChange={(e) => handleCheck(e)}
          />
          {brand._id}
        </label>
      ))}
    </div>
  );
}

export default Sidebar;
