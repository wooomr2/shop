import "./contact.scss";

function Contact() {
  return (
    <div className="contact">
      <span className="contact-bar" />
      <ul className="contact-list">
        <li>
          <div className="text">
            <h2>CONTACT</h2>
            <p>카카오톡 채팅상담</p>
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
            <p>CS TEL. 02-111-1111</p>
            <p>E-MAIL cs@haocompany.com</p>
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
    </div>
  );
}

export default Contact;
