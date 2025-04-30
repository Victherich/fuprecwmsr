import React, { useEffect, useRef, useState } from 'react';
import '../CSS/ShipmentCalculator.css'; // Import the CSS file
import SC from "../Images/ShipmentCalculatorImg.png";
import logo from "../Images/logo.png";
import 'animate.css'; // Import animate.css for animations
import Swal from 'sweetalert2';

const ShipmentCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [cargoType, setCargoType] = useState('air');
  const [destination, setDestination] = useState('domestic');
  const [serviceType, setServiceType] = useState('normal');
  const [price, setPrice] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.tagName === 'H2' || element.tagName === 'H3') {
            element.classList.add('animate__animated', 'animate__slideInLeft', 'animate__slow');
          } else if (element.tagName === 'P' || element.tagName === 'LABEL') {
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

    // Observe the h2, h3, p tags, and labels
    const headings2 = document.querySelectorAll('.shipment-calculator h2');
    const headings3 = document.querySelectorAll('.shipment-calculator h3');
    const paragraphs = document.querySelectorAll('.shipment-calculator p');
    const labels = document.querySelectorAll('.shipment-calculator label');

    headings2.forEach((heading) => {
      if (heading) observer.current.observe(heading);
    });

    headings3.forEach((heading) => {
      if (heading) observer.current.observe(heading);
    });

    paragraphs.forEach((paragraph) => {
      if (paragraph) observer.current.observe(paragraph);
    });

    labels.forEach((label) => {
      if (label) observer.current.observe(label);
    });

    // Cleanup observer on component unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const calculatePrice = () => {
    // Define your rates here
    const rates = {
      air: {
        domestic: { normal: 0.5, quick: 1.0 },
        international: { normal: 1.0, quick: 2.0 },
      },
      sea: {
        domestic: { normal: 0.3, quick: 0.6 },
        international: { normal: 0.6, quick: 1.2 },
      },
    };

    // Calculate volume
    const volume = (height * width * length) / 1000000; // Volume in cubic meters

    // Base price per kilogram
    const basePrice = 5; // Example base rate per kg

    // Calculate total price
    const weightCost = weight * basePrice;
    const volumeCost = volume * basePrice * 2; // Double for volume

    const rate = rates[cargoType][destination][serviceType];
    const totalPrice = (weightCost + volumeCost) * rate;

    // Update price state
    setPrice(totalPrice.toFixed(2));

    // Trigger SweetAlert with the calculated price
    Swal.fire({
      title: "Total Price",
      text: `$ ${totalPrice.toFixed(2)} USD`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  };

  return (
    <div className='ShipmentCalculatorWrap'>
      <div className="shipment-calculator">
        <h2 className="title">Shipment Price Calculator</h2>
        <form onSubmit={(e) => { e.preventDefault(); calculatePrice(); }}>
          <div className="calculator-form">
            <label>
              Weight (kg):
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </label>
            <div className='InputWrap'>
              <label>
                Height (cm):
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
              </label>
              <label>
                Width (cm):
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} required/>
              </label>
              <label>
                Length (cm):
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} required/>
              </label>
            </div>

            <label>
              Destination:
              <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>

            <div className='InputWrap'>
              <label>
                Service Type:
                <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={{ width: "100%" }} required>
                  <option value="normal">Normal Service</option>
                  <option value="quick">Quick Service</option>
                </select>
              </label>

              <label>
                Cargo Type:
                <select value={cargoType} onChange={(e) => setCargoType(e.target.value)} required>
                  <option value="air">Air Cargo</option>
                  <option value="sea">Sea Cargo</option>
                </select>
              </label>
              <img src={logo} alt="logo" style={{ width: "100px" }} />
            </div>

            <button className="calculate-button" type='submit'>Calculate Price</button>
          </div>
        </form>
      </div>
      <div className='ShipmentCalculatorImg'>
        {/* <img src={SC} alt="sc" /> */}
      </div>
    </div>
  );
};

export default ShipmentCalculator;
