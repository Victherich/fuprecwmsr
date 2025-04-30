
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import whoImage from '../Images/ggg6.jpg'; // Make sure to place an appropriate image in your project

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

const ResearchAndCollaboration = () => {
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
        <Title>
        Research and Collaboration Opportunities</Title>
        <Paragraph>
        
Research and Collaboration Opportunities
At the Centre for Waste Management and Sustainable Resources (CWMSR), we are dedicated to advancing scientific knowledge and developing innovative solutions to address pressing environmental challenges. Our research activities and collaborative partnerships focus on sustainability, waste management, and environmental protection, with a special emphasis on the oil and gas sector. We welcome collaboration with academic institutions, industries, government agencies, and NGOs to foster impactful research and development. Visit our webpage on research and collaboration unit for further details.
<br/>
<br/>
<strong>Short Courses and Professional Development</strong>
<br/>

Our Centre also offers <strong>short courses</strong> and <strong>professional development programs</strong> to industries, researchers, and students. Short courses are designed to enhance the skills and knowledge of professionals in waste management and environmental sustainability, enabling them to meet industry demands and regulatory standards.
<br/><br/>
Through these diverse research and collaboration opportunities, CWMSR aims to drive impactful environmental solutions, foster industry innovation, and empower academic and community partners in creating a more sustainable future. We invite organizations and individuals who share our vision to join us in these exciting ventures.
 </Paragraph>
    
      </TextSection>
    </Container>
  );
};

export default ResearchAndCollaboration;

