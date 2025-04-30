
import React from 'react';
import styled from 'styled-components';
import cd3 from '../Images/cd3.jpeg'

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

const KeyFeaturesOfTheCenter = () => {
  return (
    <>
      <style>{fadeIn}</style>
      <style>{fadeInUp}</style>
      <ResponsiveContainer>
        <Container>
          <Title>KEY FEATURES OF THE CENTRE</Title>

          <Subtitle>1. Advanced Research and Development</Subtitle>
          <Content>
            The Centre is dedicated to groundbreaking research in waste management technologies, environmental sustainability, and pollution control. Research at CWMSR focuses on creating practical, science-driven solutions to waste management challenges in industries such as oil and gas, agriculture, manufacturing, and urban development. Some of our research highlights include:
            <ul>
              <ListItem><strong>Bioremediation and Phytoremediation</strong> techniques for cleaning up oil spills and contaminated environments.</ListItem>
              <ListItem><strong>Petroleum Waste Management</strong> to handle and reduce waste generated from oil exploration, refining, and production.</ListItem>
              <ListItem><strong>Climate-Resilient Agricultural Solutions</strong>, such as bio-composites that enhance soil fertility and water retention.</ListItem>
            </ul>
          </Content>

          <Subtitle>2. Educational and Professional Programs</Subtitle>
          <Content>
            CWMSR offers a wide range of academic and professional development programs designed to equip students and professionals with the knowledge and skills needed to excel in waste management and environmental sustainability. These programs are designed for flexibility, with full-time, part-time, and distance learning options available. Our programs include:
            <ul>
              <ListItem>Professional Diploma Programs in Waste Management and Petroleum Waste Management.</ListItem>
              <ListItem>Postgraduate Diplomas in specialized areas such as Environmental Social Work & Community Development.</ListItem>
              <ListItem>Master’s and Ph.D. Programs in Waste Management, Environmental Health, and related fields.</ListItem>
              <ListItem>Short Courses and certificate programs covering topics such as Oil Spill Response, Wastewater Treatment, and Carbon Capture in the Oil and Gas sector.</ListItem>
            </ul>
          </Content>

          <Subtitle>3. Collaboration and Industry Engagement</Subtitle>
          <Content>
            The Centre actively collaborates with local and international organizations, universities, research institutes, and industries to develop solutions to pressing environmental issues. Our partnerships with oil companies, government bodies, and environmental NGOs ensure that the Centre’s research has a real-world impact. Key areas of collaboration include:
            <ul>
              <ListItem>Oil and Gas Environmental Impact Management</ListItem>
              <ListItem>Sustainable Resource Recovery</ListItem>
              <ListItem>Waste-to-Energy Technologies</ListItem>
              <ListItem>Circular Economy and Zero-Waste Initiatives</ListItem>
            </ul>
          </Content>

          <Subtitle>4. State-of-the-Art Facilities</Subtitle>
          <Content>
            The CWMSR houses cutting-edge laboratories equipped with advanced instrumentation for environmental analysis, pollution monitoring, and waste treatment studies. These facilities enable students and researchers to conduct high-level research and testing, including:
            <ul>
              <ListItem>Atomic Absorption Spectroscopy (AAS)</ListItem>
              <ListItem>Gas Chromatography-Flame Ionization Detector (GC-FID)</ListItem>
              <ListItem>UV-Visible Spectrophotometry</ListItem>
              <ListItem>Flame Photometry</ListItem>
              <ListItem>Microbial Instrumentation for Environmental Toxicology</ListItem>
            </ul>
          </Content>

          <Subtitle>5. Community Outreach and Capacity Building</Subtitle>
          <Content>
            The Centre is deeply committed to community engagement and capacity building, particularly in promoting environmental awareness and sustainable practices. Through training programs, workshops, and initiatives such as the Zero Waste Campus Project, CWMSR empowers individuals and communities to adopt waste reduction and recycling practices, ensuring environmental stewardship at all levels of society.
          </Content>

          <Image
            src={cd3}
            alt="Centre Facilities"
          />

        </Container>

      </ResponsiveContainer>
    </>
  );
};

export default KeyFeaturesOfTheCenter;
