import React, { useState, useEffect, useContext } from 'react';
import '../CSS/Hero.css';
import HeroImg1 from "../Images/pic1.jpg"
import HeroImg2 from "../Images/pic2.jpg"
import HeroImg3 from "../Images/pic3.jpg"
import HeroImg4 from "../Images/pic4.jpg"
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
      image: HeroImg1, 
      caption: "Innovating Sustainable Waste Management",
    },
    {
      image: HeroImg2,
      caption: "Transforming Waste into Resources",
    },
    {
      image: HeroImg3,
      caption: "Pioneering Environmental Sustainability Solutions",
    },
    {
      image: HeroImg4,
      caption: "Advancing Research for a Greener Future",
    }
];


  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  // handling tracking

  
  

  return (
    <section className="hero " style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
      <div className="overlay"></div>

      <div className="hero-content ">
        <h1 className="company-name animate animate__animated animate__slideInUp">{`🌍 Welcome to Centre for Waste Management and Sustainable Resources (CWMSR) 🌱♻️`}</h1>
        {/* <p className="caption animate animate__animated animate__slideInLeft">{slides[currentSlide].caption}</p> */}

        <div className="tracking-form animate__animated animate__slideInRight ">
          {/* <input type="text" placeholder="Enter Tracking ID" onChange={(e)=>setTrackingID(e.target.value)}/> */}
          <button onClick={()=>navigate("/aboutus")} style={{border:"1px solid white"}}>Get Started</button>
          <button onClick={()=>navigate("/application")} style={{backgroundColor:"green", border:"1px solid white"}}>Apply Now</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

