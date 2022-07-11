import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { useDispatch, useSelector } from "react-redux";
import CategoryModal from "../../components/modals/CategoryModal";
import { openModal } from "../../slice/modalSlice";

function Categories() {
  const dispatch = useDispatch();
  const { categories, linearCategories } = useSelector(
    (store) => store.category
  );

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);

  useEffect(() => {
    const updateCheckedCategories = () => {
      const checkedCates = [];

      checked.length > 0 &&
        checked.forEach((categoryId, i) => {
          const cate = linearCategories.find(
            (category, _i) => categoryId === category._id
          );
          cate && checkedCates.push(cate);
        });

      setCheckedCategories(checkedCates);
    };

    updateCheckedCategories();
  }, [checked, expanded, linearCategories]);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  return (
    <div className="list">
      <div className="list-btn">
        <h2>OUR CATEGORIES</h2>
        <div className="list-btn">
          <button onClick={() => dispatch(openModal("addCategory"))}>
            ADD
          </button>
          <button onClick={() => dispatch(openModal("updateCategory"))}>
            UPDATE
          </button>
          <button onClick={() => dispatch(openModal("deleteCategory"))}>
            DELETE
          </button>
        </div>
      </div>

      <CategoryModal
        setChecked={setChecked}
        setExpanded={setExpanded}
        checkedCategories={checkedCategories}
        setCheckedCategories={setCheckedCategories}
      />

      <CheckboxTree
        nodes={renderCategories(categories)}
        checked={checked}
        expanded={expanded}
        onCheck={(checked) => setChecked(checked)}
        onExpand={(expanded) => setExpanded(expanded)}
        showExpandAll={true}
        noCascade={true}
        icons={{
          check: <CheckBoxIcon />,
          uncheck: <CheckBoxOutlineBlankIcon />,
          halfCheck: <IndeterminateCheckBoxIcon />,
          expandClose: <KeyboardArrowRightIcon />,
          expandOpen: <KeyboardArrowDownIcon />,
          expandAll: <AddBoxIcon />,
          collapseAll: <RemoveIcon />,
          parentClose: <FolderOutlinedIcon />,
          parentOpen: <FolderOpenOutlinedIcon />,
          leaf: <InsertDriveFileOutlinedIcon />,
        }}
      />
    </div>
  );
}

export default Categories;
