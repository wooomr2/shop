import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLookbook } from "../../slice/lookbookSlice";
import { closeModal } from "../../slice/modalSlice";

function LookbookModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState("");
  const [modelInfo, setModelInfo] = useState("");
  const [wearingSize, setWearingSize] = useState("");

  const resetState = () => {
    setName("");
    setDescription("");
    setBanners([]);
    setProducts("");
    setModelInfo("");
    setWearingSize("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("products", products);
    form.append("modelInfo", modelInfo);
    form.append("wearingSize", wearingSize);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });

    dispatch(addLookbook(form));
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

  switch (modalType) {
    case "addLookbook":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetState();
          }}
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <p>Add New Lookbook</p>
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
              <textarea
                placeholder="Products"
                required
                onChange={(e) => setProducts(e.target.value)}
              />

              <input
                placeholder="Model Info"
                required
                onChange={(e) => setModelInfo(e.target.value)}
              />
              <textarea
                placeholder="Wearing Size"
                required
                onChange={(e) => setWearingSize(e.target.value)}
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

export default LookbookModal;

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
