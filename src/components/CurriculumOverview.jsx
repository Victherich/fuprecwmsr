import React from "react";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const CurriculumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
  color: #333;
  padding: 80px 20px;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: orangered;
  text-shadow: 2px 2px 6px rgba(255, 69, 0, 0.3);
  margin-bottom: 15px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Subtitle = styled.h2`
  font-size: 2.2rem;
  color: green;
  margin-bottom: 20px;
  text-shadow: 2px 2px 6px rgba(0, 128, 0, 0.3);
  animation: ${fadeIn} 1.8s ease-in-out;
`;

const Text = styled.p`
  font-size: 1rem;
  max-width: 800px;
  line-height: 1.8;
  color: #444;
  animation: ${fadeIn} 2s ease-in-out;
`;

const Divider = styled.div`
  width: 60px;
  height: 5px;
  background: orangered;
  margin: 20px auto;
  border-radius: 10px;
`;

const CurriculumOverview = () => {
  return (
    <CurriculumContainer>
      <Title>Our Curriculum Overview</Title>
      <Divider />
      <Subtitle>A Commitment to Excellence</Subtitle>
      <Text>
        The Champion School aims at offering all our students a broad and balanced curriculum
        that provides rewarding and stimulating activities to prepare them for the best social
        and cultural life.
      </Text>
      <Text>
        Whether it is our books or hands-on training, we make sure each student gets personal
        attention to cope up and flourish in every subject for better scores and a brighter future.
      </Text>
    </CurriculumContainer>
  );
};

export default CurriculumOverview;
