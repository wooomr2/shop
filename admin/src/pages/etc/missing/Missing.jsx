import { NavLink } from "react-router-dom";
import "./missing.scss";

function Missing() {
  return (
    <>
      <main className="missing">
        <section className="missing-wrapper">
          <div className="missing-content">
            <div className="missing-content-detail">
              <span className="missing-subtitle">Error 404</span>
              <h1 className="missing-title">
                요청하신 페이지를 찾을 수 없습니다!
              </h1>
              <p className="missing-description">
                방문하시려는 페이지의 주소가 잘못 입력되었거나, <br />
                페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
                없습니다. <br />
                입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
              </p>
              <NavLink to="/" className="missing-content-detail-btn">
                Go Home
              </NavLink>
            </div>
          </div>

          <div className="missing-img">
            <img src="/assets/ghost-img.png" alt="" />
            <div className="missing-img-shadow"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Missing;
