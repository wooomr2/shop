import "./lookbooks.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLookbooks } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";

function Lookbooks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lookbooks } = useSelector((store) => store.lookbook);

  useEffect(() => {
    dispatch(getLookbooks());
  }, []);

  return (
    <div className="lookbooks-container">
      {lookbooks?.map((lookbook) => (
        <div
          className="lookbooks-items"
          key={lookbook._id}
          onClick={() => navigate(`/lookbooks/${lookbook._id}`)}
        >
          <img
            src={publicURL(lookbook.banners[0].img)}
            alt=""
          />
          <b>{lookbook.name}</b>
        </div>
      ))}
    </div>
  );
}

export default Lookbooks;
