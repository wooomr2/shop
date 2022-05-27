import { useLocation, useNavigate } from "react-router-dom";
import publicURL from "../../utils/publicURL";

function Brand() {
  const navigate = useNavigate();
  const location = useLocation();
  const brand = location.state;

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로</button>
      <div>
        <img
          src={publicURL(brand.banners[0].img)}
          alt=""
          width="800"
          height="400"
        />
      </div>
      <div>
        <h1>{brand?.name}</h1>
        <span>{brand?.description}</span>
      </div>
    </div>
  );
}

export default Brand;
