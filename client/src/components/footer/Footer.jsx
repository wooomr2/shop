import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>CONTACT</p>
        <div className="footer-content-middle">
          <p>(주)HAO</p>
          <p>haoshoppingmall@gmail.com</p>
        </div>
        <div className="footer-content-bottom">
          <p>MON-SUN 9:00-18:00</p>
          <p>BREAKTIME 12:30-13:30</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
