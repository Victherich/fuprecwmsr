
import React from "react";
import styled from "styled-components";
import { FaLeaf, FaHandshake, FaUniversity } from "react-icons/fa";
import bgImage from "../Images/ggg11.jpg"; // Replace with your background image path

const SuccessStory = () => {
  return (
    <PageWrapper>
      <HeaderSection>
        <Overlay />
        <HeaderContent>
          <FaLeaf size={60} />
          <h1>Success Story of the Centre for Waste Management and Sustainable Resources</h1>
        </HeaderContent>
      </HeaderSection>

      <StorySection>
        <Paragraph>
        The Centre for Waste Management and Sustainable Resources, established by the visionary Vice Chancellor of FUPRE, Prof. Rim-Rukeh Akpofure, has become a hub of innovative solutions for waste management and sustainable practices. In 2024, Dr. Akinyemi Olufemi Ogunkeyede was appointed as the Acting Director of the Centre, working alongside Deputy Director, Dr. Ozioma Nduagu. Together, they embarked on a mission to position the Centre as a trailblazer in waste management and sustainability.  
        </Paragraph>

        <Paragraph>
        From the outset, the leadership team worked tirelessly to establish the Centre's relevance in the corridors of key stakeholders. This effort has resulted in strategic partnerships with NNPCL Academy, Odera Training Academy, and the Royal Iwere Foundation. The Centre has also enjoyed collaborations with organizations such as PIND Foundation, CMADI, CODAF, and several other reputable bodies and individuals.   </Paragraph>

        <Divider>
          <FaHandshake size={30} color="#0c5b34" />
        </Divider>

        <Paragraph>
        One of the major milestones of the Centre is its partnership with a renowned scientific analytical laboratory in Lagos, which now provides free analysis for research conducted by students of the Centre. This invaluable support has empowered students to conduct cutting-edge research and foster innovation.  
 </Paragraph>

        <Divider>
          <FaUniversity size={30} color="#ff6600" />
        </Divider>

        <Paragraph>
          One of the major milestones of the Centre is its partnership with a renowned scientific analytical laboratory in Lagos, which now provides <strong>free analysis for research conducted by students</strong> of the Centre. This invaluable support has empowered students to conduct <em>cutting-edge research</em> and foster innovation.
        </Paragraph>
      </StorySection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9fff9;
  color: #1c2e1f;
`;

const HeaderSection = styled.header`
  background: url(${bgImage}) center/cover no-repeat;
  height: 60vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(12, 91, 52, 0.6);
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 0 1rem;

  h1 {
    font-size: 2.8rem;
    margin-top: 1rem;
  }

  svg {
    color: #ff6600;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const StorySection = styled.section`
  padding: 3rem 1.5rem;
  max-width: 960px;
  margin: auto;
`;

const Paragraph = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #222;

  strong {
    color: #0c5b34;
  }

  em {
    color: #ff6600;
    font-style: italic;
  }
`;

const Divider = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;


export default SuccessStory;
