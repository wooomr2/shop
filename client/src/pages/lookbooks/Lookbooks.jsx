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
    <div>
      {lookbooks?.map((lookbook) => (
        <div
          key={lookbook._id}
          onClick={() => navigate(`/lookbooks/${lookbook._id}`)}
        >
          <img
            src={publicURL(lookbook.banners[0].img)}
            alt=""
            width="200"
            height="200"
          />
          {lookbook.name}
        </div>
      ))}
    </div>
  );
}

export default Lookbooks;
