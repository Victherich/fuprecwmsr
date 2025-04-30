import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/CommunityImpact.css"; // Import CSS file

// Sample images (Replace with actual images)
import Img1 from "../Images/ci1.jpeg";
import Img2 from "../Images/ci2.jpeg";
import Img3 from "../Images/ci3.jpeg";
import Img4 from "../Images/ci4.jpeg";
import Img5 from "../Images/ci5.jpeg";
import { useLocation } from "react-router-dom";


const CommunityImpact = () => {
  const images = [Img1, Img2, Img3, Img4, Img5,];
  const location = useLocation();
 

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4, // Shows 4 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="community-impact">
     {location.pathname!=='/gallery' && <h2 className="community-title">Community Impact</h2>}
     {location.pathname!=='/gallery' &&<p className="community-text">
        At the Centre for Waste Management and Sustainable Resources (CWMSR), 
        community is at the heart of our mission. Discover vibrant connections, 
        collaborative opportunities, and a supportive environment where students, 
        staff, and alumni thrive together to shape a better future.
      </p>}
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Community ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CommunityImpact;
