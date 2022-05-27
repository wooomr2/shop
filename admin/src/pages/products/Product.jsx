import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import PermMediaIcon from "@mui/icons-material/PermMedia";

function Product() {
  const dispatch = useDispatch();
  const { linearCategories } = useSelector((store) => store.category);
  const navigate = useNavigate();
  const location = useLocation();
  const defaultProduct = location.state;
  const { _id } = defaultProduct;

  const [name, setName] = useState(defaultProduct.name);
  const [quantity, setQuantity] = useState(defaultProduct.quantity);
  const [price, setPrice] = useState(defaultProduct.price);
  const [description, setDescription] = useState(defaultProduct.description);
  const [brand, setBrand] = useState(defaultProduct.brand);
  const [category, setCategory] = useState(defaultProduct.category._id);
  const [productImgs, setProductImgs] = useState(defaultProduct.productImgs);

  const resetState = () => {
    setName(defaultProduct.name);
    setQuantity(defaultProduct.quantity);
    setPrice(defaultProduct.price);
    setDescription(defaultProduct.description);
    setBrand(defaultProduct.brand);
    setCategory(defaultProduct.category._id);
    setProductImgs(defaultProduct.productImgs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return alert("카테고리없음");

    const form = new FormData();
    form.append("_id", _id);
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("brand", brand);
    form.append("category", category);

    for (let img of productImgs) {
      form.append("productImg", img);
    }

    dispatch(updateProduct(form));
    navigate(-1);
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

  return (
    <div className="product">
      <button onClick={() => navigate(-1)}>목록으로</button>

      <form onSubmit={handleSubmit}>
        <p>Add New product</p>
        <p>productId : {_id}</p>
        <input
          placeholder="product Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="product Quantity"
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          placeholder="product Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="product Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="product Brand"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {linearCategories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {productImgs &&
          productImgs.map((productImg, i) => (
            <div key={i}>
              <img
                src={
                  productImg instanceof File
                    ? URL.createObjectURL(productImg)
                    : publicURL(productImg.fileName)
                }
                alt=""
                height="50"
              />
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
    </div>
  );
}

export default Product;
