


// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import logo from "../Images/logo2.png";
// import 'animate.css';  
// import '../CSS/Header.css'
// import BeautifulDropdown from './DropDown';
// import BeautifulDropdown2 from './DropDown2';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();


//   const navRef = useRef(null);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const toggleAboutDropdown = () => {
//     setAboutDropdownOpen(!aboutDropdownOpen);
//   };

//   const closeMenus = () => {
//     setMenuOpen(false);
//     setAboutDropdownOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         navRef.current &&
//         !navRef.current.contains(event.target)
//       ) {
//         setAboutDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="header">
//       <div className="logo" onClick={() => navigate('/')}>
//         <img src={logo} alt="logo" />
//       </div>

//       <nav ref={navRef} className={menuOpen ? "nav-menu active" : "nav-menu"}>
//         <ul>
//           <li>
//             <a
//               onClick={() => {
//                 navigate('/');
//                 closeMenus();
//               }}
//               className={location.pathname === "/" ? "active" : ""}
//             >
//               Home
//             </a>
//           </li>

//           {/* ABOUT US with dropdown */}
//           <li className="dropdown">
//             <a
//               onClick={toggleAboutDropdown}
//               className={
//                 location.pathname.includes("aboutus") ||
//                 location.pathname.includes("directormessage") ||
//                 location.pathname.includes("staffteam") ||
//                 location.pathname.includes('shortcourses')
//                   ? "active"
//                   : ""
//               }
//             >
//               About ▾
//             </a>
//             {aboutDropdownOpen && (
//               <ul className="dropdown-menu">
//                 <li onClick={() => { navigate('/aboutus'); closeMenus(); }}>About Us</li>
//                 <li onClick={() => { navigate('/directormessage'); closeMenus(); }}>Director’s Message</li>
//                 <li onClick={() => { navigate('/staffteam'); closeMenus(); }}>Our Staff Team</li>
//                 <li onClick={() => { navigate('/shortcourses'); closeMenus(); }}>Short Courses</li>
//               </ul>
//             )}
//           </li>

//           {/* Regular nav items */}
//           {['Academics','Admissions','Application', 'Portal', 'Contact Us'].map((text, index) => {
//             const path = `/${text.toLowerCase().replace(' ', '')}`;
//             return (
//               <li key={index}>
//                 <a
//                   onClick={() => {
//                     navigate(path);
//                     closeMenus();
//                   }}
//                   className={location.pathname === path ? "active" : ""}
//                 >
//                   {text}
//                 </a>
//               </li>
//             );
//           })}
// <BeautifulDropdown2/>
//           <BeautifulDropdown/>
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
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../Images/logo2.png";

import BeautifulDropdown from './DropDown';
import BeautifulDropdown2 from './DropDown2';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleAboutDropdown = () =>
    setAboutDropdownOpen(!aboutDropdownOpen);

  const closeMenus = () => {
    setMenuOpen(false);
    setAboutDropdownOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <HeaderWrapper>
      <Logo onClick={() => navigate('/')}>
        <img src={logo} alt="logo" />
      </Logo>

      <Nav ref={navRef} open={menuOpen}>
        <ul>
          <li>
            <a
              onClick={() => {
                navigate('/');
                closeMenus();
              }}
              className={location.pathname === "/" ? "active" : ""}
            >
              Home
            </a>
          </li>

          {/* About Dropdown */}
          <li>
            <a onClick={toggleAboutDropdown}>
              About ▾
            </a>

            {aboutDropdownOpen && (
              <DropdownMenu>
                <li onClick={() => { navigate('/aboutus'); closeMenus(); }}>About Us</li>
                <li onClick={() => { navigate('/directormessage'); closeMenus(); }}>Director’s Message</li>
                <li onClick={() => { navigate('/staffteam'); closeMenus(); }}>Our Staff Team</li>
                <li onClick={() => { navigate('/shortcourses'); closeMenus(); }}>Short Courses</li>
              </DropdownMenu>
            )}
          </li>

          {/* Other Links */}
          {['Academics','Admissions','Application','Portal','Contact Us'].map((text, i) => {
            const path = `/${text.toLowerCase().replace(' ', '')}`;
            return (
              <li key={i}>
                <a
                  onClick={() => {
                    navigate(path);
                    closeMenus();
                  }}
                  className={location.pathname === path ? "active" : ""}
                >
                  {text}
                </a>
              </li>
            );
          })}

          <BeautifulDropdown2 />
          <BeautifulDropdown />
        </ul>
      </Nav>

      <Hamburger onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
    </HeaderWrapper>
  );
};

export default Header;

/* ================= Styled Components ================= */

const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 3px solid green;
  position: sticky;
  top:0;
  z-index: 200;
  
`;

const Logo = styled.div`
  img {
    height: 50px;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: green;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #0a7a0a;
    }
  }

  .active {
    border-bottom: 2px solid green;
  }

  /* MOBILE */
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: ${({ open }) => (open ? '0' : '-100%')};
    width: 250px;
    height: 100vh;
    background: #fff;
    transition: 0.3s;
    padding-top: 20px;

    ul {
      flex-direction: column;
      gap: 15px;
      padding-left: 20px;
    }
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  background: #fff;
  border: 1px solid green;
  margin-top: 10px;
  padding: 10px;
  list-style: none;

  li {
    padding: 8px;
    cursor: pointer;
    color: green;

    &:hover {
      background: #e6f5e6;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    border: none;
    padding-left: 15px;
  }
`;

const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: green;

  @media (max-width: 768px) {
    display: block;
  }
`;

