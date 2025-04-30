
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  background-color: white;
  color: #333;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 1200px;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #228B22; /* Green */
  margin-bottom: 1rem;
  text-transform: uppercase;
  animation: fadeIn 2s ease-in-out;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #ff6f00; /* Orange */
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Content = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: fadeInUp 3s ease-in-out;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
  list-style-type: none;
  line-height: 1.8;
  animation: fadeInUp 3s ease-in-out;
`;

const GreenButton = styled.button`
  background-color: #228B22; /* Green */
  color: white;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom:20px;

  &:hover {
    background-color: #1c6e1b;
  }
`;

const Footer = styled.footer`
  margin-top: 3rem;
  font-size: 1rem;
  color: #666;
`;

const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    text-align: left;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;

// Keyframes for animations
const fadeIn = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const fadeInUp = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const WhyChooseCWMSR = () => {
    const navigate = useNavigate();
  return (
    <>
      <style>{fadeIn}</style>
      <style>{fadeInUp}</style>
      <ResponsiveContainer>
        <Container>
          <Title>Why Choose CWMSR?</Title>

          <Subtitle>1. Expert Faculty</Subtitle>
          <Content>
            Learn from a multidisciplinary team of researchers, educators, and industry professionals with extensive experience in environmental science and waste management.
          </Content>

          <Subtitle>2. Hands-on Learning</Subtitle>
          <Content>
            Engage in practical, research-based learning in state-of-the-art facilities, ensuring that you acquire real-world skills applicable to diverse industries.
          </Content>

          <Subtitle>3. Global Partnerships</Subtitle>
          <Content>
            Benefit from the Centre’s collaborations with leading research institutions and industries worldwide, providing opportunities for global exposure and networking.
          </Content>

          <Subtitle>4. Flexible Learning Options</Subtitle>
          <Content>
            Choose from full-time, part-time, or online distance learning programs designed to fit your schedule and career goals.
          </Content>

          <Subtitle>5. Industry-Relevant Programs</Subtitle>
          <Content>
            Our curriculum is designed to meet the specific needs of the oil and gas sector as well as general waste management industries, ensuring graduates are well-prepared for the job market.
          </Content>

          <Subtitle>Join Us</Subtitle>
          <Content>
            The Centre for Waste Management and Sustainable Resources invites students, researchers, and professionals to explore our educational programs, engage in cutting-edge research, and collaborate on innovative projects. Together, we can create a cleaner, more sustainable future.
          </Content>

          <Content>
            For more information, visit our website or contact us at <a href="mailto:wmsr@fupre.edu.ng">wmsr@fupre.edu.ng</a>.
          </Content>

          <GreenButton onClick={()=>navigate('/contactus')}>Send Us A Message</GreenButton>
          <GreenButton onClick={()=>navigate('/application ')}>Apply Online</GreenButton>
        </Container>

      </ResponsiveContainer>
    </>
  );
};

export default WhyChooseCWMSR;
