import { Box, Modal } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLookbook } from "../../slice/lookbookSlice";
import { closeModal } from "../../slice/modalSlice";
import "./modal.scss";

function LookbookModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((store) => store.modal);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState("");
  const [modelInfo, setModelInfo] = useState("");
  const [wearingSize, setWearingSize] = useState("");
  const fileRef = useRef();

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
                 <Box className="modal-wrapper">
            <form onSubmit={handleSubmit} className="modal-wrapper-form">
              <p className="form-title">Add New Lookbook</p>
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
              <textarea
                className="form-textarea products"
                placeholder="Products"
                required
                onChange={(e) => setProducts(e.target.value)}
              />

              <input
                className="form-input"
                placeholder="Model Info"
                required
                onChange={(e) => setModelInfo(e.target.value)}
              />
              <textarea
                className="form-textarea"
                placeholder="Wearing Size"
                required
                onChange={(e) => setWearingSize(e.target.value)}
              />

              <span>Banner images</span>
              <div className="form-gridImg">
                {banners &&
                  banners.map((img, i) => (
                    <div key={i} className="form-imgWrapper">
                      <img src={URL.createObjectURL(img)} alt="" />
                    </div>
                  ))}
              </div>
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

              <button className="form-btn" type="submit">submit</button>
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

export default LookbookModal;