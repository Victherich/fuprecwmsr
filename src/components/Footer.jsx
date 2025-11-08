// import React, { useEffect, useRef } from 'react';
// import '../CSS/Footer.css';  // Importing the CSS file
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
// import logo from "../Images/logo.png";
// import { useNavigate } from 'react-router-dom';
// import 'animate.css'; // Import animate.css for animations

// const Footer = () => {
//   const navigate = useNavigate();
//   const observer = useRef(null);

//   useEffect(() => {
//     const handleIntersection = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const element = entry.target;
//           if (element.classList.contains('P')) {
//             element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slower');
//           } else if (element.classList.contains('li')) {
//             element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slow');
//           } else if (element.classList.contains('H2')) {
//             element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slow');
//           } else if (element.classList.contains('social')) {
//             element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slow');
//           }
//           // Unobserve the element after animation to avoid re-triggering
//           observer.current.unobserve(element);
//         }
//       });
//     };

//     observer.current = new IntersectionObserver(handleIntersection, {
//       threshold: 0.3, // Trigger when 30% of the element is visible
//     });

//     // Observe the footer sections
//     const sections = document.querySelectorAll('.footer-section');

//     sections.forEach(section => {
//       if (section) observer.current.observe(section);
//     });

//     // Cleanup observer on component unmount
//     return () => {
//       if (observer.current) {
//         observer.current.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         <div className="footer-section about">
//           <img src={logo} alt="logo"/>
//           <h2>Vinrichard's Clearing Agents Limited</h2>
//           <p>We are dedicated to providing top-notch cargo and logistics services, ensuring that your shipments reach their destination safely and efficiently.</p>
//           <p><strong>Our Motto:</strong> Sincerity in Service</p>
//           <p><strong>Our Goal:</strong> Customer Satisfaction</p>
//           <p><strong>Our Dream:</strong> Global Partnerships</p>
//         </div>
        
//         <div className="footer-section links">
//           <h4>Quick Links</h4>
//           <ul>
//             <li><a onClick={() => navigate("/")}>Home</a></li>
//             <li><a onClick={() => navigate("/services")}>Services</a></li>
//             <li><a onClick={() => navigate("/aboutus")}>About us</a></li>
//             <li><a onClick={() => navigate("/trackshipment")}>Track Shipment</a></li>
//             <li><a onClick={() => navigate("/pricing")}>Pricing</a></li>
//             <li><a onClick={() => navigate("/contactus")}>Contact Us</a></li>
//           </ul>
//         </div>

//         <div className="footer-section contact">
//           <h4>Contact Information</h4>
//           <p><FaMapMarkerAlt /> ROOM 101 NPA COMMERCIAL BUILDING NATIONAL B/STOP TIN CAN ISLAND PORT APAPA LAGOS.</p>
//           <p><FaMapMarkerAlt /> AMERICA 🇺🇸 120-33 195TH STREET SAINT ALBANS QUEENS NY 11412.</p>
//           <p><FaPhoneAlt /> +234 803 306 2743</p>
//           <p><FaPhoneAlt /> +1 929 631 9254</p>
//           <p><FaEnvelope/> info@vinrichards.com</p>
//           <p><FaEnvelope /> vvpassmak@gmail.com</p>
//           <p><FaEnvelope /> vinrichardsca@gmail.com</p>
          
//         </div>

//         <div className="footer-section social">
//           <h4>Follow Us</h4>
//           <div className="social-icons">
//             <a ><FaFacebook /></a>
//             <a ><FaTwitter /></a>
//             <a ><FaInstagram /></a>
//             <a href="" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>&copy; {new Date().getFullYear()} Vinrichard's Clearing Agents Limited. All Rights Reserved.</p>
        
//         <p style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.6)",marginTop:"10px"}}><span style={{color:"rgba(0,255,0,0.7)"}}>POWERED BY</span> ELEXDON DIGITAL TECHNOLOGIES LIMITED</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import React, { useState } from "react";
import "../CSS/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Oops!", "Please enter a valid email address.", "warning");
      return;
    }

    // Show loading alert
    Swal.fire({
      title: "Subscribing...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("https://www.cwmsrfupre.com.ng/api/subscribe_newsletter.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire("Subscribed!", result.message, "success");
        setEmail("");
      } else {
        Swal.fire("Error", result.error || "Something went wrong.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Network error. Please try again later.", "error");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left Section - About */}
        <div className="footer-about">
          <h2>About CWMSR</h2>
          <p>
            The Centre for Waste Management and Sustainable Resources (CWMSR) is a pioneering research 
            and academic hub dedicated to addressing the growing environmental challenges of waste 
            management and promoting sustainable development practices.
          </p>
          <p>Located at the Federal University of Petroleum Resources, Effurun (FUPRE), Delta State, Nigeria.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a onClick={()=>navigate('/')}>Home</a></li>
            {/* <li><a onClick={()=>navigate('/aboutus')}>About us</a></li> */}
            <li><a onClick={()=>navigate('/admissions')}>Admissions</a></li>
            <li><a onClick={()=>navigate('/academics')}>Academics</a></li>
            <li><a onClick={()=>navigate('/events')}>Events</a></li>
            <li><a onClick={()=>navigate('/portal')}>Portal</a></li>
            <li><a onClick={()=>navigate('/gallery')}>Gallery</a></li>
            
            <li><a onClick={()=>navigate('/contactus')}>Contact us</a></li>
          </ul>
        </div>

        {/* Right Section - Contact & Newsletter */}
        <div className="footer-contact">
          <h2>Contact Us</h2>
          <p>Centre for Waste Management and Sustainable
          Resources (CWMSR)
          <br/>Federal University of Petroleum Resources, Effurun (FUPRE), Delta State, Nigeria.</p>
          <p>
            No, 2. Olanikpeku Street APIS ( Bassan Plaza)  Central Business District FCT, Abuja
          </p>
          <p>📞 +234 903 0223 041, +234 808 2407 735, +234 803 619 3299, +234 811 931 7782</p>
          <br/>
          <h3>Emails:</h3>
          <p>✉️ wmsr@fupre.edu.ng</p>
          <p>✉️ contact@cwmsrfupre.com.ng</p>
          <p>✉️ admin@cwmsrfupre.com.ng</p>
          <p>✉️ academic@cwmsrfupre.com.ng</p>

          {/* Newsletter Subscription */}
          <div className="footer-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Social Media Icons */}
          <div className="footer-socials">
            {/* <a href="#"><FaFacebookF /></a> */}
            <a href="https://x.com/FUPRE_CWMSR?t=D09DI9wLi3OPcuPw-w_mbg&s=08" target="_blank"><FaTwitter /></a>
            <a href="https://www.instagram.com/fupre_cwmsr" target="_blank"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/fupre-cwmsr-103813345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CWMSR - All Rights Reserved.</p>
      </div>
         <div
         style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        paddingTop:"50px",
        paddingBottom:"20px"
         }}
         >
         <a style={{fontSize:"0.7rem",
          color:"rgba(255,255,255,0.6)",
          textDecoration:"underline",
          cursor:"pointer"
          }}
          onClick={()=>window.open("https://elexdontech.com", "_blank")}
          >
            <span style={{color:"rgba(0,255,0,0.7)"}}>POWERED BY </span> 
             ELEXDON DIGITAL TECHNOLOGIES LIMITED</a>
      </div>
    </footer>
  );
};

export default Footer;
