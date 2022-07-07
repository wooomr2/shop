import { Box, Modal } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrand } from "../../slice/brandSlice";
import { closeModal } from "../../slice/modalSlice";
import "./modal.scss";

function BrandModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);
  const fileRef = useRef(null);

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
            <Box className="modal-wrapper">
            <form onSubmit={handleSubmit} className="modal-wrapper-form">
              <p className="form-title">Add New Brand</p>
              <input
                className="form-input"
                placeholder="Brand Title"
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="form-input"
                placeholder="Brand Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />

              <p className="form-imgName">Banner images</p>
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
                  fileRef.current.click();
                }}
              >
                이미지 업로드
              </button>
              <input
                ref={fileRef}
                type="file"
                id="file"
                multiple
                accept=".png, .jpeg, .jpg"
                onChange={(e) => handleBannerImgs(e.target.files)}
              />

              <button type="submit" className="form-btn">
                submit
              </button>
              <button type="reset" onClick={resetState} className="form-btn">
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