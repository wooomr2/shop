import { Box, Modal } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../slice/collectionSlice";
import { closeModal } from "../../slice/modalSlice";
import "./modal.scss";

function CollectionModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const bannerRef = useRef(null);
  const cardRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [launched, setLaunched] = useState("");
  const [director, setDirector] = useState("");
  const [country, setCountry] = useState("");
  const [shop, setShop] = useState("");
  const [banners, setBanners] = useState([]);
  const [cards, setCards] = useState([]);

  const resetState = () => {
    setName("");
    setDescription("");
    setBrand("");
    setLaunched("");
    setDirector("");
    setCountry("");
    setShop("");
    setDescription("");
    setBanners([]);
    setCards([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("brand", brand);
    form.append("launched", launched);
    form.append("director", director);
    form.append("country", country);
    form.append("shop", shop);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    cards.forEach((card) => {
      form.append("cards", card);
    });

    dispatch(addCollection(form));
    dispatch(closeModal());
    resetState();
  };

  const handleBannerImgs = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setBanners(files);
  };

  const handleCardImgs = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setCards(files);
  };

  switch (modalType) {
    case "addCollection":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetState();
          }}
        >
          <Box className="modal-wrapper">
            <form onSubmit={handleSubmit} className="modal-wrapper-form">
              <p className="form-title">Add New Collection</p>
              <input
                className="form-input"
                placeholder="Title"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                className="form-textarea"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Brand"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Lanched"
                required
                onChange={(e) => setLaunched(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Director"
                required
                onChange={(e) => setDirector(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Shop"
                required
                onChange={(e) => setShop(e.target.value)}
              />

              <span>Banner images</span>
              {banners &&
                banners.map((img, i) => (
                  <div key={i} className="form-imgWrapper">
                    <img src={URL.createObjectURL(img)} alt="" />
                  </div>
                ))}
              <button
                type="button"
                className="form-file"
                onClick={() => {
                  bannerRef.current.click();
                }}
              >
                배너 업로드
              </button>
              <input
                ref={bannerRef}
                type="file"
                id="file"
                multiple
                accept=".png, .jpeg, .jpg"
                onChange={(e) => handleBannerImgs(e.target.files)}
              />
              <span>Card images</span>
              <div className="form-gridImg">
                {cards &&
                  cards.map((img, i) => (
                    <div key={i} className="form-imgWrapper">
                      <img src={URL.createObjectURL(img)} alt="" />
                    </div>
                  ))}
              </div>
              <button
                type="button"
                className="form-file"
                onClick={() => {
                  cardRef.current.click();
                }}
              >
                이미지 업로드
              </button>
              <input
                ref={cardRef}
                type="file"
                id="file"
                multiple
                accept=".png, .jpeg, .jpg"
                onChange={(e) => handleCardImgs(e.target.files)}
              />
              <button className="form-btn" type="submit">
                submit
              </button>
              <button className="form-btn" type="reset" onClick={resetState}>
                reset
              </button>
            </form>
          </Box>
        </Modal>
      );
    default:
  }
}

export default CollectionModal;
