import PermMediaIcon from "@mui/icons-material/PermMedia";
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
      <input
        placeholder="brand"
        required
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        placeholder="launched"
        required
        value={launched}
        onChange={(e) => setLaunched(e.target.value)}
      />
      <input
        placeholder="director"
        required
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <input
        placeholder="country"
        required
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        placeholder="shop"
        required
        value={shop}
        onChange={(e) => setShop(e.target.value)}
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
          onChange={(e) => {
            handleBanners(e.target.files);
          }}
        />
      </label>

      {cards &&
        cards.map((card, i) => (
          <div key={i}>
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
      <label htmlFor="file2">
        <PermMediaIcon />
        <span>card images</span>
        <input
          type="file"
          id="file2"
          multiple
          accept=".png, .jpeg, .jpg"
          onChange={(e) => {
            handleCards(e.target.files);
          }}
        />
      </label>

      <button type="submit">submit</button>
      <button type="reset" onClick={resetState}>
        reset
      </button>
    </form>
  );
}

export default Collection;
