import React from "react";
import styled from "styled-components";
import BackgroundImage from "../Images/logo.png"; // Replace with your actual image path

// Styled Components
const ParallaxSection = styled.div`
  position: relative;
  height: 100vh;
  background: url(${BackgroundImage}) center/cover fixed no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #333;

  @media(max-width:428px){
    height:150vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7); /* Transparent white overlay */
`;

const Content = styled.div`
  position: relative;
  max-width: 900px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px); /* Subtle blur effect */
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: orangered;
  text-shadow: 2px 2px 6px rgba(255, 69, 0, 0.3);
  margin-bottom: 15px;

  @media (max-width:428px){
    font-size:2rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: #444;
`;

const Introduction = () => {
  return (
    <ParallaxSection>
      <Overlay />
      <Content>
        <Title>INTRODUCTION</Title>
        <Text>
          The Centre for Waste Management and Sustainable Resources was established in January 2024 at
          the Federal University of Petroleum Resources Effurun (FUPRE) to address the growing demand
          for sustainable waste management practices and environmental health solutions in the petroleum
          and allied industries.
        </Text>
        <Text>
          Dr. Akinyemi Ogunkeyede, with extensive experience in environmental management and pollution
          control, serves as the pioneer Acting Director of the Centre.
        </Text>
        <Text>
          The Centre aims to produce professionals equipped with both theoretical knowledge and practical
          skills to manage waste and address environmental challenges effectively, particularly in the
          oil and gas sector. Our programs are designed to develop professionals who can make significant
          contributions to sustainable development and community resilience.
        </Text>
      </Content>
    </ParallaxSection>
  );
};

export default Introduction;
