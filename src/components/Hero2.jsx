// import React, { useState, useEffect } from 'react';
// import '../CSS/Hero.css';
// import 'animate.css';
// import HeroImg5 from "../Images3/im5.jpeg";
// import HeroImg6 from "../Images3/im6.jpeg";
// import HeroImg9 from "../Images3/im9.jpeg";
// import HeroImg17 from "../Images3/im17.jpeg";
// import HeroImg19 from "../Images3/im19.jpeg";
// import HeroImg20 from "../Images3/im20.jpeg";
// import HeroImg27 from "../Images3/im27.jpeg";
// import HeroImg28 from "../Images3/im28.jpeg";
// import HeroImg29 from "../Images3/im29.jpeg";
// import HeroImg30 from "../Images3/im30.jpeg";
// import HeroImg31 from "../Images3/im31.jpeg";
// import HeroImg32 from "../Images3/im32.jpeg";
// import HeroImg33 from "../Images3/im33.jpeg";
// import HeroImg34 from "../Images3/im34.jpeg";
// import HeroImg35 from "../Images3/im35.jpeg";
// import HeroImg36 from "../Images3/im36.jpeg";
// import HeroImg37 from "../Images3/im37.jpeg";

// const slides = [
//   { image: HeroImg5 },
//   { image: HeroImg6 },
//   { image: HeroImg9 },
//   { image: HeroImg17 },
//   { image: HeroImg19 },
//   { image: HeroImg20 },
//   { image: HeroImg27 },
//   { image: HeroImg28 },
//   { image: HeroImg29 },
//   { image: HeroImg30 },
//   { image: HeroImg31 },
//   { image: HeroImg32 },
//   { image: HeroImg33 },
//   { image: HeroImg34 },
//   { image: HeroImg35 },
//   { image: HeroImg36 },
//   { image: HeroImg37 },
// ];

// const Hero2 = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section 
//       className="hero" 
//       style={{ 
//         backgroundImage: `url(${slides[currentSlide].image})`,
//         transition: 'background-image 0.5s ease-in-out'
//       }}
//     >
//       <div className="overlay"></div>

//       <div className="hero-content">
//         <h1 className="company-name animate__animated animate__slideInUp">
//           🌍 Welcome to Centre for Waste Management and Sustainable Resources (CWMSR) 🌱♻️
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default Hero2;




import React, { useState, useEffect } from 'react';
import '../CSS/Hero.css';
import 'animate.css';
import HeroImg5 from "../Images3/im5.jpeg";
import HeroImg6 from "../Images3/im6.jpeg";
import HeroImg9 from "../Images3/im9.jpeg";
import HeroImg17 from "../Images3/im17.jpeg";
import HeroImg19 from "../Images3/im19.jpeg";
import HeroImg20 from "../Images3/im20.jpeg";
import HeroImg27 from "../Images3/im27.jpeg";
import HeroImg28 from "../Images3/im28.jpeg";
import HeroImg29 from "../Images3/im29.jpeg";
import HeroImg30 from "../Images3/im30.jpeg";
import HeroImg31 from "../Images3/im31.jpeg";
import HeroImg32 from "../Images3/im32.jpeg";
import HeroImg33 from "../Images3/im33.jpeg";
import HeroImg34 from "../Images3/im34.jpeg";
import HeroImg35 from "../Images3/im35.jpeg";
import HeroImg36 from "../Images3/im36.jpeg";
import HeroImg37 from "../Images3/im37.jpeg";

const slides = [
  { 
    image: HeroImg5, 
    title: "🌍 Welcome to Centre for Waste Management and Sustainable Resources (CWMSR) 🌱♻️" 
  },
  { 
    image: HeroImg6, 
    title: "🔬 Advancing Innovative Research in Sustainable Environmental Technologies" 
  },
  { 
    image: HeroImg9, 
    title: "💡 Transforming Organic Waste into Clean Energy & Resources" 
  },
  { 
    image: HeroImg17, 
    title: "🤝 Empowering Communities Through Green Skill Development & Training" 
  },
  { 
    image: HeroImg19, 
    title: "🌱 Promoting Eco-Friendly Agriculture & Organic Bioslurry Solutions" 
  },
  { 
    image: HeroImg20, 
    title: "♻️ Driving Circular Economy Initiatives for a Cleaner Future" 
  },
  { 
    image: HeroImg27, 
    title: "📊 Cutting-Edge Environmental Monitoring and Assessment" 
  },
  { 
    image: HeroImg28, 
    title: "🌍 Building Climate Resilient Infrastructure and Systems" 
  },
  { 
    image: HeroImg29, 
    title: "🔬 Pioneering Biotechnology Solutions for Waste Recovery" 
  },
  { 
    image: HeroImg30, 
    title: "💡 Innovative Engineering for Sustainable Resource Management" 
  },
  { 
    image: HeroImg31, 
    title: "🤝 Collaborative Partnerships for Global Environmental Goals" 
  },
  { 
    image: HeroImg32, 
    title: "🌱 Sustainable Practices for Cleaner Communities" 
  },
  { 
    image: HeroImg33, 
    title: "♻️ Reducing Carbon Footprint Through Advanced Recycling" 
  },
  { 
    image: HeroImg34, 
    title: "🌍 Championing Environmental Education and Advocacy" 
  },
  { 
    image: HeroImg35, 
    title: "🔬 Rigorous Scientific Approach to Ecological Preservation" 
  },
  { 
    image: HeroImg36, 
    title: "💡 Empowering the Next Generation of Green Innovators" 
  },
  { 
    image: HeroImg37, 
    title: "🌱 Shaping a Greener and More Sustainable Tomorrow Together" 
  },
];

const Hero2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="hero" 
      style={{ 
        backgroundImage: `url(${slides[currentSlide].image})`,
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 
          key={currentSlide} 
          className="company-name animate__animated animate__slideInUp"
        >
          {slides[currentSlide].title}
        </h1>
      </div>
    </section>
  );
};

export default Hero2;