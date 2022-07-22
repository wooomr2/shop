import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useRef } from "react";

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
  const fileRef = useRef(null);
  const onClickFileRef = () => {
    fileRef.current.click();
  };

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
    <div className="content">
    <div className="content-top">
      <div className="content-top-id">
        <p>ProductId: {_id}</p>
      </div>

      <button onClick={() => navigate(-1)}>목록으로</button>
    </div>

    <form onSubmit={handleSubmit} className="content-form">
      <div className="item">
        <label className="item-left" htmlFor="name">
          제품명
        </label>
        <input
          id="name"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="price">
          가격
        </label>
        <input
          id="price"
          placeholder="Price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="brand">
          브랜드
        </label>
        <input
          id="brand"
          placeholder="Brand"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="discountPrice">
          할인가격
        </label>
        <input
          id="discountPrice"
          placeholder="DiscountPrice"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="code">
          코드
        </label>
        <input
          id="code"
          placeholder="Code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="color">
          컬러
        </label>
        <input
          id="color"
          placeholder="Color"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="stock">
          재고
        </label>
        <input
          id="stock"
          placeholder="Stock"
          required
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left" htmlFor="cate">
          카테고리
        </label>
        <select
          id="cate"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {linearCategories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="item">
        <label className="item-left" htmlFor="description">
          설명
        </label>
        <textarea
          id="description"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="item">
        <label className="item-left">제품 사진</label>
        <div className="item-img">
          {productImgs?.map((productImg, i) => (
            <div key={i} className="item-img-wrapper">
              <img
                src={
                  productImg instanceof File
                    ? URL.createObjectURL(productImg)
                    : publicURL(productImg.fileName)
                }
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div className="item">
        <label className="item-left"></label>
        <button type="button" className="item-btn" onClick={onClickFileRef}>
          제품 사진 수정
        </button>
        <input
          ref={fileRef}
          type="file"
          id="file"
          multiple
          accept=".png, .jpeg, .jpg"
          onChange={(e) => handleProductImgs(e.target.files)}
        />
      </div>

      <div className="btnWrapper">
        <button type="submit">수정</button>
        <button type="reset" onClick={resetState}>
          취소
        </button>
      </div>
    </form>
  </div>
  );
}

export default Product;
