import React from "react";
import styled from "styled-components";
import { FaHandshake } from "react-icons/fa";
import primg3 from '../Images/primg3.jpg';
import primg4 from '../Images/primg4.jpg';

const CourtesyVisitSection = () => {
  return (
    <SectionWrapper>
      <ContentContainer>
        {/* First Image at the top */}
      

        {/* Text Content in the middle */}
        <TextContent>
          <h2><FaHandshake /> Courtesy Visit to the Vice-Chancellor</h2>
          <p>
            Following the center visit, Mr. Mabo paid a courtesy visit to the Vice-Chancellor of FUPRE, Prof. Rim-Rukeh Akpofure.
            The discussion focused on sustainable development, innovation in waste management, and potential collaborations between industry and academia.
          </p>
          <p>
            Prof. Akpofure lauded Mr. Mabo’s commitment to empowering young minds and expressed the university’s readiness to partner
            with stakeholders in developing sustainable solutions for environmental challenges.
          </p>
        </TextContent>

        {/* Second Image at the bottom */}
        <ImageContentBottom>
          <img
            src={primg4}
            alt="Courtesy Visit to Vice-Chancellor"
          />
           <img
            src={primg3}
            alt="Courtesy Visit to Vice-Chancellor"
          />
        </ImageContentBottom>
      </ContentContainer>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  background: linear-gradient(to right, #f0fff4, #e8f5e9);
  padding: 4rem 2rem;
  border-bottom:4px solid orange;

  @media(max-width:428px){
    padding:40px 5px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 1.5rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: #0c5b34;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: #2f4f2f;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`;

const ImageContentTop = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    object-fit: cover;
  }
`;

const ImageContentBottom = styled.div`
  width: 100%;
  margin-top: 2rem;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:20px;

  @media(max-width:428px){
    flex-direction:column;
  }

  img {
    width: 250px;
        height:300px;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    object-fit: cover;
  }
`;

export default CourtesyVisitSection;
