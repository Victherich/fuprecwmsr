
import React from "react";
import styled from "styled-components";
import { FaChalkboardTeacher } from "react-icons/fa";
import primg5 from '../Images/primg5.jpg'

const LectureEventSection = () => {
  return (
    <SectionWrapper>
      <ContentContainer>
        <ImageContent>
          <img
            src={primg5}
            alt="Lecture Event by Mr. Mabo"
          />
        </ImageContent>
        <TextContent>
          <h2><FaChalkboardTeacher /> Inspiring Student Address by Mr. Mabo</h2>
          <p>
            Mr. Mabo proceeded to the event hall, where a large audience of eager students awaited his address. Delivering a powerful and engaging lecture, he covered essential themes such as:
          </p>
          <ul>
            <li><strong>Strategic Collaboration</strong> – How working together leads to shared success in waste management.</li>
            <li><strong>Innovation & Entrepreneurship</strong> – Transforming waste into valuable products and business opportunities.</li>
            <li><strong>Overcoming Challenges</strong> – Strategies for navigating obstacles in sustainability ventures.</li>
            <li><strong>Personal Growth & Success</strong> – Unlocking one’s potential through discipline and vision.</li>
          </ul>
          <p>
            His interactive Q&A session allowed students to seek guidance on their career paths, business ideas, and sustainability efforts. Mr. Mabo also granted one-on-one interviews, further inspiring students to take bold steps towards innovation and self-reliance.
          </p>
        </TextContent>
      </ContentContainer>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  background: linear-gradient(to left, #e8f5e9, #f0fff4);
  padding: 4rem 2rem;

  @media(max-width:428px){
    padding :40px 5px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 1.5rem;

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

  ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;

    li {
      font-size: 1.05rem;
      margin-bottom: 0.75rem;
      color: #1e2e1e;
    }
  }
`;

const ImageContent = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 1.5rem;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

export default LectureEventSection;
