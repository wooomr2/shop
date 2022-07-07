import { Cancel } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategories,
  updateCategories,
} from "../../slice/categorySlice";
import { closeModal } from "../../slice/modalSlice";
import publicURL from "../../utils/publicURL";
import "./modal.scss";

function CategoryModal({
  setChecked,
  setExpanded,
  expandedCategories,
  checkedCategories,
  setCheckedCategories,
  setExpandedCategories,
}) {
  const dispatch = useDispatch();
  const { linearCategories } = useSelector((store) => store.category);
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [viewType, setViewType] = useState("");
  const [categoryImg, setCategoryImg] = useState("");

  const resetState = () => {
    setName("");
    setParentId("");
    setViewType("");
    setCategoryImg("");
  };

  const resetCheckedAndExpandedCategories = () => {
    setChecked([]);
    setExpanded([]);
    setCheckedCategories([]);
    setExpandedCategories([]);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("parentId", parentId);
    form.append("viewType", viewType);
    form.append("categoryImg", categoryImg);
    dispatch(addCategory(form));
    dispatch(closeModal());
    resetState();
  };

  const handleDeleteFormSubmit = (e) => {
    e.preventDefault();
    const checkedIds = checkedCategories.map((item) => ({ _id: item._id }));
    const expandedIds = expandedCategories.map((item) => ({ _id: item._id }));
    const ids = expandedIds.concat(checkedIds);
    if (ids.length > 0) {
      dispatch(deleteCategories(ids));
      dispatch(closeModal());
      resetCheckedAndExpandedCategories();
    }
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    checkedCategories.forEach((item) => {
      form.append("_id", item._id);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("viewType", item.viewType);
      form.append("categoryImg", item.categoryImg ? item.categoryImg : "");
    });
    expandedCategories.forEach((item) => {
      form.append("_id", item._id);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("viewType", item.viewType);
      form.append("categoryImg", item.categoryImg ? item.categoryImg : "");
    });

    dispatch(updateCategories(form));
    dispatch(closeModal());
    resetCheckedAndExpandedCategories();
  };

  const handleCategoryInputChange = (key, value, idx, type) => {
    switch (type) {
      case "checked":
        const updatedCC = checkedCategories.map((item, _idx) =>
          idx === _idx ? { ...item, [key]: value } : item
        );
        setCheckedCategories(updatedCC);
        break;

      case "expanded":
        const updatedEC = expandedCategories.map((item, _idx) =>
          idx === _idx ? { ...item, [key]: value } : item
        );
        setExpandedCategories(updatedEC);
        break;
      default:
    }
  };

  const commonInputModule = (item, idx, type) => (
    <div key={idx}>
      <input
        placeholder="Category Name"
        required
        value={type ? item.name : undefined}
        onChange={(e) =>
          type
            ? handleCategoryInputChange("name", e.target.value, idx, type)
            : setName(e.target.value)
        }
      />

      <select
        value={type ? item.parentId : undefined}
        onChange={(e) =>
          type
            ? handleCategoryInputChange("parentId", e.target.value, idx, type)
            : setParentId(e.target.value)
        }
      >
        <option>Select Parent</option>
        {linearCategories.map((c, i) => (
          <option key={i} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={type ? item.viewType : undefined}
        onChange={(e) =>
          type
            ? handleCategoryInputChange("viewType", e.target.value, idx, type)
            : setViewType(e.currentTarget.value)
        }
      >
        <option defaultValue hidden>
          Select ViewType
        </option>
        <option value="list">List</option>
        <option value="store">Store</option>
        <option value="split">Split</option>
      </select>

      {type
        ? item.categoryImg && (
            <div>
              <img
                src={
                  item.categoryImg instanceof File
                    ? URL.createObjectURL(item.categoryImg)
                    : publicURL(item.categoryImg)
                }
                alt=""
                height="50"
              />
            </div>
          )
        : categoryImg && (
            <div>
              <img src={URL.createObjectURL(categoryImg)} alt="" height="50" />
              <Cancel onClick={() => setCategoryImg("")} />
            </div>
          )}

      <input
        type="file"
        id="file"
        accept=".png, .jpeg, .jpg"
        onChange={(e) =>
          type
            ? handleCategoryInputChange(
                "categoryImg",
                e.target.files[0],
                idx,
                type
              )
            : setCategoryImg(e.target.files[0])
        }
      />
    </div>
  );

  switch (modalType) {
    case "addCategory":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetState();
          }}
        >
          <Box sx={style}>
            <form onSubmit={handleAddFormSubmit}>
              <p>Add New Category</p>
              {commonInputModule()}
              <button type="submit">submit</button>
              <button type="reset" onClick={resetState}>
                reset
              </button>
            </form>
          </Box>
        </Modal>
      );

    case "updateCategory":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetCheckedAndExpandedCategories();
          }}
        >
          <Box sx={style}>
            <form onSubmit={handleUpdateFormSubmit}>
              {expandedCategories.length > 0 && (
                <>
                  <p>Update expanded Categories</p>
                  {expandedCategories.map((item, idx) =>
                    commonInputModule(item, idx, "expanded")
                  )}
                </>
              )}
              {checkedCategories.length > 0 && (
                <>
                  <p>Update Checked Categories</p>
                  {checkedCategories.map((item, idx) =>
                    commonInputModule(item, idx, "checked")
                  )}
                </>
              )}
              <button type="submit">submit</button>
            </form>
          </Box>
        </Modal>
      );

    case "deleteCategory":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetCheckedAndExpandedCategories();
          }}
        >
          <Box sx={style}>
            <form onSubmit={handleDeleteFormSubmit}>
              <p>Delete Categories</p>
              <h5>Expanded</h5>
              {expandedCategories.map((item, index) => (
                <span key={index}>{item.name}@</span>
              ))}
              <h5>Checked</h5>
              {checkedCategories.map((item, index) => (
                <span key={index}>{item.name}@</span>
              ))}
              <button type="submit">submit</button>
            </form>
          </Box>
        </Modal>
      );

    default:
  }
}

export default CategoryModal;

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
