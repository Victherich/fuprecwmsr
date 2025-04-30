// import React, { useEffect, useRef } from 'react';
// import '../CSS/MajorServices.css'; // Import the CSS file
// import MS1 from "../Images/MS1.png";
// import MS2 from "../Images/MS2.png";
// import MS3 from "../Images/MS3.png";
// import MS4 from "../Images/MS4.png";
// import MS5 from "../Images/MS5.png";
// import MS6 from "../Images/MS6.png";
// import MS7 from "../Images/MS7.png";
// import MS8 from "../Images/MS8.png";
// import "animate.css"; // Import animate.css

// const MajorServices = () => {
//   const services = [
//     {
//       title: 'Air Freight',
//       description: 'Our Air Freight services ensure fast, reliable delivery of your goods to international destinations.',
//       image: MS1,
//     },
//     {
//       title: 'Shipping',
//       description: 'We provide reliable and efficient shipping services, ensuring that your goods are delivered safely and on time.',
//       image: MS2,
//     },
//     {
//       title: 'Clearing and Forwarding',
//       description: 'We offer professional clearing and forwarding services to help you clear your goods quickly and cost-effectively.',
//       image: MS3,
//     },
  
//   ];

//   // Observer to trigger animation when elements scroll into view
//   const observer = useRef(null);

//   useEffect(() => {
//     observer.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // Add animation classes for different elements
//             if (entry.target.classList.contains('service-image')) {
//               entry.target.classList.add('animate__animated', 'animate__slideInRight');
//             } else if (entry.target.classList.contains('service-info')) {
//               entry.target.classList.add('animate__animated', 'animate__fadeInUp');
//             } else if (entry.target.classList.contains('service-title')) {
//               entry.target.classList.add('animate__animated', 'animate__slideInLeft');
//             } else if (entry.target.classList.contains('service-description')) {
//               entry.target.classList.add('animate__animated', 'animate__slideInRight');
//             }
//           }
//         });
//       },
//       { threshold: 0.3 } // Trigger when 30% of the element is visible
//     );

//     // Observe each service element (image, info, title, description)
//     const serviceImages = document.querySelectorAll('.service-image');
//     const serviceInfos = document.querySelectorAll('.service-info');
//     const serviceTitles = document.querySelectorAll('.service-title');
//     const serviceDescriptions = document.querySelectorAll('.service-description');

//     serviceImages.forEach((image) => observer.current.observe(image));
//     serviceInfos.forEach((info) => observer.current.observe(info));
//     serviceTitles.forEach((title) => observer.current.observe(title));
//     serviceDescriptions.forEach((description) => observer.current.observe(description));

//     // Cleanup on component unmount
//     return () => {
//       if (observer.current) {
//         observer.current.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <div className="services-section">
//       <h2 className="services-title">Our Major Services</h2>
//       <div className="services-grid">
//         {services.map((service, index) => (
//           <div key={index} className="service-card">
//             <img src={service.image} alt={service.title} className="service-image" />
//             <div className="service-info">
//               <h3 className="service-title">{service.title}</h3>
//               <p className="service-description">{service.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MajorServices;



import React, { useEffect, useRef } from 'react';
import '../CSS/MajorServices.css'; // Updated CSS file
import DiplomaImg from "../Images/pic7.jpg";
import MScImg from "../Images/pic9.jpg";
import PhDImg from "../Images/phd.jpeg";
import "animate.css"; // Import animations
import { FaArrowCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Academics = () => {

  const navigate = useNavigate()

  const programs = [
    { title: 'Professional Diploma', image: DiplomaImg },
    { title: 'Masters Degree (MSc)', image: MScImg },
    { title: 'Doctor of Philosophy (Ph.D)', image: PhDImg },
  ];

  // Observer for animations
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__slideInRight', 'animate__slower');
          }
        });
      },
      { threshold: 0.3 }
    );

    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach((card) => observer.current.observe(card));

    return () => observer.current.disconnect();
  }, []);

  return (
    <div className="academics-section">
      <h2 className="academics-title">ACADEMICS & PROGRAMS</h2>
      <div className="academics-grid">
        {programs.map((program, index) => (
          <div key={index} className="program-card2">
            <img src={program.image} alt={program.title} className="program-image" />
            <h3 className="program-title">{program.title}</h3>  
          </div>
        ))}
      </div>
      <button onClick={()=>navigate('/academics')}>
        Read More <FaArrowCircleRight/>
      </button>
    </div>
  );
};

export default Academics;

