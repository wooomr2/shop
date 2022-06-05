import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import publicURL from "../../utils/publicURL";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { updateBrand } from "../../slice/brandSlice";

function Brand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const brand = location.state;
  const { _id } = brand;

  const [name, setName] = useState(brand.name);
  const [description, setDescription] = useState(brand.description);
  const [banners, setBanners] = useState(brand.banners);

  const resetState = () => {
    setName(brand.name);
    setDescription(brand.description);
    setBanners(brand.banners);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("_id", _id);
    form.append("name", name);
    form.append("description", description);

    for (let img of banners) {
      form.append("banners", img);
    }

    dispatch(updateBrand(form));
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
    <div className="brand">
    <button onClick={() => navigate(-1)}>목록으로</button>

    <form onSubmit={handleSubmit}>
      <p>brandId : {_id}</p>
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
        <span>Product images</span>
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

export default Brand;
