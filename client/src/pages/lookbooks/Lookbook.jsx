import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getLookbook } from "../../slice/lookbookSlice";
import publicURL from "../../utils/publicURL";
import "./lookbook.scss";

function Lookbook() {
  const dispatch = useDispatch();
  const params = useParams();
  const { lookbook } = useSelector((store) => store.lookbook);

  useEffect(() => {
    dispatch(getLookbook(params.id));
  }, [params]);

  return (
    <div className="lookbook">
      <div className="lookbook-left">
        <h2>{lookbook?.name}</h2>
        <div className="desc">{lookbook?.description}</div>
        <div className="banners">
          {lookbook?.banners?.map((banner, i) => (
            <div key={banner._id} className="banners-wrapper">
              <img src={publicURL(banner.img)} alt="banner" />
            </div>
          ))}
        </div>
      </div>

      <div className="lookbook-right">
        <div className="lookbook-right-item">
          <h3 className="rightName">모델 사이즈</h3>
          <p>{lookbook?.modelInfo}</p>
        </div>

        <div className="lookbook-right-item">
          <h3 className="rightName">착용 사이즈</h3>
          <p>
            {lookbook?.wearingSize?.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        
        <div className="lookbook-right-item">
          <h3 className="rightName">관련 상품</h3>
          <div className="relatedProduct">
            {lookbook?.products?.map((product) => (
              <div className="relatedProduct-wrapper" key={product._id}>
                <div className="relatedProduct-wrapper-left">
                  <Link to={`/products/${product._id}`} className="link">
                    <img
                      src={publicURL(product.productImgs[0].fileName)}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="relatedProduct-wrapper-right">
                  <p className="brandName">{product.brand}</p>
                  <p>
                    {product.name} ({product.color})
                  </p>
                  <p>₩{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lookbook;

