// import React, { useState, useEffect, useRef } from 'react';
// import '../CSS/Header.css';  // Importing the CSS file
// import { FaBars, FaTimes } from 'react-icons/fa';
// import logo from "../Images/logo.jpeg";
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navRef = useRef(null);
//   const navigate = useNavigate()

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Handle click outside to close menu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
//         setMenuOpen(false);  // Close menu if click outside
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
    
//     // Cleanup event listener
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [menuOpen]);

//   return (
//     <header className="header">
//       <div className="logo">
//         <img src={logo} alt="logo" />
//         <h1>Cargo & Logistics</h1>
//       </div>

//       <nav ref={navRef} className={menuOpen ? "nav-menu active" : "nav-menu"}>
//         <ul>
//           <li><a onClick={()=>{navigate("/");setMenuOpen(false)}}>Home</a></li>
//           <li><a onClick={()=>{navigate("/services");setMenuOpen(false)}}>Services</a></li>
//           <li><a onClick={()=>{navigate("/aboutus");setMenuOpen(false)}}>About us</a></li>
//           <li><a onClick={()=>{navigate("/trackshipment");setMenuOpen(false)}}>Track Shipment</a></li>
//           <li><a onClick={()=>{navigate("/pricing");setMenuOpen(false)}}>Pricing</a></li>
//           <li><a onClick={()=>{navigate("/contactus");setMenuOpen(false)}}>Contact Us</a></li>
//         </ul>
//       </nav>

//       <div className="hamburger" onClick={toggleMenu}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Header.css';  // Importing the CSS file
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../Images/logo.jpeg";
import { useNavigate } from 'react-router-dom';
import 'animate.css';  // Importing animate.css

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);  // Ref for logo
  const navItemsRef = useRef([]);  // Ref for nav items
  const hamburgerRef = useRef(null);  // Ref for hamburger icon
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);  // Close menu if click outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Intersection Observer to trigger animations when in view
  useEffect(() => {
    const options = {
      threshold: 0.1,  // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInDown');  // Add animation when visible
        }
      });
    }, options);

    // Observe the logo, nav items, and hamburger
    if (logoRef.current) observer.observe(logoRef.current);
    if (hamburgerRef.current) observer.observe(hamburgerRef.current);

    navItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (logoRef.current) observer.unobserve(logoRef.current);
      if (hamburgerRef.current) observer.unobserve(hamburgerRef.current);
      navItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <header className="header">
      <div className="logo" ref={logoRef}>
        <img src={logo} alt="logo" />
        <h1>Cargo & Logistics</h1>
      </div>

      <nav ref={navRef} className={menuOpen ? "nav-menu active" : "nav-menu"}>
        <ul>
          {['Home', 'Services', 'About us', 'Track Shipment', 'Pricing', 'Contact Us'].map((text, index) => (
            <li key={index} ref={el => navItemsRef.current[index] = el}>
              <a onClick={() => {if(text==="Home"){navigate("/")}else navigate(`/${text.toLowerCase().replace(' ', '')}`); setMenuOpen(false); }}>{text}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hamburger" onClick={toggleMenu} ref={hamburgerRef}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
