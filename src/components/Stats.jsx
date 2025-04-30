
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const StatsContainer = styled.section`
  background: #ffffff;
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0px 4px 15px rgba(0, 128, 0, 0.1);
  max-width: 1200px;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  animation: fadeIn 2s ease-in-out;
`;

const StatCard = styled.div`
  background: #f8fff8;
  border: 2px solid #e6f4e6;
  padding: 1.5rem;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 1.5s ease forwards;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px rgba(0, 128, 0, 0.2);
  }
`;

const Number = styled.h2`
  font-size: 2.5rem;
  color: #ff6f00; /* Orange */
  margin-bottom: 0.5rem;
`;

const Label = styled.p`
  font-size: 1.1rem;
  color: #228b22; /* Green */
  font-weight: bold;
`;

const CTA = styled.div`
  margin-top: 3rem;
  text-align: center;
  animation: fadeInUp 2s ease;
  margin-bottom:20px;

  h2 {
    font-size: 2rem;
    color: #228b22;
    margin-bottom: 1rem;
  }

  button {
    background-color: #ff6f00;
    color: white;
    font-size: 1.1rem;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e65c00;
    }
  }
`;

// Keyframes for animation
const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const fadeInUp = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Stats = () => {
    const navigate = useNavigate();

  return (
    <>
      <style>{fadeIn}</style>
      <style>{fadeInUp}</style>

      <StatsContainer>
        <StatCard>
          <Number>1500+</Number>
          <Label>Success Stories</Label>
        </StatCard>

        <StatCard>
          <Number>13+</Number>
          <Label>Courses</Label>
        </StatCard>

        <StatCard>
          <Number>200+</Number>
          <Label>Happy Students</Label>
        </StatCard>

        <StatCard>
          <Number>12+</Number>
          <Label>Years Experience</Label>
        </StatCard>
      </StatsContainer>

      <CTA>
        <h2>Your Future in waste management and sustainable resources Starts Here.</h2>
        <button onClick={()=>navigate('/application')}>Get Started</button>
      </CTA>
    </>
  );
};

export default Stats;
