import { useLocation, useNavigate } from "react-router-dom";
import publicURL from "../../utils/publicURL";

function Lookbook() {
  const navigate = useNavigate();
  const location = useLocation();
  const lookbook = location.state;

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로</button>

      <div>
        <img
          src={publicURL(lookbook.banners[0].img)}
          alt=""
          width="300"
          height="300"
        />
      </div>

      <div>
        <h1>{lookbook.name}</h1>
        <span>{lookbook.description}</span>
        <span>
          관련상품ID:
          {lookbook.products.map((product, i) => (
            <p key={i}>#{product}</p>
          ))}
        </span>
      </div>
    </div>
  );
}

export default Lookbook;
