import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateLookbook } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";
import { useRef } from "react";

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

  const fileRef = useRef(null);
  const onClickFileRef = () => {
    fileRef.current.click();
  };

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
    <div className="content">
    <div className="content-top">
      <div className="content-top-id">
        <p>LookbookId: {_id}</p>
      </div>

      <button onClick={() => navigate(-1)}>목록으로</button>
    </div>

    <form onSubmit={handleSubmit} className="content-form">
      <div className="item">
        <label htmlFor="name" className="item-left">
          룩북명
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
        <label htmlFor="modelInfo" className="item-left">
          모델 정보
        </label>
        <input
          placeholder="modelInfo"
          required
          value={modelInfo}
          onChange={(e) => setModelInfo(e.target.value)}
        />
      </div>

      <div className="item">
        <label htmlFor="description" className="item-left">
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
        <label htmlFor="wearingSize" className="item-left">
          착용 사이즈
        </label>
        <textarea
          placeholder="wearingSize"
          required
          value={wearingSize}
          onChange={(e) => setWearingSize(e.target.value)}
        />
      </div>

      <div className="item">
        <label htmlFor="products" className="item-left">
          관련 상품
        </label>
        <input
          className="relatedProducts"
          placeholder="products"
          required
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
      </div>

      <div className="item">
        <label htmlFor="" className="item-left">
          룩북 사진
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
                  height="50"
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

export default Lookbook;
