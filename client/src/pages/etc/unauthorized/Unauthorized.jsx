import { NavLink } from "react-router-dom";
import "./unauthorized.scss";

function UnAuthorized() {

  return (
    <>
      <main className="unauthorized">
        <section className="unauthorized-wrapper">
          <div className="unauthorized-content">
            <div className="unauthorized-content-detail">
              <span className="unauthorized-subtitle">Unauthorized</span>
              <h1 className="unauthorized-title">
                You do not have access to the requested page.
              </h1>
              <NavLink to="/" className="unauthorized-content-detail-btn">
                Go Home
              </NavLink>
            </div>
          </div>

          <div className="unauthorized-img">
            <img src="/assets/ghost-img.png" alt="" />
            <div className="unauthorized-img-shadow"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default UnAuthorized;
