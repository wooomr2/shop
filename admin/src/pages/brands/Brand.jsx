import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBrand } from "../../slice/brandSlice";
import publicURL from "../../utils/publicURL";

function Brand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const brand = location.state;
  const { _id } = brand;

  const [name, setName] = useState(brand.name);
  const [description, setDescription] = useState(brand.description);
  const [banners, setBanners] = useState(brand.banners);

  const fileRef = useRef(null);
  const onClickFileRef = () => {
    fileRef.current.click();
  };

  const resetState = () => {
    setName(brand.name);
    setDescription(brand.description);
    setBanners(brand.banners);
  };

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
    <div className="content">
      <div className="content-top">
        <div className="content-top-id">
          <p>BrandId: {_id}</p>
        </div>
        <button onClick={() => navigate(-1)}>목록으로</button>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="item">
          <label htmlFor="name" className="item-left">
            브랜드명
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
          <label htmlFor="description" className="item-left">
            설명
          </label>
          <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="" className="item-left">
            배너 이미지
          </label>
          <div className="item-img">
            {banners &&
              banners.map((banner, i) => (
                <div key={i} className="item-img-wrapper">
                  <img
                    src={
                      banner instanceof File
                        ? URL.createObjectURL(banner)
                        : publicURL(banner.img)
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
            onChange={(e) => handleBanners(e.target.files)}
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

export default Brand;
