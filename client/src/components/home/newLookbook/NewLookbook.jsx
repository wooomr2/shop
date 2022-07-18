import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNewLookbook } from "../../../slice/lookbookSlice";
import publicURL from "../../../utils/publicURL";
import "./newLookbook.scss";


function NewLookbook() {
  const dispatch = useDispatch();
  const refContent = useRef(null);
  const refInner = useRef(null);
  const lookbooks = useSelector((store) => store.lookbook.lookbooks);
  
  useEffect(() => {
    dispatch(getNewLookbook());
  }, []);

  const { current: elContent } = refContent;
  const { current: elInner } = refInner;

  let startX;
  let x;
  let pressed = false;

  const onMouseDown = (e) => {
    pressed = true;
    startX = e.clientX - elInner.offsetLeft;
  };

  const onMouseUp = () => {
    pressed = false;
  };

  const onMouseLeave = () => {
    pressed = false;
  };

  const onMouseMove = (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.clientX;

    elInner.style.left = `${x - startX}px`;
    const outer = elContent.getBoundingClientRect();
    const inner = elInner.getBoundingClientRect();

    if (parseInt(elInner.style.left) > 0) {
      elInner.style.left = "0px";
    } else if (inner.right < outer.right) {
      elInner.style.left = `-${inner.width - outer.width}px`;
    }
  };

  return (
    <div className="newLookbook">
      <div className="newLookbook-wrapper">
        <div className="newLookbook-wrapper-top">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <h3>Lookbook</h3>
          </div>
          <Link to={`lookbooks`}>
            <div className="viewMore">
              <h4>View More</h4>
            </div>
          </Link>
        </div>
        <div
          ref={refContent}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          className="newLookbook-wrapper-content"
        >
          <div ref={refInner} className="content-inner" >
            {lookbooks?.map(({ _id, banners, name, products }, i) => (
              <div className="content-inner-wrapper" key={i}>
                <Link to={`lookbooks/${_id}`}>
                  <div className="mainImg-wrapper">
                    <img src={publicURL(banners[0]?.img)} alt="mainImg" />
                  </div>
                </Link>
                <div className="newLookbook-info">
                  <p><b>{name}</b></p>
                </div>

                <div className="relatedProduct">
                  {products?.map(({ _id, name, brand, color, productImgs }, i) => (
                    <Link to={`products/${_id}`} key={i}>
                      <div className="relatedProduct-wrapper">
                        <div className="img-wrapper">
                          <img src={productImgs && publicURL(productImgs[0]?.fileName)} alt="" />
                        </div>
                        <div className="relatedProduct-info">
                          <p><b>{brand}</b></p>
                          <p>{name}</p>
                          <p>{color}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLookbook;
