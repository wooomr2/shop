import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../slice/productSlice";
import { closeModal } from "../../slice/modalSlice";
import PermMediaIcon from "@mui/icons-material/PermMedia";

function ProductModal() {
  const dispatch = useDispatch();
  const { linearCategories } = useSelector((store) => store.category);
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
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
    setQuantity("");
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
    form.append("quantity", quantity);
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
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <p>Add New product</p>
              <input
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Quantity"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                placeholder="Brand"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                placeholder="DiscountPrice"
                required
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
              <input
                placeholder="Code"
                required
                onChange={(e) => setCode(e.target.value)}
              />
              <input
                placeholder="Color"
                required
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />

              <select onChange={(e) => setCategory(e.target.value)}>
                <option defaultValue hidden>
                  Select Category
                </option>
                {linearCategories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {productImgs &&
                productImgs.map((img, i) => (
                  <div key={i}>
                    <img src={URL.createObjectURL(img)} alt="" height="50" />
                  </div>
                ))}

              <label htmlFor="file">
                <PermMediaIcon />
                <span>Product images</span>
                <input
                  type="file"
                  id="file"
                  multiple
                  accept=".png, .jpeg, .jpg"
                  style={{ display: "none" }}
                  onChange={(e) => handleProductImgs(e.target.files)}
                />
              </label>

              <button type="submit">submit</button>
              <button type="reset" onClick={resetState}>
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

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
