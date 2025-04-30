
import React from "react";
import styled from "styled-components";
import { FaUsers, FaLeaf, FaHandsHelping } from "react-icons/fa";
import bgPattern from "../Images/ci4.jpeg"; // Replace with actual background image

const CommunityEngagement = () => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <h2>🤝 Engaging the Community</h2>
          <p>
            The Centre has introduced several innovative programs to bridge the gap between academia and society:
          </p>
        </Header>

        <ProgramList>
          <Program>
            <FaUsers size={40} />
            <div>
              <h3>Champions Day</h3>
              <p>
                An opportunity for students to interact directly with industry leaders and gain firsthand insights into the professional world.
              </p>
            </div>
          </Program>

          <Program>
            <FaLeaf size={40} />
            <div>
              <h3>Trash Market Day</h3>
              <p>
                An event where public figures purchase waste materials from scavengers, which the Centre upcycles into new products.
              </p>
            </div>
          </Program>

          <Program>
            <FaHandsHelping size={40} />
            <div>
              <h3>Zero Waste Day</h3>
              <p>
                A day dedicated to showcasing products made from waste, promoting creativity, sustainability, and innovation.
              </p>
            </div>
          </Program>
        </ProgramList>

        <VisionSection>
          <h2>🚀 The Journey Ahead</h2>
          <p>
          While the Centre stands tall today, this is only the beginning. With a clear vision and ambitious goals, the Centre is committed to dreaming big, doing the work, and making a lasting impact. From research to advocacy, education, and community engagement, the Centre for Waste Management and Sustainable Resources is shaping a sustainable future and fulfilling the vision of FUPRE's founding fathers for excellence and relevance.  </p>
          <blockquote>
            <em>
              "We are not just dreaming; we are bringing our dreams to life. The future is bright, and the best is yet to come."
            </em>
          </blockquote>
        </VisionSection>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: url(${bgPattern}) center/cover no-repeat;
  padding: 4rem 2rem;
  color: white;
  position: relative;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: auto;
`;

const Header = styled.div`
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #00ff88;
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`;

const ProgramList = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Program = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  svg {
    color: #ffa500;
  }

  h3 {
    margin: 0;
    color: #00ff88;
  }

  p {
    font-size: 1rem;
    margin-top: 0.5rem;
    color: #f4f4f4;
  }
`;

const VisionSection = styled.div`
  margin-top: 4rem;
  text-align: center;

  h2 {
    color: #ffa500;
    font-size: 2rem;
  }

  p {
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  blockquote {
    margin-top: 2rem;
    font-size: 1.3rem;
    color: #00ff88;
  }
`;

export default CommunityEngagement;