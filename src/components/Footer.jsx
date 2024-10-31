import React, { useEffect, useRef } from 'react';
import '../CSS/Footer.css';  // Importing the CSS file
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import logo from "../Images/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import 'animate.css'; // Import animate.css for animations

const Footer = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.classList.contains('P')) {
            element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slower');
          } else if (element.classList.contains('li')) {
            element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slow');
          } else if (element.classList.contains('H2')) {
            element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slow');
          } else if (element.classList.contains('social')) {
            element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slow');
          }
          // Unobserve the element after animation to avoid re-triggering
          observer.current.unobserve(element);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // Trigger when 30% of the element is visible
    });

    // Observe the footer sections
    const sections = document.querySelectorAll('.footer-section');

    sections.forEach(section => {
      if (section) observer.current.observe(section);
    });

    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src={logo} alt="logo"/>
          <h2>Vinrichard's Clearing Agents Limited</h2>
          <p>We are dedicated to providing top-notch cargo and logistics services, ensuring that your shipments reach their destination safely and efficiently.</p>
          <p><strong>Our Motto:</strong> Sincerity in Service</p>
          <p><strong>Our Goal:</strong> Customer Satisfaction</p>
          <p><strong>Our Dream:</strong> Global Partnerships</p>
        </div>
        
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a onClick={() => navigate("/")}>Home</a></li>
            <li><a onClick={() => navigate("/services")}>Services</a></li>
            <li><a onClick={() => navigate("/aboutus")}>About us</a></li>
            <li><a onClick={() => navigate("/trackshipment")}>Track Shipment</a></li>
            <li><a onClick={() => navigate("/pricing")}>Pricing</a></li>
            <li><a onClick={() => navigate("/contactus")}>Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Information</h4>
          <p><FaMapMarkerAlt /> ROOM 101 NPA COMMERCIAL BUILDING NATIONAL B/STOP TIN CAN ISLAND PORT APAPA LAGOS.</p>
          <p><FaMapMarkerAlt /> AMERICA 🇺🇸 120-33 195TH STREET SAINT ALBANS QUEENS NY 11412.</p>
          <p><FaPhoneAlt /> +234 803 306 2743</p>
          <p><FaPhoneAlt /> +1 929 631 9254</p>
          <p><FaEnvelope/> info@vinrichards.com</p>
          <p><FaEnvelope /> vvpassmak@gmail.com</p>
          <p><FaEnvelope /> vinrichardsca@gmail.com</p>
          
        </div>

        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a ><FaFacebook /></a>
            <a ><FaTwitter /></a>
            <a ><FaInstagram /></a>
            <a href="" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vinrichard's Clearing Agents Limited. All Rights Reserved.</p>
        
        <p style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.6)",marginTop:"10px"}}><span style={{color:"rgba(0,255,0,0.7)"}}>POWERED BY</span> ELEXDON DIGITAL TECHNOLOGIES LIMITED</p>
      </div>
    </footer>
  );
};

export default Footer;
