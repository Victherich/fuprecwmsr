
import React from "react";
import styled from "styled-components";
import directorImg from "../Images/director2.jpeg"; // Add the actual image path
import { FaBroadcastTower, FaLaptopCode, FaChalkboardTeacher } from "react-icons/fa";

const LeadershipSection = () => {
  return (
    <SectionWrapper>
      <TitleBox>
        <h2>🧠 Thought Leadership and Advocacy</h2>
        <h3>
          Highlighting the influence of the Centre's visionary leadership.
        </h3>
      </TitleBox>

      <ContentRow>
        <ImageBox>
          <img src={directorImg} alt="Dr. Ogunkeyede" />
          <Caption>Dr. Akinyemi Olufemi Ogunkeyede – Ag. Director</Caption>
        </ImageBox>

        <TextBox>
          <p>
            Dr. Ogunkeyede, the Ag. Director, has become a recognized voice in waste
            management and sustainability. He has been a guest speaker at a webinar hosted by
            the <strong>Nigerian Environmental Society</strong>, a facilitator at a <strong>Train-the-Trainer Program</strong>
            for chemistry teachers in Delta State, and a guest on <strong>Quest FM Radio</strong>, where he discussed
            plastic waste management and the Zero Waste Campus Project.
          </p>
        </TextBox>
      </ContentRow>

      <TitleBox>
        <h2>🎓 Innovative Academic Programs</h2>
        <h3>Equipping students with the skills for tomorrow’s industries.</h3>
      </TitleBox>

      <Programs>
        <ProgramCard>
          <FaLaptopCode size={40} />
          {/* <h4>Online Postgraduate Programs</h4> */}
          <p>
           
In line with its mission to produce industry-ready graduates, the Centre is set to launch its *online postgraduate programs*. Backed by a team of seasoned researchers and industry professionals, these programs are designed to meet the demands of the oil and gas industry, as well as allied sectors. With a curriculum addressing current and future trends in waste management, social work, and environmental health, the Centre is poised to set a new standard in education.  
          </p>
        </ProgramCard>

        <ProgramCard>
          <FaBroadcastTower size={40} />
          {/* <h4>Massive Outreach</h4> */}
          <p>
          The Centre has aggressively promoted its programs through pre-admission webinars, radio broadcasts, and newspaper advertisements, aiming to become the first Nigerian university Centre to offer such specialized curricula. Short courses will further equip graduates with the skills required to excel in their careers.   </p>
        </ProgramCard>

        {/* <ProgramCard>
          <FaChalkboardTeacher size={40} />
          <h4>Short Courses & Skills Training</h4>
          <p>
            Tailored short courses will boost graduate employability and empower students
            to lead in sustainability and environmental innovation.
          </p>
        </ProgramCard> */}
      </Programs>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  padding: 4rem 2rem;
  background: #f7fdf7;
  color: #1a2f1a;

  @media(max-width:428px){
    padding:40px 5px;
  }
`;

const TitleBox = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 2.3rem;
    color: #0c5b34;
  }

  h3 {
    font-size: 1.2rem;
    color: #444;
    margin-top: 0.5rem;
  }
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;

  @media(min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageBox = styled.div`
  max-width: 280px;

  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Caption = styled.p`
  text-align: center;
  font-weight: bold;
  margin-top: 0.75rem;
  color: #0c5b34;
`;

const TextBox = styled.div`
  flex: 1;
  font-size: 1.05rem;
  line-height: 1.6;
`;

const Programs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProgramCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  border-left: 6px solid #ff6600;
  box-shadow: 0 6px 15px rgba(0, 128, 0, 0.1);
  text-align: left;

  svg {
    color: #0c5b34;
  }

  h4 {
    color: #ff6600;
    margin-top: 1rem;
  }

  p {
    margin-top: 0.5rem;
    color: #2e3d2e;
  }
`;

export default LeadershipSection;
