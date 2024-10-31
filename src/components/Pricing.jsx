import React from 'react';
import '../CSS/Pricing.css';
import { FaPlane, FaShip, FaBolt } from 'react-icons/fa';
import "animate.css"

const Pricing = () => {
  return (
    <div className="pricing-page ">
      <div className="pricing-heading animate__animated animate__slideInLeft animate__slower">
        <h2 className='animate__animated animate__slideInRight animate__slower'>Our Pricing Plans</h2>
      </div>
      <div className="pricing-content">
        <div className="pricing-grid">
          <div className="pricing-card">
            <FaPlane className="pricing-icon" />
            <h3>Air Cargo</h3>
            <p>Fast delivery with air cargo services. Perfect for time-sensitive shipments.</p>
            <p className="price">$200 per 100kg</p>
          </div>

          <div className="pricing-card">
            <FaShip className="pricing-icon" />
            <h3>Sea Cargo</h3>
            <p>Cost-effective shipping through sea freight. Best for bulk and heavy goods.</p>
            <p className="price">$150 per 500kg</p>
          </div>

          <div className="pricing-card">
            <FaBolt className="pricing-icon" />
            <h3>Express Service</h3>
            <p>Quick and reliable delivery for urgent packages across the globe.</p>
            <p className="price">$50 per 50kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
