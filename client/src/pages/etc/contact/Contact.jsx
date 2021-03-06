import "./contact.scss";

function Contact() {
  return (
    <div className="contact">
      <ul className="contact-list">
        <span className="contact-list-bar" />
        <li>
          <div className="text">
            <h2>CONTACT</h2>
            <p>채팅 상담</p>
            <p>온라인숍 이용안내</p>
            <p>1:1문의</p>
          </div>
          <div className="img">
            <img src="/assets/mainbg1.jpeg" alt="" />
          </div>
        </li>
        <li className="left">
          <div className="text">
            <h2>CS CENTER</h2>
            <p>E-MAIL) haoshoppingmall@gmail.com</p>
            <p>MON-SUN 9:00-18:00</p>
            <p>BREAKTIME 12:30-13:30</p>
          </div>
          <div className="img">
            <img src="/assets/mainbg2.jpeg" alt="" />
          </div>
        </li>
        <li>
          <div className="text">
            <h2>CATEGORY</h2>
            <p>SHOPPING</p>
            <p>BRAND</p>
            <p>LOOKBOOK</p>
            <p>COLLECTION</p>
          </div>
          <div className="img">
            <img src="/assets/mainbg3.jpeg" alt="" />
          </div>
        </li>
      </ul>

      <div className="team">
        <div className="team-title">
          <h2>Our Team</h2>
        </div>

        <div className="team-wrapper">
          <a href="https://github.com/wooomr2">
            <div className="team-wrapper-person">
              <img src="/assets/team/margelo_faces_christoph.svg" alt="dkj" />
              <p>MyeongJin</p>
              <p>@wooomr2</p>
            </div>
          </a>

          <a href="https://github.com/oneny">
            <div className="team-wrapper-person">
              <img src="/assets/team/margelo_faces_szymon.svg" alt="dkj" />
              <p>JaeWon</p>
              <p>@oneny</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
