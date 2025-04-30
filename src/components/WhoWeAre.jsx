
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import whoImage from '../Images/pic2.jpg'; // Make sure to place an appropriate image in your project

const Container = styled.div`
  background-color: #ffffff;
  color: #333;
  padding: 60px 20px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 885px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const TextSection = styled(motion.div)`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  color: #0f9d58;
  margin-bottom: 20px;
  text-align: center;

  @media(min-width: 768px) {
    text-align: left;
  }
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #444;
  text-align: justify;
`;

const Highlight = styled.span`
  color: #f57c00;
  font-weight: bold;
`;

const ImageSection = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const WhoWeAre = () => {
  return (
    <Container>
      <ImageSection
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Image src={whoImage} alt="CWMSR team working" />
      </ImageSection>

      <TextSection
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>WHO WE ARE</Title>
        <Paragraph>
          The <Highlight>Centre for Waste Management and Sustainable Resources (CWMSR)</Highlight> is a pioneering research and academic hub dedicated to addressing the growing environmental challenges of waste management and promoting sustainable development practices. Located at the <Highlight>Federal University of Petroleum Resources, Effurun (FUPRE)</Highlight>, Delta State, Nigeria, the Centre is at the forefront of innovation in waste management, environmental sustainability, and pollution control, with a particular focus on the oil and gas sector.
        </Paragraph>
        <Paragraph>
          Our mission is to advance knowledge and provide sustainable solutions to waste and environmental challenges through research, education, and collaboration. With state-of-the-art facilities and a multidisciplinary team of experts, the Centre is committed to fostering a cleaner, healthier environment by integrating scientific research, technological innovation, and community engagement.
        </Paragraph>
      </TextSection>
    </Container>
  );
};

export default WhoWeAre;
