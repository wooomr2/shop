import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrand } from "../../slice/brandSlice";
import { closeModal } from "../../slice/modalSlice";

function BrandModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);


  const resetState = () => {
    setName("");
    setDescription("");
    setBanners([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });

    dispatch(addBrand(form));
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
    case "addBrand":
      return (
        <Modal
          open={isOpen}
          onClose={() => {
            dispatch(closeModal()) && resetState();
          }}
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <p>Add New Brand</p>
              <input
                placeholder="Brand Title"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Brand Description"
                required
                onChange={(e) => setDescription(e.target.value)}
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

export default BrandModal;

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
