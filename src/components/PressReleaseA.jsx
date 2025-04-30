
import React from "react";
import styled from "styled-components";
import bgImage from "../Images/primg1.png"; // Replace with actual background image
import championsImg from "../Images/primg1.png"; // Replace with actual photo

const PressReleaseA = () => {
  return (
    <Wrapper>
      <Overlay>
        <ContentContainer>
          <Title>
            📰 PRESS RELEASE
          </Title>
          <SubTitle>
            FEDERAL UNIVERSITY OF PETROLEUM RESOURCES, EFFURUN (FUPRE)
          </SubTitle>

          <HeroImage>
            <img src={championsImg} alt="FUPRE Champions Day 2025" />
          </HeroImage>

          <MainHeading>
            🌍 FUPRE Waste Department Partners with Roli Mabo Foundation on Environment Protection Initiatives
          </MainHeading>

          <Details>
            <strong>Effurun, Delta State – January 28, 2025</strong>
            <p>
              <em>
                R-L Prof. Ofualagba (Deputy VC Academic); Prof. Ogeleka (Deputy VC Administration); Ivy Enyioko (Centre Admin and Head Partnership); Mr. Ade Mabo (Founder Roli Foundation); Prof. Rim-Rukeh Akpofure (VC); Dr. Akinyemi Ogunkeyede (Ag. Director, CWMSR); Dr E. E. Elemike (Ag. Director, Centre for Sustainable Development); Prof. Mercy I. Anyaegbu (Librarian, FUPRE)
              </em>
            </p>

            <p>
              The Federal University of Petroleum Resources, Effurun (FUPRE), through its
              Centre for Waste Management and Sustainable Resources (CWMSR), successfully
              hosted <strong>Champions Day 2025</strong>, an inspiring event aimed at empowering students
              with knowledge, innovation, and opportunities in sustainability and waste management.
            </p>

            <p>
              The highlight of the event was the presence of <strong>Mr. Ade Mabo</strong>, a renowned
              entrepreneur, mentor, and sustainability advocate, who delivered an insightful
              keynote speech on <em>“Collaboration and Leverage as a Means to Wealth Creation in Waste Management.”</em>
              His session provided a roadmap for young innovators on how strategic partnerships
              and resource optimization can drive economic transformation in the waste sector.
            </p>
          </Details>
        </ContentContainer>
      </Overlay>
    </Wrapper>
  );
};

const Wrapper = styled.section`
//   background: url(${bgImage}) no-repeat center center/cover;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;


  @media(max-width:428px){
    padding:40px 5px;
  }
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 24px;
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const ContentContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ff6600;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const MainHeading = styled.h3`
  font-size: 1.8rem;
  margin: 2rem 0;
  color: #ffffff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
`;

const HeroImage = styled.div`
  margin: 1.5rem 0;
  img {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const Details = styled.div`
  text-align: left;
  font-size: 1.05rem;

  p {
    margin: 1rem 0;
    line-height: 1.6;
  }

  em {
    font-style: italic;
    color: #ffcc80;
  }

  strong {
    color: #00e676;
  }
`;

export default PressReleaseA;