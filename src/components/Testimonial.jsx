import React from 'react';
import Slider from 'react-slick';
import '../CSS/Testimonial.css'; // Importing the CSS file
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; // Import icons
import T1 from "../Images/TestimonialImg1.png"
import T2 from "../Images/TestimonialImg2.png"
import T3 from "../Images/TestimonialImg3.png"


const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, ABC Corp",
      text: "Vinrichard's Clearing Agents Limited provided the best service we could have hoped for. Their dedication and transparency were outstanding!",
      image: T2,
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Manager, XYZ Logistics",
      text: "I've worked with many logistics companies, but Vinrichard's Clearing Agents is truly on another level. Their service is professional and quick.",
      image: T1,
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "Founder, Johnson Shipping",
      text: "They offer exceptional customer service. We are completely satisfied with their work and would highly recommend them!",
      image: T3,
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true
  };

  return (
    <div className="testimonial-carousel">
      <h2 className="carousel-title">What Our Clients Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-slide">
            <div className="testimonial-content">
              <FaQuoteLeft className="quote-icon left" />
              <p className="testimonial-text">{testimonial.text}</p>
              <FaQuoteRight className="quote-icon right" />
              <div className="client-info">
                <img src={testimonial.image} alt={testimonial.name} className="client-image" />
                <div>
                  <h3 className="client-name">{testimonial.name}</h3>
                  <p className="client-position">{testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
