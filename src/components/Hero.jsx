import React, { useState, useEffect, useContext } from 'react';
import '../CSS/Hero.css';
import HeroImg1 from "../Images/HeroImg1.png"
import HeroImg2 from "../Images/HeroImg2.png"
import HeroImg3 from "../Images/HeroImg3.png"
import HeroImg4 from "../Images/HeroImg4.png"
import "animate.css"
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {trackingID,setTrackingID}=useContext(Context)
  const navigate = useNavigate();

  // Array of background images and captions
  const slides = [
    {
      image: HeroImg1, // Make sure these paths point to your images
      caption: "Delivering Excellence Across the Globe",
    },
    {
      image: HeroImg2,
      caption: "Your Trusted Cargo Partner",
    },
    {
      image: HeroImg3,
      caption: "Fast, Reliable, and Secure Shipments",
    },
    {
      image: HeroImg4,
      caption: "Connecting Businesses, One Shipment at a Time",
    }
  ];

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  // handling tracking

  
  

  return (
    <section className="hero " style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
      <div className="overlay"></div>

      <div className="hero-content ">
        <h1 className="company-name animate animate__animated animate__slideInUp">{`Welcome to VCA`}</h1>
        <p className="caption animate animate__animated animate__slideInLeft">{slides[currentSlide].caption}</p>

        <div className="tracking-form animate__animated animate__slideInRight ">
          <input type="text" placeholder="Enter Tracking ID" onChange={(e)=>setTrackingID(e.target.value)}/>
          <button onClick={()=>navigate("/trackshipment")}>Track Shipment</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;


// import React, { useState, useEffect, useRef } from 'react';
// import 'animate.css'; // Import animate.css for animations
// import '../CSS/Hero.css'; // Your custom CSS
// import HeroImg1 from "../Images/HeroImg1.png";
// import HeroImg2 from "../Images/HeroImg2.png";
// import HeroImg3 from "../Images/HeroImg3.png";
// import HeroImg4 from "../Images/HeroImg4.png";

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Array of background images and captions
//   const slides = [
//     {
//       image: HeroImg1,
//       caption: "Delivering Excellence Across the Globe",
//     },
//     {
//       image: HeroImg2,
//       caption: "Your Trusted Cargo Partner",
//     },
//     {
//       image: HeroImg3,
//       caption: "Fast, Reliable, and Secure Shipments",
//     },
//     {
//       image: HeroImg4,
//       caption: "Connecting Businesses, One Shipment at a Time",
//     }
//   ];

//   // Change slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   // Refs for observing elements
//   const heroRef = useRef(null);
//   const companyNameRef = useRef(null);
//   const captionRef = useRef(null);
//   const trackingFormRef = useRef(null);

//   useEffect(() => {
//     const options = {
//       threshold: 0.1, // Trigger when 10% of the element is visible
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate__animated', 'animate__slideInUp'); // Add animation classes
//         }
//       });
//     }, options);

//     // Observe elements
//     if (companyNameRef.current) observer.observe(companyNameRef.current);
//     if (captionRef.current) observer.observe(captionRef.current);
//     if (trackingFormRef.current) observer.observe(trackingFormRef.current);

//     return () => {
//       if (companyNameRef.current) observer.unobserve(companyNameRef.current);
//       if (captionRef.current) observer.unobserve(captionRef.current);
//       if (trackingFormRef.current) observer.unobserve(trackingFormRef.current);
//     };
//   }, []);

//   return (
//     <section
//       ref={heroRef}
//       className="hero"
//       style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
//     >
//       <div className="overlay"></div>

//       <div className="hero-content">
//         <h1 ref={companyNameRef} className="company-name animate__animated animate__slideInUp">
//           {`Welcome to VCA`}
//         </h1>
//         <p ref={captionRef} className="caption animate">
//           {slides[currentSlide].caption}
//         </p>

//         <div ref={trackingFormRef} className="tracking-form animate">
//           <input type="text" placeholder="Enter Tracking ID" />
//           <button>Track Shipment</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

