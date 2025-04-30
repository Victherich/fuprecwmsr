
import React from "react";
import styled from "styled-components";
import visitImg from "../Images/primg2.jpg"; // Replace with actual image path

const VisitShowcase = () => {
  return (
    <Container>
      <ImageSection>
        <img src={visitImg} alt="Visit to CWMSR" />
      </ImageSection>
      <TextSection>
        <h2>🌍 Visit to the Centre for Waste Management and Sustainable Resources</h2>
        <p>
          Prior to his speech, Mr. Ade Mabo visited the CWMSR, where he was introduced to 
          groundbreaking innovations by FUPRE students who displayed a range of valuable items 
          crafted from waste materials.
        </p>
        <p>
          These included <strong>recycled furniture, fashion accessories, eco-friendly construction 
          materials, and energy-efficient devices</strong>, demonstrating the vast potential in 
          waste-to-wealth initiatives.
        </p>
        <p>
          Commending the students for their ingenuity, Mr. Mabo encouraged them to scale their 
          ideas into sustainable businesses, reinforcing the importance of entrepreneurial thinking 
          in environmental conservation.
        </p>
      </TextSection>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #e6fff2 0%, #ffffff 100%);
  border-top: 10px solid #0c5b34;

  @media(min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const TextSection = styled.div`
  flex: 1;
  color: #1e2e1e;

  h2 {
    color: #ff6600;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  strong {
    color: #0c5b34;
  }
`;

export default VisitShowcase;
