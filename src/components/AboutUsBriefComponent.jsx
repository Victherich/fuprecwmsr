import React, { useEffect, useRef } from 'react';
import '../CSS/AboutUsBriefComponent.css';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaShip } from 'react-icons/fa';
import briefImage from '../Images/whoweare2.png'; // replace with actual image path
import 'animate.css'; // Import animate.css for animations

const AboutUsBrief = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  const handleMoreClick = () => {
    navigate('/aboutus');  // Navigates to the full About Us page
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.tagName === 'H2') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slower');
          } else if (element.tagName === 'P') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
          } else if (element.tagName === 'BUTTON') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
          }
          // Unobserve the element after animation to avoid re-triggering
          observer.current.unobserve(element);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // Trigger when 30% of the element is visible
    });

    // Observe the h2, p, and button elements
    const heading = document.querySelector('.about-us-brief-text h2');
    const paragraphs = document.querySelectorAll('.about-us-brief-text p');
    const button = document.querySelector('.more-about-btn');

    if (heading) observer.current.observe(heading);
    paragraphs.forEach(paragraph => {
      if (paragraph) observer.current.observe(paragraph);
    });
    if (button) observer.current.observe(button);

    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-us-brief-section">
      {/* Content Section */}
      <div className="about-us-brief-content">
        <div className="about-us-brief-text">
          <h2>About Vinrichard's Clearing Agents Limited</h2>
          <p>
            Founded in 2022, our company has quickly become a trusted name in logistics and real estate. Located in Lagos, we specialize in shipping, clearing and forwarding, customs brokerage, and estate agency services.
          </p>
          <p>
            Our team of dedicated professionals ensures every job is handled with precision and full compliance, making us a reliable partner in international trade and real estate.
          </p>
          <div className="about-brief-icons">
            <FaUsers className="about-brief-icon" />
            <FaShip className="about-brief-icon" />
            <FaBuilding className="about-brief-icon" />
          </div>
          <button className="more-about-btn" onClick={handleMoreClick}>
            More About VCA
          </button>
        </div>

        {/* Image Section */}
        <div className="about-us-brief-image">
          {/* <img src={briefImage} alt="About Us" /> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUsBrief;
