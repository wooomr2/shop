import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLookbook } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";
import Lookbooks from "./Lookbooks";

function Lookbook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { lookbook, relatedProducts } = useSelector((store) => store.lookbook);

  useEffect(() => {
    dispatch(getLookbook(params.id));
  }, [params]);

  return (
    <div>
      <div>
        <h1>{lookbook?.name}</h1>
        <span>{lookbook?.description}</span>
        {lookbook?.banners.map((banner,i) => (
          <div key={i}>
            <img src={publicURL(banner.img)} alt="" width="300" height="300" />
          </div>
        ))}
      </div>

      <div>
        <div>
          <span>모델 사이즈: {lookbook?.modelInfo}</span>
          <span>착용 사이즈 : {lookbook?.wearingSize}</span>
        </div>

        <div>
          <span>착용상품</span>
          {relatedProducts?.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <img
                src={publicURL(product.productImgs[0].fileName)}
                alt=""
                width="100"
                height="100"
              />
              <span>{product.brand}</span>
              <span>{product.name}</span>
              <span>{product.price}</span>
            </div>
          ))}
        </div>
      </div>

      <Lookbooks />
    </div>
  );
}

export default Lookbook;
