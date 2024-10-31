import React, { useEffect, useRef } from 'react';
import '../CSS/Services.css';
import { FaPlane, FaShip } from 'react-icons/fa';
import airFreightImage from '../Images/SB.png';  // Replace with actual image path
import seaFreightImage from '../Images/SB9.png';  // Replace with actual image path
import 'animate.css'; // Import animate.css for animations

const Services = () => {
  const observer = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          if (element.tagName === 'H2') {
            element.classList.add('animate__animated', 'animate__slideInUp', 'animate__slower');
          } else if (element.tagName === 'P') {
            element.classList.add('animate__animated', 'animate__slideInLeft', 'animate__slow');
          } else if (element.tagName === 'LI') {
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

    // Observe the h2, p, and li elements
    const headings = document.querySelectorAll('.service-content h2');
    const paragraphs = document.querySelectorAll('.service-content p');
    const listItems = document.querySelectorAll('.service-content ul li');

    headings.forEach((heading) => {
      if (heading) observer.current.observe(heading);
    });

    paragraphs.forEach((paragraph) => {
      if (paragraph) observer.current.observe(paragraph);
    });

    listItems.forEach((listItem) => {
      if (listItem) observer.current.observe(listItem);
    });

    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="services-page">
      {/* Page Heading */}
      <div className="services-heading">
        <h1>Our Services</h1>
      </div>

      {/* Air Freight Section */}
      <section className="service-section air-freight">
        <div className="service-content">
          <h2>Air Freight</h2>
          <p>
            Fast & Reliable, Air Shipping<br />
            Vinrichard's Clearing Agent Limited provides fast, flexible, and reliable air freight solutions, wherever your destination, whatever your deadline.
          </p>
          <p>
            We handle time-critical and valuable freight due to a strong global network, experience, and relationships with airlines and customs. Our services cater to specific air freight requirements, from origin to doorstep. We handle everything from scheduled consolidations and single consignments to hazardous cargo.
          </p>
          <ul>
            <li>Direct airwaybill for un-consolidated shipments</li>
            <li>Direct to consignee</li>
            <li>Dedicated or partly aircraft charter</li>
            <li>Consolidations</li>
            <li>Cross trades (Airport-to-Airport or Door-to-Door services)</li>
            <li>Documentations</li>
            <li>Import customs clearance</li>
            <li>Export customs clearance</li>
            <li>Hazardous cargo handling</li>
          </ul>
        </div>
        <div className='SI1'>
          {/* <img src={airFreightImage} alt="Air Freight" /> */}
        </div>
      </section>

      {/* Ocean Freight Section */}
      <section className="service-section ocean-freight">
        <div className="service-content">
          <h2>Ocean Freight</h2>
          <p>
            Sea Logistics<br />
            At Vinrichard's Clearing Agent Limited, we ship any cargo of any shape, size, or weight. Whether you're looking for full container or part container, we have dedicated teams for both imports and exports.
          </p>
          <p>
            Our team provides solutions for out-of-gauge challenges, ensuring smooth and professional transportation services. We hold all necessary licenses and training to handle your sea freight forwarding needs.
          </p>
          <ul>
            <li>Whole container load</li>
            <li>Part container Load</li>
            <li>Container Groupage</li>
            <li>Out of gauge</li>
            <li>Conventional Sea Logistics</li>
            <li>Import and Export clearance</li>
            <li>Documentation services</li>
          </ul>
        </div>
        <div className='SI2'>
          {/* <img src={seaFreightImage} alt="Sea Freight" /> */}
        </div>
      </section>
    </div>
  );
};

export default Services;
