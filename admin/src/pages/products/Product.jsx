import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import PermMediaIcon from "@mui/icons-material/PermMedia";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { linearCategories } = useSelector((store) => store.category);
  const product = location.state;
  const { _id } = product;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category._id);
  const [productImgs, setProductImgs] = useState(product.productImgs);

  const [discountPrice, setDiscountPrice] = useState(
    product.discountPrice
  );
  const [code, setCode] = useState(product.code);
  const [color, setColor] = useState(product.color);
  let str = "";
  for (let i = 0; i < product.stock.length; i++) {
    str += product.stock[i].size + ":" + product.stock[i].qty;
    if (i === product.stock.length - 1) break;
    str += ",";
  }
  const [stock, setStock] = useState(str);

  const resetState = () => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setBrand(product.brand);
    setCategory(product.category._id);
    setProductImgs(product.productImgs);

    setDiscountPrice(product.discountPrice);
    setCode(product.code);
    setColor(product.color);
    setStock(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) return alert("카테고리없음");

    const form = new FormData();
    form.append("_id", _id);
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
        <p>productId : {_id}</p>
        <input
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Brand"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          placeholder="DiscountPrice"
          required
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
        <input
          placeholder="Code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          placeholder="Color"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          placeholder="Stock"
          required
          value={stock}
          onChange={(e) => setStock(e.target.value)}
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
