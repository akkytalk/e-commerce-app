import React from "react";

import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      {/* <div onClick={e => window.scrollTo({top: 0,}) } className="footer-backtotop">
            <p >Back to top</p>
            </div> */}
      <div className="footer-row">
        <div className="footer-row-about">
          <h4>Get To Know Us</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Release</li>
            <li>Amazon Cares</li>
            <li>Gift a Smile</li>
          </ul>
        </div>
        <div className="footer-row-about">
          <h4>Connect with Us</h4>
          <ul>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="footer-row-about">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on Amazon</li>
            <li>Sell under Amazon Accelerator</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment by Amazon</li>
            <li>Advertise Your Products</li>
            <li>Amazon Pay on Merchants</li>
          </ul>
        </div>
        <div className="footer-row-about">
          <h4>Let Us Help You</h4>
          <ul>
            <li>COVID-19 and Amazon</li>
            <li>Your Account</li>
            <li>Returns Centre</li>
            <li>100% Purchase Protection</li>
            <li>Amazon App Download</li>
            <li>Amazon Assistant Download</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
