
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import heroVideo from "../Images/media3.mp4";

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  overflow: hidden; 

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Text Container
const HeroText = styled.div`
  position: absolute;
  z-index: 2;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isVisible ? "flyInFromBottom 1.5s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }

  @keyframes flyInFromBottom {
    from {
      opacity: 0;
      transform: translateY(300px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(50px);
  animation: ${(props) => (props.isVisible ? "flyInFromSide 1.5s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 428px) {
    font-size: 2rem;
  }

  @keyframes flyInFromSide {
    from {
      opacity: 0;
      transform: translatex(500px);
    }
    to {
      opacity: 1;
      transform: translatex(0);
    }
  }
`;


const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: translateY(-50px);
  animation: ${(props) => (props.isVisible ? "flyInFromTop 1s ease-out forwards" : "none")};

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 428px) {
    font-size: 1rem;
  }

  @keyframes flyInFromTop {
    from {
      opacity: 0;
      transform: translateY(-300px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Hero Component
const AboutHero = () => {
  const heroRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <HeroContainer ref={heroRef}>
      <video autoPlay muted loop>
        <source src={heroVideo} type="video/mp4" />
      </video>
      <HeroText>
        <HeroTitle isVisible={isVisible}>ABOUT CWMSR</HeroTitle>
        {/* <HeroTitle2 isVisible={isVisible}>ACADEMICS AND PROGRAMS</HeroTitle2> */}
        {/* <HeroSubtitle isVisible={isVisible}>Advancing knowledge and innovation globally</HeroSubtitle> */}
      </HeroText>
    </HeroContainer>
  );
};

export default AboutHero;

