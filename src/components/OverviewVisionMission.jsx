
import React from 'react';
import styled from 'styled-components';
import pic4 from '../Images/pic4.jpg'

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

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
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

const OverviewVisionMission = () => {
  return (
    <>
      <style>{fadeIn}</style>
      <style>{fadeInUp}</style>
      <ResponsiveContainer>
        <Container>
          <Title>OVERVIEW OF THE CENTRE’S VISION & MISSION</Title>
          <Subtitle>Vision</Subtitle>
          <Content>
            To be a leading Centre of excellence in waste management and sustainable
            resource utilization, fostering innovative solutions that contribute to environmental
            protection, community development, and a circular economy. We envision a world where waste
            is effectively managed, resources are maximized, and sustainability is at the core of every
            practice in industrial and environmental systems.
          </Content>

          <Subtitle>Mission</Subtitle>
          <Content>
            Our mission at the Centre for Waste Management and Sustainable Resources is to advance
            research, education, and practical solutions in the fields of waste management and environmental
            sustainability. We are committed to:
            <ul>
              <li><strong>Research and Innovation:</strong> Conducting cutting-edge research to develop sustainable technologies and methodologies that address environmental challenges, particularly in waste management, resource recovery, and pollution control.</li>
              <li><strong>Capacity Building:</strong> Empowering students, professionals, and communities with the skills and knowledge required to implement sustainable practices and drive environmental stewardship through training, workshops, and outreach programs.</li>
              <li><strong>Collaboration:</strong> Building strong partnerships with academic institutions, government agencies, industries, and non-governmental organizations to foster collaboration, share expertise, and drive collective action toward a more sustainable future.</li>
              <li><strong>Community Impact:</strong> Promoting sustainable development at the local, national, and global levels by integrating waste management solutions that benefit both the environment and society.</li>
            </ul>
            By fulfilling our mission, we aim to contribute to a cleaner, healthier environment and play a pivotal role in shaping a sustainable future for generations to come.
          </Content>

          <Image
            src={pic4}
            alt="Centre for Waste Management"
          />
          
          {/* <GreenButton>Learn More</GreenButton> */}
        </Container>

    
      </ResponsiveContainer>
    </>
  );
};

export default OverviewVisionMission;
