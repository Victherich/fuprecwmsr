import React, { useEffect, useRef } from 'react';
import '../CSS/AboutUsBriefComponent.css';
import { useNavigate } from 'react-router-dom';
import { FaRecycle, FaLeaf, FaFlask } from 'react-icons/fa';
import briefImage from '../Images/whoweare2.png'; // replace with actual image path
import 'animate.css'; // Import animate.css for animations
import Swal from 'sweetalert2'

const AboutUsBrief = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  const handleMoreClick = () => {
    // navigate('/aboutus');  // Navigates to the full About Us page
    Swal.fire({
      title:"About us page is coming soon..."
    })
  };

  const handleAlert = ()=>{
    Swal.fire({
      title:"About us page is coming soon..."
    })
  }

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
          <h2>♻️ About CWMSR ♻️</h2>
          <p>
          The Centre for Waste Management and Sustainable Resources (CWMSR) is a pioneering research and academic hub dedicated to addressing the growing environmental challenges of waste management and promoting sustainable development practices. 
          </p>
          <p>
          Located at the Federal University of Petroleum Resources, Effurun (FUPRE), Delta State, Nigeria, the Centre is at the forefront of innovation in waste management, environmental sustainability, and pollution control, with a particular focus on the oil and gas sector.</p>
          <div className="about-brief-icons">
          <FaRecycle className="about-brief-icon" />
<FaLeaf className="about-brief-icon" />
<FaFlask className="about-brief-icon" />
          </div>
          <button className="more-about-btn" onClick={()=>navigate('/aboutus')}>
            More About CWMSR
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
