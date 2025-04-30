
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

const KeyPrograms = () => {
const navigate = useNavigate();


  return (
    <>
      <style>{fadeIn}</style>
      <style>{fadeInUp}</style>
      <ResponsiveContainer>
        <Container>
          <Title>Key Programs and Initiatives</Title>
          <Content>
            At the Centre for Waste Management and Sustainable Resources (CWMSR), we are at the forefront of addressing environmental challenges through cutting-edge research, innovative programs, and capacity-building initiatives tailored to the oil and gas sector and beyond. Our comprehensive programs span postgraduate professional degrees, professional diploma courses, and short certificate courses, with flexible study modes to accommodate full-time, part-time, and distance learning options.
          </Content>

          <Subtitle>1. Zero Waste Campus Project</Subtitle>
          <Content>
            Our Zero Waste Campus Project aims to make the Federal University of Petroleum Resources Effurun a model for sustainability by promoting waste reduction, recycling, and plastic pollution control. The project encourages active participation from students, staff, and local communities, contributing to a cleaner and more sustainable campus environment.
          </Content>

          <Subtitle>2. Professional Postgraduate Programs (Diploma to Doctoral Levels)</Subtitle>
          <Content>
            We offer a variety of postgraduate professional programs designed to equip students with advanced knowledge and skills in waste management and environmental sustainability, with a particular focus on the oil and gas sector. Programs range from Diploma to Ph.D. levels in fields such as:
          </Content>
          <ul>
            <ListItem>Waste Management</ListItem>
            <ListItem>Petroleum Waste Management</ListItem>
            <ListItem>Environmental Health Management</ListItem>
            <ListItem>Environmental Social Work and Community Development</ListItem>
          </ul>
          <Content>
            These programs are structured to meet the demands of professionals, with study modes that include full-time, part-time, and distance online learning options, allowing students to balance education with work and other commitments.
          </Content>

          <Subtitle>3. Professional Diploma Certificate Courses</Subtitle>
          <Content>
            <strong>A.</strong> Our Professional Diploma courses are tailored for those seeking specialized training in:
          </Content>
          <ul>
            <ListItem>Waste Management</ListItem>
            <ListItem>Petroleum Waste Management</ListItem>
            <ListItem>Environmental Health Management</ListItem>
            <ListItem>Environmental Social Work and Community Development</ListItem>
          </ul>
          <Content>
            These courses are designed to equip participants with the practical skills needed to manage complex environmental challenges, especially in the oil and gas industry. The diploma courses provide a robust foundation for career advancement or further study in the field.
          </Content>
          <Content>
            <strong>B. Short courses (Certificate program):</strong> We offer Short Certificate Programs designed for professionals seeking to enhance their expertise in specific areas (see centre short course section for details). These short courses are delivered via flexible schedules, including distance learning options, to cater to working professionals.
          </Content>

          <Subtitle>4. Research and Development in Waste Management and Sustainable Resources</Subtitle>
          <Content>
            CWMSR is a leader in research and development, particularly in waste management technologies relevant to the oil and gas sector.
          </Content>

          <Subtitle>5. Industry-Specific Training and Consultancy in the Oil and Gas Sector</Subtitle>
          <Content>
            Recognizing the environmental impact of the oil and gas industry, the Centre offers specialized training programs for professionals in areas (see centre short courses for detail).
          </Content>

          <Subtitle>6. Environmental Impact Assessment (EIA) and Sustainable Development Training</Subtitle>
          <Content>
            Our Environmental Impact Assessment (EIA) training programs are critical for professionals in industries such as oil and gas, construction, and manufacturing. These programs focus on identifying, assessing, and mitigating environmental risks, ensuring compliance with national and international environmental standards. We also offer courses on sustainable development principles to help organizations align their operations with global sustainability goals.
          </Content>

          <Subtitle>7. Community Outreach, Social Work, and Environmental Health Management</Subtitle>
          <Content>
            Through our <strong>Environmental Social Work and Community Development</strong> program, CWMSR aims to empower communities to adopt sustainable practices, manage resources efficiently, and build resilience to environmental challenges. We also address public health concerns through our <strong>Environmental Health Management</strong> program, offering training in areas such as sanitation, pollution control, and health risk management in both urban and rural settings. These programs provide participants with the skills and knowledge to lead community-based initiatives, promoting environmental justice and health equity.
          </Content>

          <Subtitle>8. Flexible Learning Modes (Full-Time, Part-Time, and Distance Learning)</Subtitle>
          <Content>
            At CWMSR, we recognize the diverse needs of our students and professionals. To accommodate varying schedules, we offer flexible learning modes, including:
          </Content>
          <ul>
            <ListItem>Full-Time Programs for students seeking an immersive learning experience.</ListItem>
            <ListItem>Part-Time Programs for professionals balancing work and study.</ListItem>
            <ListItem>Distance and Online Learning for those who prefer remote learning opportunities.</ListItem>
          </ul>
          <Content>
            These flexible options ensure that learners from various backgrounds can access our world-class education without compromising their work or personal commitments.
          </Content>

          <Content>
            Through these programs and initiatives, the Centre for Waste Management and Sustainable Resources continues to lead in environmental education, research, and industry collaboration, particularly within the oil and gas sector. Our mission is to empower professionals and communities alike to adopt sustainable practices, protect the environment, and promote a future where resources are managed wisely and waste is minimized.
          </Content>

          <GreenButton onClick={()=>navigate('/application')}>Join Our Programs</GreenButton>
        </Container>

      </ResponsiveContainer>
    </>
  );
};

export default KeyPrograms;
