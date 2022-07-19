import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCollection } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";

function Collection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const collection = location.state;
  const { _id } = collection;

  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [brand, setBrand] = useState(collection.brand);
  const [launched, setLaunched] = useState(collection.launched);
  const [director, setDirector] = useState(collection.director);
  const [country, setCountry] = useState(collection.country);
  const [shop, setShop] = useState(collection.shop);
  const [banners, setBanners] = useState(collection.banners);
  const [cards, setCards] = useState(collection.cards);

  const bannerRef = useRef(null);
  const cardRef = useRef(null);
  const onClickBannerRef = () => {
    bannerRef.current.click();
  };
  const onClickcardRef = () => {
    cardRef.current.click();
  };


  const resetState = () => {
    setName(collection.name);
    setDescription(collection.description);
    setBrand(collection.brand);
    setLaunched(collection.launched);
    setDirector(collection.director);
    setCountry(collection.country);
    setShop(collection.shop);
    setBanners(collection.banners);
    setCards(collection.cards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("_id", _id);
    form.append("name", name);
    form.append("description", description);
    form.append("brand", brand);
    form.append("launched", launched);
    form.append("director", director);
    form.append("country", country);
    form.append("shop", shop);

    for (let img of banners) {
      form.append("banners", img);
    }
    for (let img of cards) {
      form.append("cards", img);
    }

    dispatch(updateCollection(form));
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

  const handleCards = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setCards(files);
  };

  return (
    <div className="content">
      <div className="content-top">
        <div className="content-top-id">
          <p>CollectionId : {_id}</p>
        </div>
        <button onClick={() => navigate(-1)}>목록으로</button>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="item">
          <label htmlFor="name" className="item-left">
            컬렉션명
          </label>
          <input
            className="relatedProducts"
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
          <label htmlFor="brand" className="item-left">
            브랜드
          </label>
          <input
            id="brand"
            placeholder="brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="launched" className="item-left">
            런칭
          </label>
          <input
            id="launched"
            placeholder="launched"
            required
            value={launched}
            onChange={(e) => setLaunched(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="director" className="item-left">
            디렉터
          </label>
          <input
            id="director"
            placeholder="director"
            required
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="country" className="item-left">
            국가
          </label>
          <input
            id="country"
            placeholder="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="shop" className="item-left">
            상점
          </label>
          <input
            id="shop"
            placeholder="shop"
            required
            value={shop}
            onChange={(e) => setShop(e.target.value)}
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
                    height="50"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="item">
          <label htmlFor="" className="item-left"></label>
          <button type="button" className="item-btn" onClick={onClickBannerRef}>
            배너 사진 수정
          </button>
          <input
            ref={bannerRef}
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              handleBanners(e.target.files);
            }}
          />
        </div>

        <div className="item">
          <label htmlFor="" className="item-left">
            컬렉션 사진
          </label>
          <div className="item-img">
            {cards &&
              cards.map((card, i) => (
                <div key={i} className="item-img-wrapper">
                  <img
                    src={
                      card instanceof File
                        ? URL.createObjectURL(card)
                        : publicURL(card.img)
                    }
                    alt=""
                    height="50"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="item">
          <label htmlFor="" className="item-left"></label>
          <button type="button" className="item-btn" onClick={onClickcardRef}>
            컬렉션 사진 수정
          </button>
          <input
            ref={cardRef}
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              handleCards(e.target.files);
            }}
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

export default Collection;
