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

  // const [showExpandAll, setShowExpandALl] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    const updateCheckedAndExpandedCategories = () => {
      const checkedCates = [];
      const expandedCates = [];

      checked.length > 0 &&
        checked.forEach((categoryId, i) => {
          const cate = linearCategories.find(
            (category, _i) => categoryId === category._id
          );
          cate && checkedCates.push(cate);
        });

      expanded.length > 0 &&
        expanded.forEach((categoryId, i) => {
          const cate = linearCategories.find(
            (category, _i) => categoryId === category._id
          );
          cate && expandedCates.push(cate);
        });

      setCheckedCategories(checkedCates);
      setExpandedCategories(expandedCates);
    };

    updateCheckedAndExpandedCategories();
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
    <div>
      {/* <button onClick={() => setShowExpandALl(showExpandAll ? false : true)}>Expand</button> */}
      <button onClick={() => dispatch(openModal("addCategory"))}>ADD</button>
      <button onClick={() => dispatch(openModal("updateCategory"))}>
        UPDATE
      </button>
      <button onClick={() => dispatch(openModal("deleteCategory"))}>
        DELETE
      </button>

      <CategoryModal
        setChecked={setChecked}
        setExpanded={setExpanded}
        checkedCategories={checkedCategories}
        expandedCategories={expandedCategories}
        setCheckedCategories={setCheckedCategories}
        setExpandedCategories={setExpandedCategories}
      />

      <CheckboxTree
        nodes={renderCategories(categories)}
        checked={checked}
        expanded={expanded}
        onCheck={(checked) => setChecked(checked)}
        onExpand={(expanded) => setExpanded(expanded)}
        showExpandAll={true}
        // noCascade={true}
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
