import { Link } from "react-router-dom";
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="d-flex py-3">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="#">About us</Link></li>
              <li><Link to="#">Our services</Link></li>
              <li><Link to="#">Privacy policy</Link></li>
              <li><Link to="#">Affiliate program</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get help</h4>
            <ul>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Shipping</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">Order status</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Online shop</h4>
            <ul>
              <li><Link to="#">Watch</Link></li>
              <li><Link to="#">Bag</Link></li>
              <li><Link to="#">Shoes</Link></li>
              <li><Link to="#">Dress</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow me</h4>
            <div className="social-links">
              <Link to="https://www.facebook.com/farid.mohamed.96199/" target="__blank"><FontAwesomeIcon icon={faFacebook} /></Link>
              <Link to="https://wa.me/+201029911289" target="__blank"><FontAwesomeIcon icon={faWhatsapp}/></Link>
              <Link to="https://www.linkedin.com/in/farid-mohamed-455884322?utm_source=share&utm_
              campaign=share_via&utm_content=profile&utm_medium=android_app" target="__blank">
                <FontAwesomeIcon icon={faLinkedin} /></Link>
              <Link to="https://www.instagram.com/farid_mohamed10?igsh=b3dnOHhmdXNyM3V6" target="__blank"><FontAwesomeIcon icon={faInstagram} /></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}