import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../slice/productSlice";
import { closeModal } from "../../slice/modalSlice";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import "./modal.scss";

function ProductModal() {
  const dispatch = useDispatch();
  const { linearCategories } = useSelector((store) => store.category);
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [productImgs, setProductImgs] = useState([]);

  const [discountPrice, setDiscountPrice] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState([]);

  const resetState = () => {
    setName("");
    setPrice("");
    setDescription("");
    setBrand("");
    setCategory("");
    setProductImgs([]);

    setDiscountPrice("");
    setCode("");
    setColor("");
    setStock([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productImgs.length === 0) return alert("파일없음");
    if (!category) return alert("카테고리없음");

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("brand", brand);
    form.append("category", category);

    form.append("discountPrice", discountPrice);
    form.append("code", code);
    form.append("color", color);
    form.append("stock", stock);
    for (let img of productImgs) {
      form.append("productImg", img);
    }

    dispatch(addProduct(form));
    dispatch(closeModal());
    resetState();
  };

  const handleProductImgs = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setProductImgs(files);
  };

  switch (modalType) {
    case "addProduct":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetState();
          }}
        >
              <Box className="modal-wrapper">
            <form onSubmit={handleSubmit} className="modal-wrapper-form">
              <p className="form-title">Add New product</p>

              <input
                className="form-input"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <div className="form-inputWrapper">
                <input
                  className="form-input"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="Brand"
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="DiscountPrice"
                  required
                  onChange={(e) => setDiscountPrice(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="Code"
                  required
                  onChange={(e) => setCode(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="Color"
                  required
                  onChange={(e) => setColor(e.target.value)}
                />
                <input
                  className="form-input"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <textarea
                className="form-textarea"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
              >
                <option defaultValue hidden>
                  Select Category
                </option>
                {linearCategories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="form-gridImg">
                {productImgs &&
                  productImgs.map((img, i) => (
                    <div key={i} className="form-imgWrapper">
                      <img src={URL.createObjectURL(img)} alt="" />
                    </div>
                  ))}
              </div>

              <label htmlFor="file" className="form-productImgs">
                <PermMediaIcon /> <span>Product Images</span>
                <input
                  type="file"
                  id="file"
                  multiple
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => handleProductImgs(e.target.files)}
                />
              </label>

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

    default:
  }
}

export default ProductModal;