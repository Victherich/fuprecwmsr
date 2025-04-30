import React, { useEffect, useRef } from 'react';
import '../CSS/ServicesBrief.css';
import { useNavigate } from 'react-router-dom';
import briefImage from '../Images/SB.png';  // replace with actual image path
import 'animate.css'; // Import animate.css for animations

const ServicesBrief = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  const handleMoreClick = () => {
    navigate('/services');  // Navigates to the full Services page
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
    const heading = document.querySelector('.services-brief-text h2');
    const paragraph = document.querySelector('.services-brief-text p');
    const button = document.querySelector('.services-brief-text button');

    if (heading) observer.current.observe(heading);
    if (paragraph) observer.current.observe(paragraph);
    if (button) observer.current.observe(button);

    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="services-brief-section">
      {/* Content Section */}
      <div className="services-brief-content">
        <div className="services-brief-text">
          <h2>Your Future Starts Here @
          CENTRE FOR WASTE MANAGEMENT  & SUSTAINABLE RESOURCES,FUPRE</h2>
         
          <button className="explore-more-btn" onClick={()=>navigate('/application')}>
            
            Get Started
          </button>
        </div>
        <div className="services-brief-image">
          {/* <img src={briefImage} alt="Services" /> */}
        </div>
      </div>
    </div>
  );
};

export default ServicesBrief;
