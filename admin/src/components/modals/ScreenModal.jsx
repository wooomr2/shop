import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../slice/modalSlice";
import { addScreen } from "../../slice/screenSlice";

function ScreenModal() {
  const dispatch = useDispatch();
  const { linearCategories } = useSelector((store) => store.category);
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [banners, setBanners] = useState([]);
  const [cards, setCards] = useState([]);

  const resetState = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setBanners([]);
    setCards([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", category);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    cards.forEach((card) => {
      form.append("cards", card);
    });

    dispatch(addScreen(form));
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
    case "addScreen":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetState();
          }}
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <p>Add New Screen</p>
              <input
                placeholder="Screen Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                placeholder="Screen Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />

              <select onChange={(e) => setCategory(e.target.value)}>
              <option>Select Category</option>
                {linearCategories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

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

export default ScreenModal;

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
