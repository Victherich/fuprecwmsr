import React from "react";
import styled from "styled-components";
import { FaAward } from "react-icons/fa";
import primg6 from '../Images/primg6.jpg';
import primg7 from '../Images/primg7.jpg';

const GuestRecognitionSection = () => {
  return (
    <SectionWrapper>
      <Container>
        <Header>
          <FaAward size={28} />
          <h2>Recognition & Collaboration</h2>
        </Header>

        {/* First Image at the top */}
        <ImageBlockTop>
          <img src={primg6} alt="Award Ceremony 1" />
        </ImageBlockTop>

        {/* Write-up in the middle */}
        <TextBlock>
          <p>
            The event was graced by <strong>Lady Diana Ereyitomi Eyo-Enoette</strong> – SA to Delta State Governor on SDGs. At the close of the event, <strong>Mr. Ade Mabo</strong> was presented with an award from FUPRE for his valuable contribution and inspiring presence. His words ignited a spark of innovation and resilience among students, reinforcing the belief that waste is not just refuse but an untapped resource for wealth creation.
          </p>
          <p>
            The <strong>Centre for Waste Management and Sustainable Resources (CWMSR)</strong> looks forward to future collaborations with industry leaders like Mr. Mabo to advance sustainability education, research, and entrepreneurial initiatives.
          </p>
        </TextBlock>

        {/* Second Image at the bottom */}
        <ImageBlockBottom>
          <img src={primg7} alt="Award Ceremony 2" />
        </ImageBlockBottom>
      </Container>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  background: #fffaf0;
  padding: 4rem 2rem;
  border-top: 6px solid #ff6600;


   @media(max-width:428px){
    padding :40px 5px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2.2rem;
    color: #0c5b34;
    margin-top: 0.5rem;
  }
`;

const ImageBlockTop = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  display:flex;
  justify-content:center;
  align-items:center;

  img {
    width: 250px;
    height: 300px;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  p {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  strong {
    color: #0c5b34;
  }

  text-align: center;
`;

const ImageBlockBottom = styled.div`
  width: 100%;
  margin-top: 2rem;

  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    object-fit: cover;
  }
`;

export default GuestRecognitionSection;
