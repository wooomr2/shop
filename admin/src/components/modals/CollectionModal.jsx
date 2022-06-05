import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollection } from "../../slice/collectionSlice";
import { closeModal } from "../../slice/modalSlice";

function CollectionModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((store) => store.modal);

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
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <p>Add New Collection</p>
              <input
                placeholder="Title"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                placeholder="Brand"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
              <input
                placeholder="Lanched"
                required
                onChange={(e) => setLaunched(e.target.value)}
              />
              <input
                placeholder="Director"
                required
                onChange={(e) => setDirector(e.target.value)}
              />
              <input
                placeholder="Country"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                placeholder="Shop"
                required
                onChange={(e) => setShop(e.target.value)}
              />

              <span>Banner images</span>
              {banners &&
                banners.map((img, i) => (
                  <div key={i}>
                    <img src={URL.createObjectURL(img)} alt="" height="50" />
                  </div>
                ))}
              <input
                type="file"
                id="file"
                multiple
                accept=".png, .jpeg, .jpg"
                onChange={(e) => handleBannerImgs(e.target.files)}
              />
              <span>Card images</span>
              {cards &&
                cards.map((img, i) => (
                  <div key={i}>
                    <img src={URL.createObjectURL(img)} alt="" height="50" />
                  </div>
                ))}
              <input
                type="file"
                id="file"
                multiple
                accept=".png, .jpeg, .jpg"
                onChange={(e) => handleCardImgs(e.target.files)}
              />
              <button type="submit">submit</button>
              <button type="reset" onClick={resetState}>
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

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
