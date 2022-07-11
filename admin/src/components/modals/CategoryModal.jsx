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
import PermMediaIcon from "@mui/icons-material/PermMedia";
import "./modal.scss";

function CategoryModal({
  setChecked,
  setExpanded,
  checkedCategories,
  setCheckedCategories,
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

    if (checkedIds.length > 0) {
      dispatch(deleteCategories(checkedIds));
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

    dispatch(updateCategories(form));
    dispatch(closeModal());
    resetCheckedAndExpandedCategories();
  };

  const handleCategoryInputChange = (key, value, idx) => {
    const updatedCC = checkedCategories.map((item, _idx) =>
      idx === _idx ? { ...item, [key]: value } : item
    );
    setCheckedCategories(updatedCC);
  };

  const commonInputModule = (item, idx, type) => (
    <div key={idx} className="form-inputWrapper">
      <input
        className="form-input"
        placeholder="Category Name"
        required
        value={type ? item.name : undefined}
        onChange={(e) =>
          type
            ? handleCategoryInputChange("name", e.target.value, idx)
            : setName(e.target.value)
        }
      />

      <select
        className="form-input"
        value={type ? item.parentId : undefined}
        onChange={(e) =>
          type
            ? handleCategoryInputChange("parentId", e.target.value, idx)
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
        className="form-input"
        value={type ? item.viewType : undefined}
        onChange={(e) =>
          type
            ? handleCategoryInputChange("viewType", e.target.value, idx)
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

      <div className="form-gridImg">
        {type
          ? item.categoryImg && (
              <div className="form-imgWrapper">
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
              <div className="form-imgWrapper">
                <img
                  src={URL.createObjectURL(categoryImg)}
                  alt=""
                  height="50"
                />
                <Cancel onClick={() => setCategoryImg("")} />
              </div>
            )}
      </div>

      <label htmlFor="file" className="form-productImgs">
        <PermMediaIcon /> <span>Product Images</span>
        <input
          type="file"
          id="file"
          accept=".png, .jpeg, .jpg"
          onChange={(e) =>
            type
              ? handleCategoryInputChange("categoryImg", e.target.files[0], idx)
              : setCategoryImg(e.target.files[0])
          }
        />
      </label>
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
          <Box className="modal-wrapper">
            <form onSubmit={handleAddFormSubmit} className="modal-wrapper-form">
              <p className="form-title">Add New Category</p>
              {commonInputModule()}
              <button className="form-btn" type="submit">
                submit
              </button>
              <button className="form-btn" type="reset" onClick={resetState}>
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
          <Box className="modal-wrapper">
            <form
              onSubmit={handleUpdateFormSubmit}
              className="modal-wrapper-form"
            >
              {checkedCategories.length > 0 && (
                <>
                  <p>Update Checked Categories</p>
                  {checkedCategories.map((item, idx) =>
                    commonInputModule(item, idx, "checked")
                  )}
                </>
              )}
              <button className="form-btn" type="submit">
                submit
              </button>
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
          <Box className="modal-wrapper">
            <form
              onSubmit={handleDeleteFormSubmit}
              className="modal-wrapper-form"
            >
              <p>Delete Categories</p>
              <h5>Checked</h5>
              {checkedCategories.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))}
              <button className="form-btn" type="submit">
                submit
              </button>
            </form>
          </Box>
        </Modal>
      );

    default:
  }
}

export default CategoryModal;
