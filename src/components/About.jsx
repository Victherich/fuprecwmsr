// import React, { useEffect, useRef } from 'react';
// import '../CSS/About.css';
// import { FaUsers, FaShip, FaBuilding, FaHandshake } from 'react-icons/fa';
// import teamImage from '../Images/ourvision.png';  // replace with actual image path
// import globalImage from '../Images/whoweare2.png';  // replace with actual image path
// import 'animate.css'; // Import animate.css for animations

// const AboutUs = () => {
//   const observer = useRef(null);

//   useEffect(() => {
//     const handleIntersection = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const element = entry.target;

//           if (element.tagName === 'H1') {
//             element.classList.add('animate__animated', 'animate__slideInDown', 'animate__slower');
//           } else if (element.tagName === 'H2') {
//             element.classList.add('animate__animated', 'animate__slideInLeft', 'animate__slower');
//           } else if (element.tagName === 'H3') {
//             element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
//           } else if (element.tagName === 'P') {
//             element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
//           } else if (element.tagName === 'IMG') {
//             element.classList.add('animate__animated', 'animate__slideInLeft', 'animate__slow');
//           }

//           // Unobserve the element after animation to avoid re-triggering
//           observer.current.unobserve(element);
//         }
//       });
//     };

//     observer.current = new IntersectionObserver(handleIntersection, {
//       threshold: 0.3, // Trigger when 30% of the element is visible
//     });

//     // Observe the h1, h2, h3, p, and img elements
//     const headings1 = document.querySelectorAll('.about-us-page h1');
//     const headings2 = document.querySelectorAll('.about-us-page h2');
//     const headings3 = document.querySelectorAll('.about-us-page h3');
//     const paragraphs = document.querySelectorAll('.about-us-page p');
//     const images = document.querySelectorAll('.about-us-page img');

//     headings1.forEach((heading) => {
//       if (heading) observer.current.observe(heading);
//     });

//     headings2.forEach((heading) => {
//       if (heading) observer.current.observe(heading);
//     });

//     headings3.forEach((heading) => {
//       if (heading) observer.current.observe(heading);
//     });

//     paragraphs.forEach((paragraph) => {
//       if (paragraph) observer.current.observe(paragraph);
//     });

//     images.forEach((image) => {
//       if (image) observer.current.observe(image);
//     });

//     // Cleanup observer on component unmount
//     return () => {
//       if (observer.current) {
//         observer.current.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <div className="about-us-page">
//       {/* Page Heading with background image */}
//       <div className="about-us-heading">
//         <h1>About Us</h1>
//       </div>

//       {/* Main Content Section */}
//       <div className="about-us-content">
//         <section className="about-us-text">
//           <h2>Who We Are</h2>
//           <p>
//             Founded on March 22nd, 2022, and officially registered with the Corporate Affairs Commission (RC 1908412), Vinrichard's Clearing Agents Limited has quickly become a trusted name in logistics and real estate. Located in the heart of Lagos at Room 101, NPA Commercial Building, TCIP, we specialize in shipping, clearing and forwarding, customs brokerage, and estate agency services.
//           </p>
//           <p>
//             Our team of 14 committed professionals is focused on delivering top-quality service with honesty and integrity. As a company licensed by the Nigeria Customs Service, we ensure that every job is handled with precision and full compliance, making us a reliable partner for businesses navigating international trade and real estate.
//           </p>
//           <div className="about-icons">
//             <FaUsers className="about-icon" />
//             <FaShip className="about-icon" />
//             <FaBuilding className="about-icon" />
//           </div>
//         </section>

//         {/* Team Image */}
//         <section className="about-us-image">
//           <img src={teamImage} alt="Team" />
//         </section>
//       </div>

//       {/* Our Vision Section */}
//       <div className="about-vision-section">
//         <h2>Our Vision</h2>
//         <p>
//           Customer satisfaction is at the heart of everything we do. We believe our success is directly tied to the success of our clients. Our aim is to not just meet but exceed expectations through careful attention to detail, professionalism, and a personal touch in every interaction.
//         </p>
//         <p>
//           As we continue to grow, our goal is to expand our reach and build strong partnerships beyond Nigeria. We look forward to a future where our services connect businesses across the globe.
//         </p>
//         <div className='VisionImgWrap'>
//           <img src={globalImage} alt="Global Partnership" />
//         </div>
//       </div>

//       {/* Our Motto and Values Section */}
//       <div className="about-motto-section">
//         <h2>Our Values</h2>
//         <div className="about-values">
//           <div className="value-card">
//             <FaHandshake className="value-icon" />
//             <h3>Our Motto</h3>
//             <p>Sincerity in Service</p>
//           </div>
//           <div className="value-card">
//             <FaUsers className="value-icon" />
//             <h3>Our Goal</h3>
//             <p>Customer Satisfaction</p>
//           </div>
//           <div className="value-card">
//             <FaBuilding className="value-icon" />
//             <h3>Our Dream</h3>
//             <p>Global Partnerships</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import React from 'react'
import AboutHero from './AboutHero'
import WhoWeAre from './WhoWeAre'
import VisionMission from './VisionMIssion'
import OverviewVisionMission from './OverviewVisionMission'
import KeyFeaturesOfTheCenter from './KeyFeaturesOfTheCenter'
import WhyChooseCWMSR from './WhyChooseCWMSR'
import KeyPrograms from './KeyPrograms'
import ResearchAndCollaboration from './ResearchAndCollaboration'
import Stats from './Stats'
import StaffTeam from './StaffTeam'

const About = () => {
  return (
    <div>
      <AboutHero/>
      <WhoWeAre/>
      <VisionMission/>
      <OverviewVisionMission/>
      <KeyFeaturesOfTheCenter/>
      <WhyChooseCWMSR/>
      <KeyPrograms/>
      <ResearchAndCollaboration/>
      <Stats/>
     
    </div>
  )
}

export default About

