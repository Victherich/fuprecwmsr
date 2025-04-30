import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FaRecycle, FaUsers, FaIndustry } from "react-icons/fa";
import { GiTalk, GiClothes } from "react-icons/gi";
import bgPattern from "../Images/ad1.jpg";


// Data for the slides
const initiatives = [
  {
    icon: <FaRecycle size={40} />,
    title: "Zero Waste Campus Program",
    text: `Building on these partnerships, the Centre has launched impactful initiatives, starting with the Zero Waste Campus Program, a joint effort with CDAF to train 60 FUPRE students and staff on sustainable waste practices. Additionally, the Centre organized brand audit training, empowering FUPRE volunteers to conduct waste brand audits, a critical advocacy tool for sustainable change.`,
  },
  {
    icon: <FaUsers size={40} />,
    title: "Brand Audit Training",
    text: `The Centre’s influence extended beyond campus when it was invited as a special guest at the Clean Warri Initiative, launched by Warri South LGA. This opportunity, facilitated by Hon. Mofe, Chairman of the Delta State Waste Management Board, allowed the Centre to showcase research-based solutions for waste management challenges within the LGA.`,
  },
  {
    icon: <GiTalk size={40} />,
    title: "Clean Warri Initiative",
    text: `National recognition soon followed. The Centre was one of the 300 exhibitors selected out of over 3,000 applicants for the TETFUND NRF-TETFAIR Exhibition at Eagle Square, Abuja. In the exhibition's deal room, the Centre engaged with potential investors to explore opportunities for commercializing its innovative products.`,
  },
  {
    icon: <FaIndustry size={40} />,
    title: "TETFund NRF-TETFAIR Exhibition",
    text: `The Centre's impact also reached the creative sector as it was a special guest at the Warri Fashion Week 2024, where it delivered a talk on the circular economy of waste in reshaping the fashion industry.`,
  },
  {
    icon: <GiClothes size={40} />,
    title: "Warri Fashion Week 2024",
    text: `The Centre's impact also reached the creative sector as it was a special guest at the Warri Fashion Week 2024, where it delivered a talk on the circular economy of waste in reshaping the fashion industry.`,
  },
];

const InitiativesSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <Wrapper>
      <TitleSection>
        <h2>🌟 Pioneering Initiatives and Programs</h2>
        <h3
          style={{
            color: "white",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          Impactful projects that are transforming waste management in Nigeria.
        </h3>
      </TitleSection>

      <SliderWrapper>
        <Slider {...settings}>
          {initiatives.map((item, index) => (
            <InitiativeCard key={index}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </InitiativeCard>
          ))}
        </Slider>
      </SliderWrapper>
    </Wrapper>
  );
};







const Wrapper = styled.section`
  background: url(${bgPattern}) top no-repeat;
  background-size: cover;
  padding: 4rem 2rem;
  color: #1e2e1e;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    background: rgba(0, 0, 0, 0.7); /* Dark overlay */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Corrected typo */
    z-index: 1; /* Puts overlay behind content */
  }

  /* Ensure content appears above overlay */
  > * {
    position: relative;
    z-index: 2;
  }
`;


const TitleSection = styled.div`
  text-align: center;
  max-width: 800px;
  margin: auto;
position:relative;
  h2 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.2rem;
    color: #fff;
    margin-top: 0.5rem;
  }
`;

const SliderWrapper = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 1rem;

  .slick-slide {
    padding: 10px;
  }

  .slick-dots li button:before {
    color: white;
    font-size:2rem;
    
  }

  .slick-prev:before,
  .slick-next:before {
    color: white;
    font-size: 30px;
  }
`;

const InitiativeCard = styled.div`
  background: #f4fff4;
  border-left: 6px solid #ff6600;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 6px 18px rgba(0, 128, 0, 0.1);
  text-align: left;
  transition: all 0.3s ease;

  h3 {
    color: #ff6600;
    margin-top: 1rem;
    font-size: 1.3rem;
  }

  p {
    margin-top: 0.75rem;
    font-size: 1rem;
    color: #2c3d2c;
  }

  svg {
    color: #0c5b34;
  }
`;


export default InitiativesSection;
