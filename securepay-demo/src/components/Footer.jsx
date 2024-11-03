import React from "react";
import {FaInstagram, FaFacebook, FaTwitter, FaYoutube} from "react-icons/fa";



function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="info">
                    &copy; {new Date().getFullYear()} SecurePay. All rights reserved.
                </p>
                <div className="info-container">
                    <a href="#" className="info">
                        About
                    </a>
                    <a href="#" className="info">
                        Contact
                    </a>
                    <a href="#" className="info">
                        Privacy Policy
                    </a>
                </div>
             <div className="icon-container">
                    <FaInstagram className="social-icon" />
                    <FaFacebook className="social-icon" />
                    <FaTwitter className="social-icon" />
                    <FaYoutube className=" social-icon" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;