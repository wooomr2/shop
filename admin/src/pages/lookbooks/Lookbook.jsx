import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateLookbook } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";
import PermMediaIcon from "@mui/icons-material/PermMedia";

function Lookbook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const lookbook = location.state;
  const { _id } = lookbook;

  const [name, setName] = useState(lookbook.name);
  const [description, setDescription] = useState(lookbook.description);
  const [modelInfo, setModelInfo] = useState(lookbook.modelInfo);
  const [wearingSize, setWearingSize] = useState(lookbook.wearingSize);
  const [products, setProducts] = useState(lookbook.products?.toString());
  const [banners, setBanners] = useState(lookbook.banners);

  const resetState = () => {
    setName(lookbook.name);
    setDescription(lookbook.description);
    setModelInfo(lookbook.modelInfo);
    setWearingSize(lookbook.wearingSize);
    setBanners(lookbook.banners);
    setProducts(lookbook.products.toString())
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("_id", _id);
    form.append("name", name);
    form.append("description", description);
    form.append("modelInfo", modelInfo);
    form.append("wearingSize", wearingSize);
    form.append("products", products)

    for (let img of banners) {
      form.append("banners", img);
    }

    dispatch(updateLookbook(form));
    navigate(-1);
  };

  const handleBanners = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setBanners(files);
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로</button>

      <form onSubmit={handleSubmit}>
        <p>lookbookId : {_id}</p>
        <input
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          placeholder="modelInfo"
          required
          value={modelInfo}
          onChange={(e) => setModelInfo(e.target.value)}
        />
        <textarea
          placeholder="wearingSize"
          required
          value={wearingSize}
          onChange={(e) => setWearingSize(e.target.value)}
        />

        <textarea
          placeholder="products"
          required
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />

        {banners &&
          banners.map((banner, i) => (
            <div key={i}>
              <img
                src={
                  banner instanceof File
                    ? URL.createObjectURL(banner)
                    : publicURL(banner.img)
                }
                alt=""
                height="50"
              />
            </div>
          ))}
        <label htmlFor="file">
          <PermMediaIcon />
          <span>banner images</span>
          <input
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            style={{ display: "none" }}
            onChange={(e) => handleBanners(e.target.files)}
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

export default Lookbook;
