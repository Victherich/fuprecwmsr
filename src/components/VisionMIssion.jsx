
import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import { FaRecycle, FaSeedling, FaHandsHelping, FaAward } from 'react-icons/fa';
import visionImage from '../Images/ad1.jpg'; // use your uploaded image path

const Container = styled.div`
  background: #ffffff;
  padding: 60px 20px;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Section = styled.div`
  margin-bottom: 60px;
`;

const Heading = styled.h2`
  color: #0f9d58;
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeading = styled.h3`
  font-size: 28px;
  color: #ff8c00;
  margin-bottom: 10px;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 18px;
  line-height: 1.8;
  text-align: justify;
  max-width: 900px;
  margin: auto;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 40px auto;
  display: block;
`;

const MissionList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
  max-width: 900px;
  margin: auto;
`;

const MissionItem = styled.li`
  background: #f3fdf5;
  border-left: 6px solid #0f9d58;
  padding: 15px 20px;
  margin-bottom: 15px;
  font-size: 17px;
`;

const ValuesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const ValueCard = styled.div`
  flex: 1 1 200px;
  background: #e6f9f0;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    background: #d0f5e2;
  }

  svg {
    font-size: 36px;
    color: #0f9d58;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 18px;
    color: #333;
  }
`;

const VisionMission = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container id="vision-mission">
      <Wrapper>
        <Section data-aos="fade-up">
          <Heading>Vision & Mission</Heading>

          <SubHeading>Vision</SubHeading>
          <Paragraph>
            To become a global leader in waste management solutions, sustainable resource utilization, and environmental protection, 
            providing innovative approaches to reduce environmental impact and promote sustainable practices in both the oil and gas 
            industry and broader sectors.
          </Paragraph>

          <Image src={visionImage} alt="CWMSR Vision" />

          <SubHeading>Mission</SubHeading>
          <MissionList>
            <MissionItem>
              – To offer high-quality, research-driven education and training programs that equip professionals with the skills needed to address critical waste and environmental issues.
            </MissionItem>
            <MissionItem>
              – To foster cutting-edge research and technological innovations that lead to sustainable waste management and environmental protection solutions.
            </MissionItem>
            <MissionItem>
              – To collaborate with industries, governments, and communities in advancing sustainable practices and addressing real-world environmental challenges.
            </MissionItem>
            <MissionItem>
              – To drive the transformation of the oil and gas industry towards sustainability by providing practical, science-based solutions for managing petroleum waste and reducing the industry’s environmental footprint.
            </MissionItem>
          </MissionList>
        </Section>

        <Section data-aos="fade-up">
          <SubHeading>Our Core Values</SubHeading>
          <ValuesGrid>
            <ValueCard>
              <FaHandsHelping />
              <h4>Integrity</h4>
            </ValueCard>
            <ValueCard>
              <FaAward />
              <h4>Excellence</h4>
            </ValueCard>
            <ValueCard>
              <FaRecycle />
              <h4>Collaboration</h4>
            </ValueCard>
            {/* <ValueCard>
              <FaSeedling />
              <h4>Integrity</h4>
            </ValueCard> */}
            {/* <ValueCard>
              <FaAward />
              <h4>Excellence</h4>
            </ValueCard> */}
            {/* <ValueCard>
              <FaHandsHelping />
              <h4>Collaboration</h4>
            </ValueCard> */}
          </ValuesGrid>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default VisionMission;
